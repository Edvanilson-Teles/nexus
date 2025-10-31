import { BaseEntity } from 'src/database/entities/base.entity';
import { Company } from 'src/modules/organization/modules/company/entities/company.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export enum BloodType {
  A_POSITIVE = 'A+',
  A_NEGATIVE = 'A-',
  B_POSITIVE = 'B+',
  B_NEGATIVE = 'B-',
  AB_POSITIVE = 'AB+',
  AB_NEGATIVE = 'AB-',
  O_POSITIVE = 'O+',
  O_NEGATIVE = 'O-',
}

@Entity('patients')
export class Patient extends BaseEntity {
  // Identificação Principal
  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ type: 'varchar', length: 14, unique: true })
  cpf: string; // CPF brasileiro (11 dígitos)

  @Column({ type: 'varchar', length: 20, nullable: true })
  rg?: string;

  @Column({ type: 'date' })
  dateOfBirth: Date;

  @Column({ type: 'varchar', length: 20 })
  gender: Gender;

  @Column({ type: 'varchar', length: 10, nullable: true })
  bloodType?: BloodType;

  // Contatos
  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 20 })
  phone: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  mobilePhone?: string;

  // Endereço
  @Column({ type: 'varchar', length: 10, nullable: true })
  zipCode?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  address?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  city?: string;

  @Column({ type: 'varchar', length: 2, nullable: true })
  state?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  country?: string;

  // Convênio/Seguro
  @Column({ type: 'varchar', length: 200, nullable: true })
  insuranceName?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  insuranceNumber?: string;

  @Column({ type: 'date', nullable: true })
  insuranceValidity?: Date;

  // Contato de Emergência
  @Column({ type: 'varchar', length: 200, nullable: true })
  emergencyContactName?: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  emergencyContactPhone?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  emergencyContactRelationship?: string;

  // Informações Médicas
  @Column({ type: 'text', nullable: true })
  allergies?: string;

  @Column({ type: 'text', nullable: true })
  chronicDiseases?: string;

  @Column({ type: 'text', nullable: true })
  medications?: string;

  @Column({ type: 'text', nullable: true })
  observations?: string;

  // Status
  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  // Relação com a empresa/laboratório
  @ManyToOne(() => Company, { nullable: false })
  company: Company;

  @Column()
  companyId: number;
}
