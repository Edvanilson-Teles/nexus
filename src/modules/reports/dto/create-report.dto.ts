import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateReportDto {
  @ApiProperty({ example: 1, description: 'ID do paciente' })
  @IsNotEmpty()
  @IsNumber()
  patientId: number;

  @ApiProperty({ example: 1, description: 'ID da ordem' })
  @IsNotEmpty()
  @IsNumber()
  orderId: number;

  @ApiProperty({ example: 1, description: 'ID da empresa' })
  @IsNotEmpty()
  @IsNumber()
  companyId: number;

  @ApiPropertyOptional({ example: 'Exame de Hemograma Completo', description: 'Título do relatório' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ 
    example: 'Valores dentro da normalidade para idade e sexo', 
    description: 'Achados clínicos' 
  })
  @IsOptional()
  @IsString()
  findings?: string;

  @ApiPropertyOptional({ 
    example: 'Hemograma sem alterações significativas', 
    description: 'Interpretação médica' 
  })
  @IsOptional()
  @IsString()
  interpretation?: string;

  @ApiPropertyOptional({ 
    example: 'Manter acompanhamento médico regular', 
    description: 'Recomendações médicas' 
  })
  @IsOptional()
  @IsString()
  recommendations?: string;

  @ApiPropertyOptional({ 
    example: 'Paciente em jejum de 12 horas', 
    description: 'Notas adicionais' 
  })
  @IsOptional()
  @IsString()
  notes?: string;
}
