export class EmployeePositionResponseDto {
  id: number;
  employeeId: number;
  positionId: number;
  startDate: Date;
  endDate?: Date;
}
