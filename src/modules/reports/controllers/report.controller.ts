import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Res,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import type { Response } from 'express';
import { ReportService } from '../services/report.service';
import { CreateReportDto } from '../dto/create-report.dto';
import { UpdateReportDto } from '../dto/update-report.dto';
import { ValidateReportDto, SignReportDto, ReleaseReportDto } from '../dto/validate-report.dto';
import * as fs from 'fs';

@ApiTags('reports')
@Controller('reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post()
  @ApiOperation({ summary: 'Criar novo relatório (laudo)' })
  @ApiResponse({ status: 201, description: 'Relatório criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  create(@Body() createReportDto: CreateReportDto) {
    return this.reportService.create(createReportDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os relatórios' })
  @ApiQuery({ name: 'status', required: false, description: 'Filtrar por status' })
  @ApiQuery({ name: 'patientId', required: false, description: 'Filtrar por ID do paciente' })
  @ApiQuery({ name: 'companyId', required: false, description: 'Filtrar por ID da empresa' })
  @ApiResponse({ status: 200, description: 'Lista de relatórios retornada com sucesso' })
  findAll(
    @Query('status') status?: string,
    @Query('patientId') patientId?: number,
    @Query('companyId') companyId?: number,
  ) {
    return this.reportService.findAll(status, patientId, companyId);
  }

  @Get('number/:reportNumber')
  @ApiOperation({ summary: 'Buscar relatório por número' })
  @ApiResponse({ status: 200, description: 'Relatório encontrado' })
  @ApiResponse({ status: 404, description: 'Relatório não encontrado' })
  findByReportNumber(@Param('reportNumber') reportNumber: string) {
    return this.reportService.findByReportNumber(reportNumber);
  }

  @Get('share/:token')
  @ApiOperation({ summary: 'Acessar relatório por link de compartilhamento' })
  @ApiResponse({ status: 200, description: 'Relatório encontrado' })
  @ApiResponse({ status: 404, description: 'Link inválido ou expirado' })
  findByShareToken(@Param('token') token: string) {
    return this.reportService.findByShareToken(token);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar relatório por ID' })
  @ApiResponse({ status: 200, description: 'Relatório encontrado' })
  @ApiResponse({ status: 404, description: 'Relatório não encontrado' })
  findOne(@Param('id') id: string) {
    return this.reportService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar relatório (apenas rascunhos)' })
  @ApiResponse({ status: 200, description: 'Relatório atualizado com sucesso' })
  @ApiResponse({ status: 400, description: 'Apenas rascunhos podem ser atualizados' })
  @ApiResponse({ status: 404, description: 'Relatório não encontrado' })
  update(@Param('id') id: string, @Body() updateReportDto: UpdateReportDto) {
    return this.reportService.update(+id, updateReportDto);
  }

  @Patch(':id/validate')
  @ApiOperation({ summary: 'Validar relatório' })
  @ApiResponse({ status: 200, description: 'Relatório validado com sucesso' })
  @ApiResponse({ status: 400, description: 'Apenas rascunhos podem ser validados' })
  validate(@Param('id') id: string, @Body() validateDto: ValidateReportDto) {
    return this.reportService.validate(+id, validateDto);
  }

  @Patch(':id/sign')
  @ApiOperation({ summary: 'Assinar relatório digitalmente' })
  @ApiResponse({ status: 200, description: 'Relatório assinado com sucesso' })
  @ApiResponse({ status: 400, description: 'Apenas relatórios validados podem ser assinados' })
  sign(@Param('id') id: string, @Body() signDto: SignReportDto) {
    return this.reportService.sign(+id, signDto);
  }

  @Patch(':id/release')
  @ApiOperation({ summary: 'Liberar relatório para o paciente' })
  @ApiResponse({ status: 200, description: 'Relatório liberado com sucesso' })
  @ApiResponse({ status: 400, description: 'Apenas relatórios assinados podem ser liberados' })
  release(@Param('id') id: string, @Body() releaseDto: ReleaseReportDto) {
    return this.reportService.release(+id, releaseDto);
  }

  @Post(':id/generate-pdf')
  @ApiOperation({ summary: 'Gerar PDF do relatório' })
  @ApiResponse({ status: 200, description: 'PDF gerado com sucesso' })
  @ApiResponse({ status: 404, description: 'Relatório não encontrado' })
  async generatePDF(@Param('id') id: string) {
    const result = await this.reportService.generatePDF(+id);
    return {
      message: 'PDF generated successfully',
      pdfUrl: result.report.pdfUrl,
      reportNumber: result.report.reportNumber,
    };
  }

  @Get(':id/download-pdf')
  @ApiOperation({ summary: 'Download do PDF do relatório' })
  @ApiResponse({ status: 200, description: 'PDF retornado com sucesso' })
  @ApiResponse({ status: 404, description: 'PDF não encontrado' })
  async downloadPDF(@Param('id') id: string, @Res() res: Response) {
    const report = await this.reportService.findOne(+id);

    if (!report.pdfGenerated || !report.pdfUrl) {
      throw new NotFoundException('PDF not generated yet. Please generate it first.');
    }

    const filePath = `${process.cwd()}/reports/${report.pdfUrl}`;

    if (!fs.existsSync(filePath)) {
      throw new NotFoundException('PDF file not found');
    }

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${report.pdfUrl}"`);
    
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  }

  @Post(':id/share')
  @ApiOperation({ summary: 'Gerar link de compartilhamento seguro' })
  @ApiQuery({ name: 'expiresInDays', required: false, description: 'Dias até expirar (padrão: 7)' })
  @ApiResponse({ status: 200, description: 'Link de compartilhamento gerado' })
  @ApiResponse({ status: 400, description: 'Apenas relatórios liberados podem ser compartilhados' })
  generateShareLink(
    @Param('id') id: string,
    @Query('expiresInDays') expiresInDays?: number,
  ) {
    return this.reportService.generateShareLink(+id, expiresInDays || 7);
  }

  @Patch(':id/cancel')
  @ApiOperation({ summary: 'Cancelar relatório' })
  @ApiResponse({ status: 200, description: 'Relatório cancelado com sucesso' })
  @ApiResponse({ status: 400, description: 'Relatórios liberados não podem ser cancelados' })
  cancel(@Param('id') id: string) {
    return this.reportService.cancel(+id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover relatório (soft delete)' })
  @ApiResponse({ status: 200, description: 'Relatório removido com sucesso' })
  @ApiResponse({ status: 404, description: 'Relatório não encontrado' })
  async remove(@Param('id') id: string) {
    await this.reportService.remove(+id);
    return { message: 'Report deleted successfully' };
  }
}
