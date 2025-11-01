import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Invoice } from './invoice.entity';
import { Company } from '../../organization/modules/company/entities/company.entity';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  paymentNumber: string;

  @ManyToOne(() => Invoice, (invoice) => invoice.payments, { eager: true })
  @JoinColumn({ name: 'invoice_id' })
  invoice: Invoice;

  @Column({ name: 'invoice_id' })
  invoiceId: number;

  @ManyToOne(() => Company, { eager: true })
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @Column({ name: 'company_id' })
  companyId: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'varchar' })
  method: string; // cash, credit_card, debit_card, bank_transfer, pix, insurance, check, other

  @Column({ type: 'varchar' })
  status: string; // pending, completed, failed, refunded, cancelled

  @Column({ type: 'date' })
  paymentDate: Date;

  @Column({ nullable: true })
  transactionId: string;

  @Column({ nullable: true })
  stripePaymentIntentId: string;

  @Column({ nullable: true })
  stripeChargeId: string;

  @Column({ nullable: true })
  referenceNumber: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ nullable: true })
  receiptUrl: string;

  @Column({ nullable: true })
  processedBy: number;

  @Column({ type: 'timestamptz', nullable: true })
  processedAt: Date;

  @Column({ type: 'timestamptz', nullable: true })
  refundedAt: Date;

  @Column({ nullable: true })
  refundedBy: number;

  @Column({ type: 'text', nullable: true })
  refundReason: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  refundedAmount: number;

  @CreateDateColumn()
  createdAt: Date;
}
