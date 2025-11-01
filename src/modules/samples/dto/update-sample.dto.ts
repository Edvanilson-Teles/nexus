import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsOptional,
  IsString,
  IsNumber,
  IsBoolean,
} from 'class-validator';
import { SampleStatus } from '../entities/sample.entity';

export class UpdateSampleDto {
  @ApiPropertyOptional({
    description: 'Status da amostra',
    enum: SampleStatus,
  })
  @IsOptional()
  @IsEnum(SampleStatus)
  status?: SampleStatus;

  @ApiPropertyOptional({
    description: 'Local de armazenamento',
  })
  @IsOptional()
  @IsString()
  storageLocation?: string;

  @ApiPropertyOptional({
    description: 'Volume em mL',
  })
  @IsOptional()
  @IsNumber()
  volume?: number;

  @ApiPropertyOptional({
    description: 'A amostra é aceitável?',
  })
  @IsOptional()
  @IsBoolean()
  isAcceptable?: boolean;

  @ApiPropertyOptional({
    description: 'Motivo da rejeição',
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
