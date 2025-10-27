import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  cpf: string;

  @IsString()
  @IsOptional()
  rg?: string;

  @IsString()
  @IsOptional()
  issuingAuthority?: string;

  @IsString()
  @IsOptional()
  pis?: string;

  @IsString()
  @IsOptional()
  workCardNumber?: string;

  @IsString()
  @IsOptional()
  workCardSeries?: string;

  @IsString()
  @IsOptional()
  nationality?: string;

  @IsString()
  @IsOptional()
  birthDate?: Date;

  @IsString()
  @IsOptional()
  maritalStatus?: string;

  @IsString()
  @IsNotEmpty()
  educationLevel: string;

  @IsString()
  @IsOptional()
  voterRegistration?: string;

  @IsString()
  @IsOptional()
  driverLicense?: string;

  @IsString()
  @IsOptional()
  driverLicenseCategory?: string;

  @IsString()
  @IsOptional()
  driverLicenseExpiration?: Date;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsString()
  @IsOptional()
  state?: string;

  @IsString()
  @IsOptional()
  bankName?: string;

  @IsString()
  @IsOptional()
  bankAccountNumber?: string;

  @IsString()
  @IsOptional()
  bankAgencyNumber?: string;

  @IsDate()
  @IsNotEmpty()
  hireDate: Date;

  @IsDate()
  @IsOptional()
  terminationDate?: Date;

  @IsNumber()
  @IsNotEmpty()
  companyId: number;
}
