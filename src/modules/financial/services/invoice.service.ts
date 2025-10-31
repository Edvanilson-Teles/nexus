import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull, Not } from 'typeorm';
import { Invoice } from '../entities/invoice.entity';
import { InvoiceItem } from '../entities/invoice-item.entity';
import { CreateInvoiceDto } from '../dto/create-invoice.dto';
import { Patient } from '../../patients/entities/patient.entity';
import { Company } from '../../organization/modules/company/entities/company.entity';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice)
    private invoiceRepository: Repository<Invoice>,
    @InjectRepository(InvoiceItem)
    private invoiceItemRepository: Repository<InvoiceItem>,
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) {}

  async create(createInvoiceDto: CreateInvoiceDto): Promise<Invoice> {
    // Validate patient
    const patient = await this.patientRepository.findOne({
      where: { id: createInvoiceDto.patientId, deletedAt: IsNull() },
    });
    if (!patient) {
      throw new NotFoundException('Patient not found');
    }

    // Validate company
    const company = await this.companyRepository.findOne({
      where: { id: createInvoiceDto.companyId },
    });
    if (!company) {
      throw new NotFoundException('Company not found');
    }

    // Generate invoice number
    const invoiceNumber = await this.generateInvoiceNumber();

    // Calculate totals
    let subtotal = 0;
    let totalTax = 0;
    let totalDiscount = createInvoiceDto.discountAmount || 0;

    const items = createInvoiceDto.items.map((itemDto) => {
      const itemSubtotal = itemDto.unitPrice * itemDto.quantity;
      const itemDiscount = itemDto.discountAmount || (itemSubtotal * (itemDto.discountPercent || 0)) / 100;
      const itemTaxableAmount = itemSubtotal - itemDiscount;
      const itemTax = (itemTaxableAmount * (itemDto.taxPercent || 0)) / 100;
      const itemTotal = itemTaxableAmount + itemTax;

      subtotal += itemSubtotal;
      totalTax += itemTax;
      totalDiscount += itemDiscount;

      const item = new InvoiceItem();
      item.testId = itemDto.testId || null;
      item.description = itemDto.description;
      item.quantity = itemDto.quantity;
      item.unitPrice = itemDto.unitPrice;
      item.discountPercent = itemDto.discountPercent || 0;
      item.discountAmount = itemDiscount;
      item.taxPercent = itemDto.taxPercent || 0;
      item.taxAmount = itemTax;
      item.totalAmount = itemTotal;
      item.orderId = itemDto.orderId || null;
      item.sampleId = itemDto.sampleId || null;

      return item;
    });

    const totalAmount = subtotal - totalDiscount + totalTax;
    const balanceDue = totalAmount;

    // Create invoice
    const invoice = this.invoiceRepository.create({
      invoiceNumber,
      patientId: createInvoiceDto.patientId,
      companyId: createInvoiceDto.companyId,
      issueDate: createInvoiceDto.issueDate,
      dueDate: createInvoiceDto.dueDate,
      status: 'draft',
      subtotal,
      taxAmount: totalTax,
      discountAmount: totalDiscount,
      totalAmount,
      paidAmount: 0,
      balanceDue,
      notes: createInvoiceDto.notes,
      insuranceProvider: createInvoiceDto.insuranceProvider,
      insuranceClaimNumber: createInvoiceDto.insuranceClaimNumber,
      items,
    });

    return await this.invoiceRepository.save(invoice);
  }

  async findAll(
    status?: string,
    patientId?: number,
    companyId?: number,
  ): Promise<Invoice[]> {
    const where: any = { deletedAt: IsNull() };

    if (status) {
      where.status = status;
    }
    if (patientId) {
      where.patientId = patientId;
    }
    if (companyId) {
      where.companyId = companyId;
    }

    return await this.invoiceRepository.find({
      where,
      relations: ['items', 'items.test', 'payments'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Invoice> {
    const invoice = await this.invoiceRepository.findOne({
      where: { id, deletedAt: IsNull() },
      relations: ['items', 'items.test', 'payments'],
    });

    if (!invoice) {
      throw new NotFoundException('Invoice not found');
    }

    return invoice;
  }

  async findByNumber(invoiceNumber: string): Promise<Invoice> {
    const invoice = await this.invoiceRepository.findOne({
      where: { invoiceNumber, deletedAt: IsNull() },
      relations: ['items', 'items.test', 'payments'],
    });

    if (!invoice) {
      throw new NotFoundException('Invoice not found');
    }

    return invoice;
  }

  async findByPatient(patientId: number): Promise<Invoice[]> {
    return await this.invoiceRepository.find({
      where: { patientId, deletedAt: IsNull() },
      relations: ['items', 'items.test', 'payments'],
      order: { createdAt: 'DESC' },
    });
  }

  async updateStatus(id: number, status: string): Promise<Invoice> {
    const invoice = await this.findOne(id);

    const validStatuses = ['draft', 'issued', 'paid', 'overdue', 'cancelled', 'partially_paid'];
    if (!validStatuses.includes(status)) {
      throw new BadRequestException('Invalid status');
    }

    invoice.status = status;

    if (status === 'paid') {
      invoice.paidDate = new Date();
      invoice.balanceDue = 0;
    }

    return await this.invoiceRepository.save(invoice);
  }

  async cancel(id: number, userId: number, reason: string): Promise<Invoice> {
    const invoice = await this.findOne(id);

    if (invoice.status === 'paid' || invoice.status === 'cancelled') {
      throw new BadRequestException('Cannot cancel paid or already cancelled invoice');
    }

    invoice.status = 'cancelled';
    invoice.cancelledDate = new Date();
    invoice.cancelledBy = userId;
    invoice.cancellationReason = reason;

    return await this.invoiceRepository.save(invoice);
  }

  async remove(id: number): Promise<void> {
    const invoice = await this.findOne(id);

    if (invoice.status !== 'draft') {
      throw new BadRequestException('Only draft invoices can be deleted');
    }

    invoice.deletedAt = new Date();
    await this.invoiceRepository.save(invoice);
  }

  private async generateInvoiceNumber(): Promise<string> {
    const today = new Date();
    const year = today.getFullYear().toString().slice(-2);
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');

    // Count today's invoices
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    const count = await this.invoiceRepository.count({
      where: {
        createdAt: Not(IsNull()),
      },
    });

    const sequence = (count + 1).toString().padStart(4, '0');
    return `INV${year}${month}${day}${sequence}`;
  }
}
