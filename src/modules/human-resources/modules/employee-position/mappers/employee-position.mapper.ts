import { CreateEmployeePositionDto } from '../dto/create-employee-position.dto';
import { EmployeePositionResponseDto } from '../dto/employee-position-response.dto';
import { UpdateEmployeePositionDto } from '../dto/update-employee-position.dto';
import { EmployeePosition } from '../entities/employee-position.entity';
import { IEmployeePosition } from '../interfaces/employee-position.interface';

export class EmployeePositionMapper {
  static toInterface(
    dto: CreateEmployeePositionDto | UpdateEmployeePositionDto,
  ): Partial<IEmployeePosition> {
    return {
      employeeId: dto.employeeId,
      positionId: dto.positionId,
      startDate: dto.startDate,
      endDate: dto.endDate,
    };
  }

  static toEntity(data: Partial<IEmployeePosition>): Partial<EmployeePosition> {
    return { ...data };
  }

  static toResponse(
    entity: EmployeePosition,
  ): Partial<EmployeePositionResponseDto> {
    return {
      id: entity.id,
      employeeId: entity.employee.id,
      positionId: entity.position.id,
      startDate: entity.startDate,
      endDate: entity.endDate,
    };
  }

  static toResponseList(entities: EmployeePosition[]): any[] {
    return entities.map((ep) => EmployeePositionMapper.toResponse(ep));
  }
}
