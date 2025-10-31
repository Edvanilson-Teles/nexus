import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class ValidateReportDto {
  @ApiProperty({ example: 1, description: 'ID do usuário validador' })
  @IsNotEmpty()
  @IsNumber()
  validatedBy: number;
}

export class SignReportDto {
  @ApiProperty({ example: 1, description: 'ID do usuário que assina' })
  @IsNotEmpty()
  @IsNumber()
  signedBy: number;
}

export class ReleaseReportDto {
  @ApiProperty({ example: 1, description: 'ID do usuário que libera' })
  @IsNotEmpty()
  @IsNumber()
  releasedBy: number;
}
