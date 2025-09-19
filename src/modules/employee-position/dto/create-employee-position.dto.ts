import { IsDate, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateEmployeePositionDto {
  @IsNumber()
  @IsNotEmpty()
  employeeId: number;

  @IsNumber()
  @IsNotEmpty()
  positionId: number;

  @IsDate()
  @IsNotEmpty()
  startDate: Date;

  @IsDate()
  @IsOptional()
  endDate?: Date;
}
