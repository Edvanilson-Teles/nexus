import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class ValidateResultDto {
  @ApiProperty({
    description: 'User ID who is validating the result',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  validatedBy: number;

  @ApiPropertyOptional({
    description: 'Validation comments',
    example: 'Result verified and approved',
  })
  @IsOptional()
  @IsString()
  comments?: string;
}
