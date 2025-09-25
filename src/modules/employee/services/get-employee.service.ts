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
    // For multi-tenant safety, callers should pass a companyId to filter results.
    const employees = await this.getEmployeeRepository.find();
    return EmployeeMapper.toResponseList(employees);
  }

  async findAllByCompany(companyId: number) {
    const employees = await this.getEmployeeRepository.find({
      where: { company: { id: companyId } },
    });
    return EmployeeMapper.toResponseList(employees);
  }

  async findOneById(id: number, companyId?: number) {
    const where: any = { id };
    if (companyId) where.company = { id: companyId };
    const employee = await this.getEmployeeRepository.findOne({ where });

    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }

    return EmployeeMapper.toResponse(employee);
  }
}
