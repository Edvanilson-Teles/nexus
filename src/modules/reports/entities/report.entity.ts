import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Patient } from '../../patients/entities/patient.entity';
import { User } from '../../user/entities/user.entity';
import { Company } from '../../organization/modules/company/entities/company.entity';
import { Order } from '../../orders/entities/order.entity';

@Entity('reports')
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'report_number', unique: true })
  reportNumber: string; // RPT2510310001

  @Column({ name: 'patient_id' })
  patientId: number;

  @ManyToOne(() => Patient)
  @JoinColumn({ name: 'patient_id' })
  patient: Patient;

  @Column({ name: 'order_id' })
  orderId: number;

  @ManyToOne(() => Order)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @Column({ name: 'company_id' })
  companyId: number;

  @ManyToOne(() => Company)
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @Column({ type: 'varchar', length: 50 })
  status: string; // draft, validated, signed, released, cancelled

  @Column({ type: 'varchar', length: 100, nullable: true })
  title: string;

  @Column({ type: 'text', nullable: true })
  findings: string; // Clinical findings summary

  @Column({ type: 'text', nullable: true })
  interpretation: string; // Medical interpretation

  @Column({ type: 'text', nullable: true })
  recommendations: string; // Medical recommendations

  @Column({ type: 'text', nullable: true })
  notes: string; // Additional notes

  @Column({ name: 'pdf_url', type: 'text', nullable: true })
  pdfUrl: string; // URL or path to PDF file

  @Column({ name: 'pdf_generated', type: 'boolean', default: false })
  pdfGenerated: boolean;

  @Column({ name: 'pdf_generated_at', type: 'datetime', nullable: true })
  pdfGeneratedAt: Date;

  @Column({ name: 'validated_by', nullable: true })
  validatedBy: number;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'validated_by' })
  validator: User;

  @Column({ name: 'validated_at', type: 'datetime', nullable: true })
  validatedAt: Date;

  @Column({ name: 'signed_by', nullable: true })
  signedBy: number;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'signed_by' })
  signer: User;

  @Column({ name: 'signed_at', type: 'datetime', nullable: true })
  signedAt: Date;

  @Column({ name: 'signature_hash', type: 'varchar', length: 255, nullable: true })
  signatureHash: string; // Digital signature hash

  @Column({ name: 'released_by', nullable: true })
  releasedBy: number;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'released_by' })
  releaser: User;

  @Column({ name: 'released_at', type: 'datetime', nullable: true })
  releasedAt: Date;

  @Column({ name: 'share_token', type: 'varchar', length: 100, nullable: true, unique: true })
  shareToken: string; // Secure sharing token

  @Column({ name: 'share_expires_at', type: 'datetime', nullable: true })
  shareExpiresAt: Date;

  @Column({ name: 'email_sent', type: 'boolean', default: false })
  emailSent: boolean;

  @Column({ name: 'email_sent_at', type: 'datetime', nullable: true })
  emailSentAt: Date;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ name: 'deleted_at', type: 'datetime', nullable: true })
  deletedAt: Date;
}
