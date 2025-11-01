import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull, Not } from 'typeorm';
import { Payment } from '../entities/payment.entity';
import { Invoice } from '../entities/invoice.entity';
import { CreatePaymentDto } from '../dto/create-payment.dto';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
    @InjectRepository(Invoice)
    private invoiceRepository: Repository<Invoice>,
  ) {}

  async create(createPaymentDto: CreatePaymentDto, userId?: number): Promise<Payment> {
    // Validate invoice
    const invoice = await this.invoiceRepository.findOne({
      where: { id: createPaymentDto.invoiceId, deletedAt: IsNull() },
      relations: ['payments'],
    });

    if (!invoice) {
      throw new NotFoundException('Invoice not found');
    }

    if (invoice.status === 'cancelled') {
      throw new BadRequestException('Cannot add payment to cancelled invoice');
    }

    if (invoice.status === 'paid' && invoice.balanceDue <= 0) {
      throw new BadRequestException('Invoice is already fully paid');
    }

    // Validate payment amount
    if (createPaymentDto.amount <= 0) {
      throw new BadRequestException('Payment amount must be greater than zero');
    }

    if (createPaymentDto.amount > invoice.balanceDue) {
      throw new BadRequestException(
        `Payment amount exceeds balance due (${invoice.balanceDue})`,
      );
    }

    // Generate payment number
    const paymentNumber = await this.generatePaymentNumber();

    // Create payment
    const payment = this.paymentRepository.create({
      paymentNumber,
      invoiceId: createPaymentDto.invoiceId,
      companyId: invoice.companyId,
      amount: createPaymentDto.amount,
      method: createPaymentDto.method,
      status: 'completed',
      paymentDate: createPaymentDto.paymentDate,
      transactionId: createPaymentDto.transactionId,
      referenceNumber: createPaymentDto.referenceNumber,
      notes: createPaymentDto.notes,
      processedBy: userId,
      processedAt: new Date(),
    });

    const savedPayment = await this.paymentRepository.save(payment);

    // Update invoice
    const totalPaid = invoice.paidAmount + createPaymentDto.amount;
    const newBalance = invoice.totalAmount - totalPaid;

    invoice.paidAmount = totalPaid;
    invoice.balanceDue = newBalance;

    if (newBalance <= 0) {
      invoice.status = 'paid';
      invoice.paidDate = new Date();
    } else {
      invoice.status = 'partially_paid';
    }

    await this.invoiceRepository.save(invoice);

    return savedPayment;
  }

  async findAll(
    invoiceId?: number,
    status?: string,
    method?: string,
  ): Promise<Payment[]> {
    const where: any = {};

    if (invoiceId) {
      where.invoiceId = invoiceId;
    }
    if (status) {
      where.status = status;
    }
    if (method) {
      where.method = method;
    }

    return await this.paymentRepository.find({
      where,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Payment> {
    const payment = await this.paymentRepository.findOne({
      where: { id },
    });

    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    return payment;
  }

  async findByPaymentNumber(paymentNumber: string): Promise<Payment> {
    const payment = await this.paymentRepository.findOne({
      where: { paymentNumber },
    });

    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    return payment;
  }

  async refund(
    id: number,
    userId: number,
    amount: number,
    reason: string,
  ): Promise<Payment> {
    const payment = await this.findOne(id);

    if (payment.status !== 'completed') {
      throw new BadRequestException('Only completed payments can be refunded');
    }

    if (payment.refundedAmount > 0) {
      throw new BadRequestException('Payment has already been refunded');
    }

    if (amount > payment.amount) {
      throw new BadRequestException('Refund amount exceeds payment amount');
    }

    payment.status = 'refunded';
    payment.refundedAmount = amount;
    payment.refundedAt = new Date();
    payment.refundedBy = userId;
    payment.refundReason = reason;

    const savedPayment = await this.paymentRepository.save(payment);

    // Update invoice
    const invoice = await this.invoiceRepository.findOne({
      where: { id: payment.invoiceId },
    });

    if (invoice) {
      invoice.paidAmount -= amount;
      invoice.balanceDue += amount;

      if (invoice.balanceDue > 0) {
        invoice.status = invoice.paidAmount > 0 ? 'partially_paid' : 'issued';
      }

      await this.invoiceRepository.save(invoice);
    }

    return savedPayment;
  }

  private async generatePaymentNumber(): Promise<string> {
    const today = new Date();
    const year = today.getFullYear().toString().slice(-2);
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');

    const count = await this.paymentRepository.count({
      where: {
        createdAt: Not(IsNull()),
      },
    });

    const sequence = (count + 1).toString().padStart(6, '0');
    return `PAY${year}${month}${day}${sequence}`;
  }
}
