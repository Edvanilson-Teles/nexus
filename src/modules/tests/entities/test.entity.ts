import { BaseEntity } from 'src/database/entities/base.entity';
import { Company } from 'src/modules/organization/modules/company/entities/company.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

export enum TestType {
  NUMERIC = 'numeric',
  TEXT = 'text',
  QUALITATIVE = 'qualitative',
  SEMI_QUANTITATIVE = 'semi_quantitative',
}

export enum TestCategory {
  HEMATOLOGY = 'hematology',
  BIOCHEMISTRY = 'biochemistry',
  IMMUNOLOGY = 'immunology',
  MICROBIOLOGY = 'microbiology',
  MOLECULAR = 'molecular',
  URINE = 'urine',
  PATHOLOGY = 'pathology',
  IMAGING = 'imaging',
  OTHER = 'other',
}

@Entity('tests')
export class Test extends BaseEntity {
  // Identificação do Exame
  @Column({ type: 'varchar', length: 50, unique: true })
  code: string;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ type: 'varchar', length: 20 })
  category: TestCategory;

  @Column({ type: 'text', nullable: true })
  description?: string;

  // Tipo de Resultado
  @Column({ type: 'varchar', length: 30 })
  type: TestType;

  @Column({ type: 'varchar', length: 50, nullable: true })
  unit?: string; // Unidade de medida (mg/dL, UI/L, etc.)

  // Valores de Referência
  @Column({ type: 'decimal', precision: 10, scale: 3, nullable: true })
  referenceMin?: number;

  @Column({ type: 'decimal', precision: 10, scale: 3, nullable: true })
  referenceMax?: number;

  @Column({ type: 'varchar', length: 200, nullable: true })
  referenceText?: string; // Para valores qualitativos (ex: "Negativo", "Não reagente")

  // Informações Técnicas
  @Column({ type: 'varchar', length: 200, nullable: true })
  method?: string; // Método de análise

  @Column({ type: 'varchar', length: 200, nullable: true })
  specimen?: string; // Tipo de amostra (sangue, urina, etc.)

  @Column({ type: 'varchar', length: 100, nullable: true })
  container?: string; // Tipo de recipiente

  @Column({ type: 'int', nullable: true })
  turnaroundTime?: number; // Tempo de resposta em horas

  // Preparação do Paciente
  @Column({ type: 'text', nullable: true })
  preparation?: string; // Instruções de preparo (jejum, etc.)

  @Column({ type: 'boolean', default: false })
  requiresFasting: boolean;

  @Column({ type: 'int', nullable: true })
  fastingHours?: number;

  // Precificação
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  price?: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  cost?: number;

  // Status e Disponibilidade
  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'boolean', default: true })
  isAvailable: boolean; // Se está disponível para ser solicitado

  // Observações
  @Column({ type: 'text', nullable: true })
  observations?: string;

  // Relação com a empresa/laboratório
  @ManyToOne(() => Company, { nullable: false })
  company: Company;

  @Column()
  companyId: number;
}
