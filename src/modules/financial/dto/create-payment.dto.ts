import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsDate, IsString, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePaymentDto {
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  invoiceId: number;

  @ApiProperty({ example: 150.00 })
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @ApiProperty({ example: 'credit_card', enum: ['cash', 'credit_card', 'debit_card', 'bank_transfer', 'pix', 'insurance', 'check', 'other'] })
  @IsNotEmpty()
  @IsString()
  method: string;

  @ApiProperty({ example: '2025-10-31', type: String })
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  paymentDate: Date;

  @ApiPropertyOptional({ example: 'TXN123456789' })
  @IsOptional()
  @IsString()
  transactionId?: string;

  @ApiPropertyOptional({ example: 'REF123456' })
  @IsOptional()
  @IsString()
  referenceNumber?: string;

  @ApiPropertyOptional({ example: 'Pagamento via cartão de crédito' })
  @IsOptional()
  @IsString()
  notes?: string;
}
