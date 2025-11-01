import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNumber,
  IsString,
  IsEnum,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { SampleType } from '../entities/sample.entity';

export class CreateSampleDto {
  @ApiProperty({
    description: 'ID do item da ordem',
    example: 1,
  })
  @IsNumber()
  orderItemId: number;

  @ApiProperty({
    description: 'Tipo de amostra',
    enum: SampleType,
    example: SampleType.BLOOD,
  })
  @IsEnum(SampleType)
  type: SampleType;

  @ApiPropertyOptional({
    description: 'ID do usuário que coletou',
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  collectedById?: number;

  @ApiPropertyOptional({
    description: 'Local de armazenamento',
    example: 'Refrigerador A - Prateleira 2',
  })
  @IsOptional()
  @IsString()
  storageLocation?: string;

  @ApiPropertyOptional({
    description: 'Volume em mL',
    example: 5.0,
  })
  @IsOptional()
  @IsNumber()
  volume?: number;

  @ApiPropertyOptional({
    description: 'Tipo de recipiente',
    example: 'Tubo roxo (EDTA)',
  })
  @IsOptional()
  @IsString()
  container?: string;

  @ApiPropertyOptional({
    description: 'A amostra é aceitável?',
    example: true,
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  isAcceptable?: boolean;

  @ApiPropertyOptional({
    description: 'Motivo da rejeição (se aplicável)',
  })
  @IsOptional()
  @IsString()
  rejectionReason?: string;

  @ApiPropertyOptional({
    description: 'Observações',
  })
  @IsOptional()
  @IsString()
  observations?: string;
}
