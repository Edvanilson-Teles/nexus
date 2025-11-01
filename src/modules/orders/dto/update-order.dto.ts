import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsDateString, IsString } from 'class-validator';
import { OrderStatus, OrderPriority } from '../entities/order.entity';

export class UpdateOrderDto {
  @ApiPropertyOptional({
    description: 'Status da ordem',
    enum: OrderStatus,
  })
  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus;

  @ApiPropertyOptional({
    description: 'Prioridade da ordem',
    enum: OrderPriority,
  })
  @IsOptional()
  @IsEnum(OrderPriority)
  priority?: OrderPriority;

  @ApiPropertyOptional({
    description: 'Data/hora agendada (formato ISO)',
  })
  @IsOptional()
  @IsDateString()
  scheduledAt?: string;

  @ApiPropertyOptional({
    description: 'Informações clínicas',
  })
  @IsOptional()
  @IsString()
  clinicalInfo?: string;

  @ApiPropertyOptional({
    description: 'Observações',
  })
  @IsOptional()
  @IsString()
  observations?: string;
}
