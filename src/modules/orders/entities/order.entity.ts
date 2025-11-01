import { BaseEntity } from 'src/database/entities/base.entity';
import { Company } from 'src/modules/organization/modules/company/entities/company.entity';
import { Patient } from 'src/modules/patients/entities/patient.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { OrderItem } from './order-item.entity';

export enum OrderStatus {
  REQUESTED = 'requested',
  SCHEDULED = 'scheduled',
  COLLECTED = 'collected',
  IN_ANALYSIS = 'in_analysis',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export enum OrderPriority {
  ROUTINE = 'routine',
  URGENT = 'urgent',
  EMERGENCY = 'emergency',
}

@Entity('orders')
export class Order extends BaseEntity {
  // Relacionamentos principais
  @ManyToOne(() => Patient, { nullable: false, eager: true })
  patient: Patient;

  @Column()
  patientId: number;

  @ManyToOne(() => User, { nullable: true, eager: true })
  requestedBy: User;

  @Column({ nullable: true })
  requestedById: number;

  @ManyToOne(() => Company, { nullable: false })
  company: Company;

  @Column()
  companyId: number;

  // Itens da ordem
  @OneToMany(() => OrderItem, (item) => item.order, {
    cascade: true,
    eager: true,
  })
  items: OrderItem[];

  // Status e prioridade
  @Column({ type: 'varchar', length: 20, default: OrderStatus.REQUESTED })
  status: OrderStatus;

  @Column({ type: 'varchar', length: 20, default: OrderPriority.ROUTINE })
  priority: OrderPriority;

  // Agendamento
  @Column({ type: 'timestamptz', nullable: true })
  scheduledAt?: Date;

  @Column({ type: 'timestamptz', nullable: true })
  collectedAt?: Date;

  @Column({ type: 'timestamptz', nullable: true })
  completedAt?: Date;

  // Informações adicionais
  @Column({ type: 'text', nullable: true })
  clinicalInfo?: string; // Informações clínicas relevantes

  @Column({ type: 'text', nullable: true })
  observations?: string;

  // Código único da ordem
  @Column({ type: 'varchar', length: 50, unique: true })
  orderNumber: string;
}
