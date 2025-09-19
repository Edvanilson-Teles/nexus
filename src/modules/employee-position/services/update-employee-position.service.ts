import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateEmployeePositionDto } from '../dto/update-employee-position.dto';
import { EmployeePosition } from '../entities/employee-position.entity';
import { EmployeePositionMapper } from '../mappers/employee-position.mapper';

@Injectable()
export class UpdateEmployeePositionService {
  constructor(
    @InjectRepository(EmployeePosition)
    private updateEmployeePositionRepository: Repository<EmployeePosition>,
  ) {}

  async update(
    id: number,
    updateEmployeePositionDto: UpdateEmployeePositionDto,
  ) {
    const employeePosition =
      await this.updateEmployeePositionRepository.findOneBy({ id });

    if (!employeePosition) {
      throw new Error(`EmployeePosition with ID ${id} not found`);
    }

    const positionData = await EmployeePositionMapper.toInterface(
      updateEmployeePositionDto,
    );

    await this.updateEmployeePositionRepository.update(id, positionData);
    return EmployeePositionMapper.toResponse({
      ...employeePosition,
      ...positionData,
    });
  }
}
