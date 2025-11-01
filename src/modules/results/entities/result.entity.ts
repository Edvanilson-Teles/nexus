import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Sample } from '../../samples/entities/sample.entity';
import { Test } from '../../tests/entities/test.entity';
import { User } from '../../user/entities/user.entity';
import { Company } from '../../organization/modules/company/entities/company.entity';

@Entity('results')
export class Result {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'sample_id' })
  sampleId: number;

  @Column({ name: 'test_id' })
  testId: number;

  @Column({ name: 'company_id' })
  companyId: number;

  // Result value (stores all types of results as text)
  @Column({ type: 'text', nullable: true })
  value: string;

  // Numeric value for numeric tests (for easier querying and validation)
  @Column({ type: 'decimal', precision: 15, scale: 4, nullable: true, name: 'numeric_value' })
  numericValue: number;

  // Unit of measurement
  @Column({ length: 50, nullable: true })
  unit: string;

  // Result flag: normal, high, low, critical_high, critical_low, abnormal
  @Column({ length: 20, nullable: true })
  flag: string;

  // Reference range text (e.g., "10-20 mg/dL")
  @Column({ type: 'text', nullable: true, name: 'reference_range' })
  referenceRange: string;

  // Method used for the test
  @Column({ length: 200, nullable: true })
  method: string;

  // Comments from lab technician
  @Column({ type: 'text', nullable: true })
  comments: string;

  // Status: pending, validated, reviewed, released, corrected
  @Column({ length: 20, default: 'pending' })
  status: string;

  // Validation info
  @Column({ name: 'validated_by', nullable: true })
  validatedBy: number;

  @Column({ name: 'validated_at', type: 'datetime', nullable: true })
  validatedAt: Date;

  // Entry info
  @Column({ name: 'entered_by', nullable: true })
  enteredBy: number;

  @Column({ name: 'entered_at', type: 'datetime', nullable: true })
  enteredAt: Date;

  // Review/Release info
  @Column({ name: 'reviewed_by', nullable: true })
  reviewedBy: number;

  @Column({ name: 'reviewed_at', type: 'datetime', nullable: true })
  reviewedAt: Date;

  // Correction tracking
  @Column({ name: 'is_corrected', type: 'boolean', default: false })
  isCorrected: boolean;

  @Column({ name: 'corrected_from_id', nullable: true })
  correctedFromId: number;

  @Column({ name: 'correction_reason', type: 'text', nullable: true })
  correctionReason: string;

  // Instrument/Analyzer info
  @Column({ length: 200, nullable: true, name: 'instrument_name' })
  instrumentName: string;

  // Quality control flag
  @Column({ name: 'qc_passed', type: 'boolean', default: true })
  qcPassed: boolean;

  @Column({ name: 'qc_comments', type: 'text', nullable: true })
  qcComments: string;

  // Soft delete
  @Column({ name: 'deleted_at', type: 'datetime', nullable: true })
  deletedAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Relations
  @ManyToOne(() => Sample, { eager: true })
  @JoinColumn({ name: 'sample_id' })
  sample: Sample;

  @ManyToOne(() => Test, { eager: true })
  @JoinColumn({ name: 'test_id' })
  test: Test;

  @ManyToOne(() => Company)
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'entered_by' })
  enteredByUser: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'validated_by' })
  validatedByUser: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'reviewed_by' })
  reviewedByUser: User;
}
