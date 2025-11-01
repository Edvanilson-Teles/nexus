import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsEnum,
  IsOptional,
  IsNumber,
  IsBoolean,
  Length,
  Min,
  Max,
} from 'class-validator';
import { TestType, TestCategory } from '../entities/test.entity';

export class CreateTestDto {
  @ApiProperty({
    description: 'Código único do exame',
    example: 'HEMO001',
  })
  @IsString()
  @Length(1, 50)
  code: string;

  @ApiProperty({
    description: 'Nome do exame',
    example: 'Hemograma Completo',
  })
  @IsString()
  @Length(1, 200)
  name: string;

  @ApiProperty({
    description: 'Categoria do exame',
    enum: TestCategory,
    example: TestCategory.HEMATOLOGY,
  })
  @IsEnum(TestCategory)
  category: TestCategory;

  @ApiPropertyOptional({
    description: 'Descrição detalhada do exame',
    example: 'Análise completa dos componentes sanguíneos',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Tipo de resultado',
    enum: TestType,
    example: TestType.NUMERIC,
  })
  @IsEnum(TestType)
  type: TestType;

  @ApiPropertyOptional({
    description: 'Unidade de medida',
    example: 'mg/dL',
  })
  @IsOptional()
  @IsString()
  @Length(1, 50)
  unit?: string;

  @ApiPropertyOptional({
    description: 'Valor mínimo de referência',
    example: 4.5,
  })
  @IsOptional()
  @IsNumber()
  referenceMin?: number;

  @ApiPropertyOptional({
    description: 'Valor máximo de referência',
    example: 11.0,
  })
  @IsOptional()
  @IsNumber()
  referenceMax?: number;

  @ApiPropertyOptional({
    description: 'Valor de referência em texto (para exames qualitativos)',
    example: 'Negativo',
  })
  @IsOptional()
  @IsString()
  @Length(1, 200)
  referenceText?: string;

  @ApiPropertyOptional({
    description: 'Método de análise',
    example: 'Colorimetria',
  })
  @IsOptional()
  @IsString()
  @Length(1, 200)
  method?: string;

  @ApiPropertyOptional({
    description: 'Tipo de amostra necessária',
    example: 'Sangue total com EDTA',
  })
  @IsOptional()
  @IsString()
  @Length(1, 200)
  specimen?: string;

  @ApiPropertyOptional({
    description: 'Tipo de recipiente',
    example: 'Tubo roxo (EDTA)',
  })
  @IsOptional()
  @IsString()
  @Length(1, 100)
  container?: string;

  @ApiPropertyOptional({
    description: 'Tempo de resposta em horas',
    example: 24,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  turnaroundTime?: number;

  @ApiPropertyOptional({
    description: 'Instruções de preparo do paciente',
    example: 'Jejum de 8 horas',
  })
  @IsOptional()
  @IsString()
  preparation?: string;

  @ApiPropertyOptional({
    description: 'Requer jejum?',
    example: true,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  requiresFasting?: boolean;

  @ApiPropertyOptional({
    description: 'Horas de jejum necessárias',
    example: 8,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(24)
  fastingHours?: number;

  @ApiPropertyOptional({
    description: 'Preço do exame',
    example: 45.00,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;

  @ApiPropertyOptional({
    description: 'Custo do exame',
    example: 15.00,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  cost?: number;

  @ApiPropertyOptional({
    description: 'Está ativo?',
    example: true,
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({
    description: 'Está disponível para solicitação?',
    example: true,
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean;

  @ApiPropertyOptional({
    description: 'Observações gerais',
    example: 'Exame de rotina para check-up',
  })
  @IsOptional()
  @IsString()
  observations?: string;

  @ApiProperty({
    description: 'ID da empresa/laboratório',
    example: 1,
  })
  @IsNumber()
  companyId: number;
}
