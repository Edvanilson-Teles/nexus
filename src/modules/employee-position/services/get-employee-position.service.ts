import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployeePosition } from '../entities/employee-position.entity';
import { EmployeePositionMapper } from '../mappers/employee-position.mapper';

@Injectable()
export class GetEmployeePositionService {
  constructor(
    @InjectRepository(EmployeePosition)
    private getEmployeePositionRepository: Repository<EmployeePosition>,
  ) {}

  async findAll() {
    const employeePositions = await this.getEmployeePositionRepository.find();
    return EmployeePositionMapper.toResponseList(employeePositions);
  }

  async findOne(id: number) {
    const employeePosition = await this.getEmployeePositionRepository.findOneBy(
      { id },
    );

    if (!employeePosition) {
      throw new NotFoundException(`EmployeePosition with ID ${id} not found`);
    }
    return EmployeePositionMapper.toResponse(employeePosition);
  }
}
