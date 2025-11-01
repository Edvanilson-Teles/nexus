import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from '../entities/report.entity';
import { CreateReportDto } from '../dto/create-report.dto';
import { UpdateReportDto } from '../dto/update-report.dto';
import { ValidateReportDto, SignReportDto, ReleaseReportDto } from '../dto/validate-report.dto';
import PDFDocument from 'pdfkit';
import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Report)
    private reportRepository: Repository<Report>,
  ) {}

  async create(createReportDto: CreateReportDto): Promise<Report> {
    // Generate unique report number
    const reportNumber = await this.generateReportNumber();

    const report = this.reportRepository.create({
      ...createReportDto,
      reportNumber,
      status: 'draft',
    });

    return await this.reportRepository.save(report);
  }

  async findAll(
    status?: string,
    patientId?: number,
    companyId?: number,
  ): Promise<Report[]> {
    const queryBuilder = this.reportRepository
      .createQueryBuilder('report')
      .leftJoinAndSelect('report.patient', 'patient')
      .leftJoinAndSelect('report.order', 'order')
      .leftJoinAndSelect('report.company', 'company')
      .leftJoinAndSelect('report.validator', 'validator')
      .leftJoinAndSelect('report.signer', 'signer')
      .leftJoinAndSelect('report.releaser', 'releaser')
      .where('report.deletedAt IS NULL');

    if (status) {
      queryBuilder.andWhere('report.status = :status', { status });
    }

    if (patientId) {
      queryBuilder.andWhere('report.patientId = :patientId', { patientId });
    }

    if (companyId) {
      queryBuilder.andWhere('report.companyId = :companyId', { companyId });
    }

    return await queryBuilder.orderBy('report.createdAt', 'DESC').getMany();
  }

  async findOne(id: number): Promise<Report> {
    const report = await this.reportRepository
      .createQueryBuilder('report')
      .leftJoinAndSelect('report.patient', 'patient')
      .leftJoinAndSelect('report.order', 'order')
      .leftJoinAndSelect('report.company', 'company')
      .leftJoinAndSelect('report.validator', 'validator')
      .leftJoinAndSelect('report.signer', 'signer')
      .leftJoinAndSelect('report.releaser', 'releaser')
      .where('report.id = :id', { id })
      .andWhere('report.deletedAt IS NULL')
      .getOne();

    if (!report) {
      throw new NotFoundException(`Report with ID ${id} not found`);
    }

    return report;
  }

  async findByReportNumber(reportNumber: string): Promise<Report> {
    const report = await this.reportRepository
      .createQueryBuilder('report')
      .leftJoinAndSelect('report.patient', 'patient')
      .leftJoinAndSelect('report.order', 'order')
      .leftJoinAndSelect('report.company', 'company')
      .leftJoinAndSelect('report.validator', 'validator')
      .leftJoinAndSelect('report.signer', 'signer')
      .leftJoinAndSelect('report.releaser', 'releaser')
      .where('report.reportNumber = :reportNumber', { reportNumber })
      .andWhere('report.deletedAt IS NULL')
      .getOne();

    if (!report) {
      throw new NotFoundException(`Report ${reportNumber} not found`);
    }

    return report;
  }

  async findByShareToken(shareToken: string): Promise<Report> {
    const report = await this.reportRepository
      .createQueryBuilder('report')
      .leftJoinAndSelect('report.patient', 'patient')
      .leftJoinAndSelect('report.order', 'order')
      .leftJoinAndSelect('report.company', 'company')
      .where('report.shareToken = :shareToken', { shareToken })
      .andWhere('report.deletedAt IS NULL')
      .getOne();

    if (!report) {
      throw new NotFoundException('Invalid or expired share link');
    }

    // Check if share link is expired
    if (report.shareExpiresAt && new Date() > report.shareExpiresAt) {
      throw new BadRequestException('Share link has expired');
    }

    return report;
  }

  async update(id: number, updateReportDto: UpdateReportDto): Promise<Report> {
    const report = await this.findOne(id);

    if (report.status !== 'draft') {
      throw new BadRequestException('Only draft reports can be updated');
    }

    Object.assign(report, updateReportDto);
    return await this.reportRepository.save(report);
  }

  async validate(id: number, validateDto: ValidateReportDto): Promise<Report> {
    const report = await this.findOne(id);

    if (report.status !== 'draft') {
      throw new BadRequestException('Only draft reports can be validated');
    }

    report.status = 'validated';
    report.validatedBy = validateDto.validatedBy;
    report.validatedAt = new Date();

    return await this.reportRepository.save(report);
  }

  async sign(id: number, signDto: SignReportDto): Promise<Report> {
    const report = await this.findOne(id);

    if (report.status !== 'validated') {
      throw new BadRequestException('Only validated reports can be signed');
    }

    // Generate digital signature hash
    const signatureData = `${report.id}-${report.reportNumber}-${signDto.signedBy}-${new Date().toISOString()}`;
    const signatureHash = crypto.createHash('sha256').update(signatureData).digest('hex');

    report.status = 'signed';
    report.signedBy = signDto.signedBy;
    report.signedAt = new Date();
    report.signatureHash = signatureHash;

    return await this.reportRepository.save(report);
  }

  async release(id: number, releaseDto: ReleaseReportDto): Promise<Report> {
    const report = await this.findOne(id);

    if (report.status !== 'signed') {
      throw new BadRequestException('Only signed reports can be released');
    }

    report.status = 'released';
    report.releasedBy = releaseDto.releasedBy;
    report.releasedAt = new Date();

    return await this.reportRepository.save(report);
  }

  async generatePDF(id: number): Promise<{ pdfPath: string; report: Report }> {
    const report = await this.reportRepository.findOne({
      where: { id },
      relations: ['patient', 'order', 'order.items', 'company', 'signer'],
    });

    if (!report) {
      throw new NotFoundException(`Report with ID ${id} not found`);
    }

    // Ensure reports directory exists
    const reportsDir = path.join(process.cwd(), 'reports');
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir, { recursive: true });
    }

    const fileName = `${report.reportNumber}.pdf`;
    const filePath = path.join(reportsDir, fileName);

    return new Promise((resolve, reject) => {
      try {
        const doc = new PDFDocument({ margin: 50 });
        const stream = fs.createWriteStream(filePath);

        doc.pipe(stream);

        // Header
        doc.fontSize(20).text(report.company?.name || 'Clinical Laboratory', { align: 'center' });
        doc.fontSize(10).text(report.company?.address || '', { align: 'center' });
        doc.moveDown();
        
        doc.fontSize(16).text('LAUDO LABORATORIAL', { align: 'center', underline: true });
        doc.fontSize(10).text(`Número do Laudo: ${report.reportNumber}`, { align: 'right' });
        doc.moveDown();

        // Patient Information
        doc.fontSize(14).text('Dados do Paciente', { underline: true });
        doc.fontSize(10);
        doc.text(`Nome: ${report.patient?.name || 'N/A'}`);
        doc.text(`CPF: ${report.patient?.cpf || 'N/A'}`);
        doc.text(`Data de Nascimento: ${report.patient?.dateOfBirth || 'N/A'}`);
        doc.text(`Gênero: ${report.patient?.gender || 'N/A'}`);
        doc.moveDown();

        // Order Information
        doc.fontSize(14).text('Informações do Exame', { underline: true });
        doc.fontSize(10);
        doc.text(`Número da Ordem: ${report.order?.orderNumber || 'N/A'}`);
        doc.text(`Data da Coleta: ${report.order?.collectedAt || 'N/A'}`);
        doc.moveDown();

        // Report Content
        if (report.title) {
          doc.fontSize(14).text(report.title, { underline: true });
          doc.moveDown(0.5);
        }

        if (report.findings) {
          doc.fontSize(12).text('Achados Clínicos:', { underline: true });
          doc.fontSize(10).text(report.findings);
          doc.moveDown();
        }

        if (report.interpretation) {
          doc.fontSize(12).text('Interpretação:', { underline: true });
          doc.fontSize(10).text(report.interpretation);
          doc.moveDown();
        }

        if (report.recommendations) {
          doc.fontSize(12).text('Recomendações:', { underline: true });
          doc.fontSize(10).text(report.recommendations);
          doc.moveDown();
        }

        if (report.notes) {
          doc.fontSize(12).text('Observações:', { underline: true });
          doc.fontSize(10).text(report.notes);
          doc.moveDown();
        }

        // Digital Signature
        doc.moveDown(2);
        doc.fontSize(10);
        if (report.signedAt && report.signer) {
          doc.text(`Assinado digitalmente por: ${report.signer.name}`, { align: 'center' });
          doc.text(`Data: ${new Date(report.signedAt).toLocaleString('pt-BR')}`, { align: 'center' });
          if (report.signatureHash) {
            doc.fontSize(8).text(`Hash: ${report.signatureHash}`, { align: 'center' });
          }
        }

        doc.end();

        stream.on('finish', async () => {
          // Update report with PDF info
          report.pdfUrl = fileName;
          report.pdfGenerated = true;
          report.pdfGeneratedAt = new Date();
          await this.reportRepository.save(report);

          resolve({ pdfPath: filePath, report });
        });

        stream.on('error', (error) => {
          reject(error);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  async generateShareLink(id: number, expiresInDays: number = 7): Promise<{ shareToken: string; expiresAt: Date }> {
    const report = await this.findOne(id);

    if (report.status !== 'released') {
      throw new BadRequestException('Only released reports can be shared');
    }

    const shareToken = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + expiresInDays);

    report.shareToken = shareToken;
    report.shareExpiresAt = expiresAt;

    await this.reportRepository.save(report);

    return { shareToken, expiresAt };
  }

  async remove(id: number): Promise<void> {
    const report = await this.findOne(id);
    report.deletedAt = new Date();
    await this.reportRepository.save(report);
  }

  async cancel(id: number): Promise<Report> {
    const report = await this.findOne(id);
    
    if (report.status === 'released') {
      throw new BadRequestException('Released reports cannot be cancelled');
    }

    report.status = 'cancelled';
    return await this.reportRepository.save(report);
  }

  private async generateReportNumber(): Promise<string> {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    
    // Get count of reports created today
    const startOfDay = new Date(date.setHours(0, 0, 0, 0));
    const endOfDay = new Date(date.setHours(23, 59, 59, 999));
    
    const count = await this.reportRepository
      .createQueryBuilder('report')
      .where('report.createdAt >= :startOfDay', { startOfDay })
      .andWhere('report.createdAt <= :endOfDay', { endOfDay })
      .getCount();
    
    const sequence = (count + 1).toString().padStart(5, '0');
    
    return `RPT${year}${month}${day}${sequence}`;
  }
}
