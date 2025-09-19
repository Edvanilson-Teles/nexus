import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { handleDbError } from '../../../common/db-error-handler';
import { CreateEmployeeDto } from '../dto/create-employee.dto';
import { Employee } from '../entities/employee.entity';
import { EmployeeMapper } from '../mappers/employee.mapper';

@Injectable()
export class CreateEmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly createEmployeeRepository: Repository<Employee>,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    const employeeData = EmployeeMapper.toInterface(createEmployeeDto);
    const employeeEntity = this.createEmployeeRepository.create(
      EmployeeMapper.toEntity(employeeData),
    );

    const savedEmployee = await handleDbError(() =>
      this.createEmployeeRepository.save(employeeEntity),
    );
    return EmployeeMapper.toResponse(savedEmployee);
  }
}
