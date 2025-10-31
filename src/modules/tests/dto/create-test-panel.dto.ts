import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsNumber,
  IsBoolean,
  IsArray,
  Length,
  Min,
  Max,
  ArrayMinSize,
} from 'class-validator';

export class CreateTestPanelDto {
  @ApiProperty({
    description: 'Código único do painel',
    example: 'PANEL001',
  })
  @IsString()
  @Length(1, 50)
  code: string;

  @ApiProperty({
    description: 'Nome do painel',
    example: 'Check-up Completo',
  })
  @IsString()
  @Length(1, 200)
  name: string;

  @ApiPropertyOptional({
    description: 'Descrição do painel',
    example: 'Painel completo para check-up anual',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'IDs dos exames incluídos no painel',
    example: [1, 2, 3, 4],
    type: [Number],
  })
  @IsArray()
  @ArrayMinSize(1)
  @IsNumber({}, { each: true })
  testIds: number[];

  @ApiPropertyOptional({
    description: 'Preço do painel',
    example: 150.00,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;

  @ApiPropertyOptional({
    description: 'Desconto percentual',
    example: 10,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  discount?: number;

  @ApiPropertyOptional({
    description: 'Está ativo?',
    example: true,
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({
    description: 'Observações',
    example: 'Painel recomendado para adultos acima de 40 anos',
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
