import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  IsEnum,
  IsDateString,
  IsArray,
  ValidateNested,
  ArrayMinSize,
} from 'class-validator';
import { Type } from 'class-transformer';
import { OrderPriority } from '../entities/order.entity';

export class OrderItemDto {
  @ApiPropertyOptional({
    description: 'ID do exame (se for um teste individual)',
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  testId?: number;

  @ApiPropertyOptional({
    description: 'ID do painel (se for um painel de exames)',
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  panelId?: number;

  @ApiProperty({
    description: 'Preço do item',
    example: 45.0,
  })
  @IsNumber()
  price: number;

  @ApiPropertyOptional({
    description: 'Quantidade',
    example: 1,
    default: 1,
  })
  @IsOptional()
  @IsNumber()
  quantity?: number;

  @ApiPropertyOptional({
    description: 'Desconto',
    example: 0,
    default: 0,
  })
  @IsOptional()
  @IsNumber()
  discount?: number;

  @ApiPropertyOptional({
    description: 'Observações do item',
  })
  @IsOptional()
  @IsString()
  notes?: string;
}

export class CreateOrderDto {
  @ApiProperty({
    description: 'ID do paciente',
    example: 1,
  })
  @IsNumber()
  patientId: number;

  @ApiPropertyOptional({
    description: 'ID do médico solicitante',
    example: 2,
  })
  @IsOptional()
  @IsNumber()
  requestedById?: number;

  @ApiProperty({
    description: 'ID da empresa/laboratório',
    example: 1,
  })
  @IsNumber()
  companyId: number;

  @ApiProperty({
    description: 'Itens da ordem (testes ou painéis)',
    type: [OrderItemDto],
  })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];

  @ApiPropertyOptional({
    description: 'Prioridade da ordem',
    enum: OrderPriority,
    example: OrderPriority.ROUTINE,
  })
  @IsOptional()
  @IsEnum(OrderPriority)
  priority?: OrderPriority;

  @ApiPropertyOptional({
    description: 'Data/hora agendada (formato ISO)',
    example: '2025-11-01T10:00:00Z',
  })
  @IsOptional()
  @IsDateString()
  scheduledAt?: string;

  @ApiPropertyOptional({
    description: 'Informações clínicas relevantes',
    example: 'Paciente diabético, em jejum de 12h',
  })
  @IsOptional()
  @IsString()
  clinicalInfo?: string;

  @ApiPropertyOptional({
    description: 'Observações gerais',
  })
  @IsOptional()
  @IsString()
  observations?: string;
}
