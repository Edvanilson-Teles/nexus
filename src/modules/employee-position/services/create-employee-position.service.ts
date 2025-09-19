import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { handleDbError } from 'src/common/db-error-handler';
import { Repository } from 'typeorm';
import { CreateEmployeePositionDto } from '../dto/create-employee-position.dto';
import { EmployeePosition } from '../entities/employee-position.entity';
import { EmployeePositionMapper } from '../mappers/employee-position.mapper';

@Injectable()
export class CreateEmployeePositionService {
  constructor(
    @InjectRepository(EmployeePosition)
    private createEmployeePositionRepository: Repository<EmployeePosition>,
  ) {}
  async create(createEmployeePositionDto: CreateEmployeePositionDto) {
    const employeePositionData = EmployeePositionMapper.toInterface(
      createEmployeePositionDto,
    );
    const employeePositionEntity = this.createEmployeePositionRepository.create(
      EmployeePositionMapper.toEntity(employeePositionData),
    );

    const savedEmployeePosition = await handleDbError(() =>
      this.createEmployeePositionRepository.save(employeePositionEntity),
    );
    return EmployeePositionMapper.toResponse(savedEmployeePosition);
  }
}
