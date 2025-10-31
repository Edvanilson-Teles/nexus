import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, IsBoolean } from 'class-validator';

export class CreateResultDto {
  @ApiProperty({
    description: 'Sample ID',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  sampleId: number;

  @ApiProperty({
    description: 'Test ID',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  testId: number;

  @ApiProperty({
    description: 'Company ID',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  companyId: number;

  @ApiPropertyOptional({
    description: 'Result value (text representation)',
    example: '15.5',
  })
  @IsOptional()
  @IsString()
  value?: string;

  @ApiPropertyOptional({
    description: 'Numeric value for numeric tests',
    example: 15.5,
  })
  @IsOptional()
  @IsNumber()
  numericValue?: number;

  @ApiPropertyOptional({
    description: 'Unit of measurement',
    example: 'mg/dL',
    maxLength: 50,
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  unit?: string;

  @ApiPropertyOptional({
    description: 'Result flag: normal, high, low, critical_high, critical_low, abnormal',
    example: 'normal',
    maxLength: 20,
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  flag?: string;

  @ApiPropertyOptional({
    description: 'Reference range text',
    example: '10-20 mg/dL',
  })
  @IsOptional()
  @IsString()
  referenceRange?: string;

  @ApiPropertyOptional({
    description: 'Method used for the test',
    example: 'Enzymatic colorimetric',
    maxLength: 200,
  })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  method?: string;

  @ApiPropertyOptional({
    description: 'Comments from lab technician',
    example: 'Sample slightly hemolyzed',
  })
  @IsOptional()
  @IsString()
  comments?: string;

  @ApiPropertyOptional({
    description: 'Status: pending, validated, reviewed, released, corrected',
    example: 'pending',
    maxLength: 20,
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  status?: string;

  @ApiPropertyOptional({
    description: 'User ID who entered the result',
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  enteredBy?: number;

  @ApiPropertyOptional({
    description: 'Instrument/Analyzer name',
    example: 'Cobas c311',
    maxLength: 200,
  })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  instrumentName?: string;

  @ApiPropertyOptional({
    description: 'Quality control passed',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  qcPassed?: boolean;

  @ApiPropertyOptional({
    description: 'Quality control comments',
    example: 'All controls within range',
  })
  @IsOptional()
  @IsString()
  qcComments?: string;
}
