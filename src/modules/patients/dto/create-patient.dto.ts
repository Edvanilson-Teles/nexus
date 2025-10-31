import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsDateString,
  IsEnum,
  IsOptional,
  IsNumber,
  IsBoolean,
  Length,
  Matches,
} from 'class-validator';
import { Gender, BloodType } from '../entities/patient.entity';

export class CreatePatientDto {
  @ApiProperty({
    description: 'Nome completo do paciente',
    example: 'Maria da Silva Santos',
  })
  @IsString()
  @Length(3, 200)
  name: string;

  @ApiProperty({
    description: 'CPF do paciente (somente números)',
    example: '12345678901',
  })
  @IsString()
  @Matches(/^\d{11}$/, { message: 'CPF deve conter 11 dígitos numéricos' })
  cpf: string;

  @ApiPropertyOptional({
    description: 'RG do paciente',
    example: '123456789',
  })
  @IsOptional()
  @IsString()
  @Length(1, 20)
  rg?: string;

  @ApiProperty({
    description: 'Data de nascimento (formato: YYYY-MM-DD)',
    example: '1990-05-15',
  })
  @IsDateString()
  dateOfBirth: string;

  @ApiProperty({
    description: 'Gênero do paciente',
    enum: Gender,
    example: Gender.FEMALE,
  })
  @IsEnum(Gender)
  gender: Gender;

  @ApiPropertyOptional({
    description: 'Tipo sanguíneo',
    enum: BloodType,
    example: BloodType.O_POSITIVE,
  })
  @IsOptional()
  @IsEnum(BloodType)
  bloodType?: BloodType;

  @ApiProperty({
    description: 'Email do paciente',
    example: 'maria.silva@email.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Telefone principal',
    example: '(11) 3456-7890',
  })
  @IsString()
  @Length(10, 20)
  phone: string;

  @ApiPropertyOptional({
    description: 'Telefone celular',
    example: '(11) 98765-4321',
  })
  @IsOptional()
  @IsString()
  @Length(10, 20)
  mobilePhone?: string;

  @ApiPropertyOptional({
    description: 'CEP',
    example: '01234-567',
  })
  @IsOptional()
  @IsString()
  @Length(8, 10)
  zipCode?: string;

  @ApiPropertyOptional({
    description: 'Endereço completo',
    example: 'Rua das Flores, 123, Apto 45',
  })
  @IsOptional()
  @IsString()
  @Length(1, 255)
  address?: string;

  @ApiPropertyOptional({
    description: 'Cidade',
    example: 'São Paulo',
  })
  @IsOptional()
  @IsString()
  @Length(1, 100)
  city?: string;

  @ApiPropertyOptional({
    description: 'Estado (sigla)',
    example: 'SP',
  })
  @IsOptional()
  @IsString()
  @Length(2, 2)
  state?: string;

  @ApiPropertyOptional({
    description: 'País',
    example: 'Brasil',
  })
  @IsOptional()
  @IsString()
  @Length(1, 100)
  country?: string;

  @ApiPropertyOptional({
    description: 'Nome do convênio/seguro',
    example: 'Unimed',
  })
  @IsOptional()
  @IsString()
  @Length(1, 200)
  insuranceName?: string;

  @ApiPropertyOptional({
    description: 'Número da carteirinha do convênio',
    example: '1234567890',
  })
  @IsOptional()
  @IsString()
  @Length(1, 100)
  insuranceNumber?: string;

  @ApiPropertyOptional({
    description: 'Validade do convênio (formato: YYYY-MM-DD)',
    example: '2025-12-31',
  })
  @IsOptional()
  @IsDateString()
  insuranceValidity?: string;

  @ApiPropertyOptional({
    description: 'Nome do contato de emergência',
    example: 'João Silva Santos',
  })
  @IsOptional()
  @IsString()
  @Length(1, 200)
  emergencyContactName?: string;

  @ApiPropertyOptional({
    description: 'Telefone do contato de emergência',
    example: '(11) 99999-8888',
  })
  @IsOptional()
  @IsString()
  @Length(10, 20)
  emergencyContactPhone?: string;

  @ApiPropertyOptional({
    description: 'Relacionamento com contato de emergência',
    example: 'Esposo',
  })
  @IsOptional()
  @IsString()
  @Length(1, 100)
  emergencyContactRelationship?: string;

  @ApiPropertyOptional({
    description: 'Alergias conhecidas',
    example: 'Penicilina, Dipirona',
  })
  @IsOptional()
  @IsString()
  allergies?: string;

  @ApiPropertyOptional({
    description: 'Doenças crônicas',
    example: 'Diabetes tipo 2, Hipertensão',
  })
  @IsOptional()
  @IsString()
  chronicDiseases?: string;

  @ApiPropertyOptional({
    description: 'Medicamentos em uso',
    example: 'Losartana 50mg, Metformina 850mg',
  })
  @IsOptional()
  @IsString()
  medications?: string;

  @ApiPropertyOptional({
    description: 'Observações gerais',
    example: 'Paciente idoso, necessita acompanhante',
  })
  @IsOptional()
  @IsString()
  observations?: string;

  @ApiPropertyOptional({
    description: 'Status ativo/inativo',
    example: true,
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({
    description: 'ID da empresa/laboratório',
    example: 1,
  })
  @IsNumber()
  companyId: number;
}
