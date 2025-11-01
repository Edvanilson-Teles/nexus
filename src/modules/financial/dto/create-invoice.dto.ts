import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsDate, IsString, IsArray, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class CreateInvoiceItemDto {
  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsNumber()
  testId?: number;

  @ApiProperty({ example: 'Hemograma Completo' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @ApiProperty({ example: 50.00 })
  @IsNotEmpty()
  @IsNumber()
  unitPrice: number;

  @ApiPropertyOptional({ example: 10 })
  @IsOptional()
  @IsNumber()
  discountPercent?: number;

  @ApiPropertyOptional({ example: 5.00 })
  @IsOptional()
  @IsNumber()
  discountAmount?: number;

  @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  @IsNumber()
  taxPercent?: number;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsNumber()
  orderId?: number;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsNumber()
  sampleId?: number;
}

export class CreateInvoiceDto {
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  patientId: number;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  companyId: number;

  @ApiProperty({ example: '2025-10-31', type: String })
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  issueDate: Date;

  @ApiProperty({ example: '2025-11-15', type: String })
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  dueDate: Date;

  @ApiProperty({ type: [CreateInvoiceItemDto] })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateInvoiceItemDto)
  items: CreateInvoiceItemDto[];

  @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  @IsNumber()
  discountAmount?: number;

  @ApiPropertyOptional({ example: 'Desconto especial para paciente' })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiPropertyOptional({ example: 'Unimed' })
  @IsOptional()
  @IsString()
  insuranceProvider?: string;

  @ApiPropertyOptional({ example: 'CLAIM123456' })
  @IsOptional()
  @IsString()
  insuranceClaimNumber?: string;
}
