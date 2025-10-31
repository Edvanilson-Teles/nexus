import { BaseEntity } from 'src/database/entities/base.entity';
import { Company } from 'src/modules/organization/modules/company/entities/company.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { Test } from './test.entity';

@Entity('test_panels')
export class TestPanel extends BaseEntity {
  @Column({ type: 'varchar', length: 50, unique: true })
  code: string;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  // Testes incluídos no painel
  @ManyToMany(() => Test, { eager: true })
  @JoinTable({
    name: 'test_panel_items',
    joinColumn: { name: 'panelId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'testId', referencedColumnName: 'id' },
  })
  tests: Test[];

  // Precificação do painel (pode ser diferente da soma individual)
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  price?: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  discount?: number; // Desconto percentual quando solicitado como painel

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'text', nullable: true })
  observations?: string;

  // Relação com a empresa/laboratório
  @ManyToOne(() => Company, { nullable: false })
  company: Company;

  @Column()
  companyId: number;
}
