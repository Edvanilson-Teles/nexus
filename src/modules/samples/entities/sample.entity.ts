import { BaseEntity } from 'src/database/entities/base.entity';
import { OrderItem } from 'src/modules/orders/entities/order-item.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

export enum SampleStatus {
  PENDING = 'pending',
  COLLECTED = 'collected',
  IN_TRANSIT = 'in_transit',
  RECEIVED = 'received',
  IN_ANALYSIS = 'in_analysis',
  ANALYZED = 'analyzed',
  REJECTED = 'rejected',
}

export enum SampleType {
  BLOOD = 'blood',
  SERUM = 'serum',
  PLASMA = 'plasma',
  URINE = 'urine',
  STOOL = 'stool',
  SALIVA = 'saliva',
  SWAB = 'swab',
  TISSUE = 'tissue',
  OTHER = 'other',
}

@Entity('samples')
export class Sample extends BaseEntity {
  // Relacionamento com o item da ordem
  @ManyToOne(() => OrderItem, (item) => item.samples, { nullable: false })
  orderItem: OrderItem;

  @Column()
  orderItemId: number;

  // Código de barras único
  @Column({ type: 'varchar', length: 100, unique: true })
  barcode: string;

  // Tipo de amostra
  @Column({ type: 'varchar', length: 20 })
  type: SampleType;

  // Status da amostra
  @Column({ type: 'varchar', length: 20, default: SampleStatus.PENDING })
  status: SampleStatus;

  // Coleta
  @ManyToOne(() => User, { nullable: true })
  collectedBy?: User;

  @Column({ nullable: true })
  collectedById?: number;

  @Column({ type: 'datetime', nullable: true })
  collectedAt?: Date;

  // Armazenamento
  @Column({ type: 'varchar', length: 100, nullable: true })
  storageLocation?: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  volume?: number; // Volume em mL

  @Column({ type: 'varchar', length: 50, nullable: true })
  container?: string; // Tipo de recipiente

  // Qualidade
  @Column({ type: 'boolean', default: true })
  isAcceptable: boolean;

  @Column({ type: 'text', nullable: true })
  rejectionReason?: string;

  // Observações
  @Column({ type: 'text', nullable: true })
  observations?: string;
}
