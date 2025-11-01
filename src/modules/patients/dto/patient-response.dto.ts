import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Gender, BloodType } from '../entities/patient.entity';

export class PatientResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Maria da Silva Santos' })
  name: string;

  @ApiProperty({ example: '12345678901' })
  cpf: string;

  @ApiPropertyOptional({ example: '123456789' })
  rg?: string;

  @ApiProperty({ example: '1990-05-15' })
  dateOfBirth: Date;

  @ApiProperty({ enum: Gender, example: Gender.FEMALE })
  gender: Gender;

  @ApiPropertyOptional({ enum: BloodType, example: BloodType.O_POSITIVE })
  bloodType?: BloodType;

  @ApiProperty({ example: 'maria.silva@email.com' })
  email: string;

  @ApiProperty({ example: '(11) 3456-7890' })
  phone: string;

  @ApiPropertyOptional({ example: '(11) 98765-4321' })
  mobilePhone?: string;

  @ApiPropertyOptional({ example: '01234-567' })
  zipCode?: string;

  @ApiPropertyOptional({ example: 'Rua das Flores, 123, Apto 45' })
  address?: string;

  @ApiPropertyOptional({ example: 'São Paulo' })
  city?: string;

  @ApiPropertyOptional({ example: 'SP' })
  state?: string;

  @ApiPropertyOptional({ example: 'Brasil' })
  country?: string;

  @ApiPropertyOptional({ example: 'Unimed' })
  insuranceName?: string;

  @ApiPropertyOptional({ example: '1234567890' })
  insuranceNumber?: string;

  @ApiPropertyOptional({ example: '2025-12-31' })
  insuranceValidity?: Date;

  @ApiPropertyOptional({ example: 'João Silva Santos' })
  emergencyContactName?: string;

  @ApiPropertyOptional({ example: '(11) 99999-8888' })
  emergencyContactPhone?: string;

  @ApiPropertyOptional({ example: 'Esposo' })
  emergencyContactRelationship?: string;

  @ApiPropertyOptional({ example: 'Penicilina, Dipirona' })
  allergies?: string;

  @ApiPropertyOptional({ example: 'Diabetes tipo 2, Hipertensão' })
  chronicDiseases?: string;

  @ApiPropertyOptional({ example: 'Losartana 50mg, Metformina 850mg' })
  medications?: string;

  @ApiPropertyOptional({ example: 'Paciente idoso, necessita acompanhante' })
  observations?: string;

  @ApiProperty({ example: true })
  isActive: boolean;

  @ApiProperty({ example: 1 })
  companyId: number;

  @ApiProperty({ example: '2025-01-31T19:30:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2025-01-31T19:30:00.000Z' })
  updatedAt: Date;
}
