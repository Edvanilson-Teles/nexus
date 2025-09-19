import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from '../entities/employee.entity';
import { EmployeeMapper } from '../mappers/employee.mapper';

@Injectable()
export class GetEmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly getEmployeeRepository: Repository<Employee>,
  ) {}

  async findAll() {
    const employees = await this.getEmployeeRepository.find();
    return EmployeeMapper.toResponseList(employees);
  }

  async findOneById(id: number) {
    const employee = await this.getEmployeeRepository.findOneBy({ id });

    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }

    return EmployeeMapper.toResponse(employee);
  }
}
