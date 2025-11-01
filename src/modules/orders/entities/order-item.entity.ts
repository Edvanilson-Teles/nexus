import { BaseEntity } from 'src/database/entities/base.entity';
import { Test } from 'src/modules/tests/entities/test.entity';
import { TestPanel } from 'src/modules/tests/entities/test-panel.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Order } from './order.entity';
import { Sample } from 'src/modules/samples/entities/sample.entity';

export enum OrderItemStatus {
  PENDING = 'pending',
  COLLECTED = 'collected',
  IN_ANALYSIS = 'in_analysis',
  COMPLETED = 'completed',
  REJECTED = 'rejected',
}

@Entity('order_items')
export class OrderItem extends BaseEntity {
  @ManyToOne(() => Order, (order) => order.items, { nullable: false })
  order: Order;

  @Column()
  orderId: number;

  // Pode ser um teste individual ou um painel
  @ManyToOne(() => Test, { nullable: true, eager: true })
  test?: Test;

  @Column({ nullable: true })
  testId?: number;

  @ManyToOne(() => TestPanel, { nullable: true, eager: true })
  panel?: TestPanel;

  @Column({ nullable: true })
  panelId?: number;

  // Amostras coletadas para este item
  @OneToMany(() => Sample, (sample) => sample.orderItem)
  samples: Sample[];

  // Status do item
  @Column({ type: 'varchar', length: 20, default: OrderItemStatus.PENDING })
  status: OrderItemStatus;

  // Precificação
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'int', default: 1 })
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  discount: number;

  // Observações
  @Column({ type: 'text', nullable: true })
  notes?: string;
}
