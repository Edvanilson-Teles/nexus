import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateEmployeeDto } from '../dto/update-employee.dto';
import { Employee } from '../entities/employee.entity';
import { EmployeeMapper } from '../mappers/employee.mapper';

@Injectable()
export class UpdateEmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly updateEmployeeRepository: Repository<Employee>,
  ) {}
  async update(id: number, updateEmployeeDto: UpdateEmployeeDto, companyId?: number) {
    const employee = await this.updateEmployeeRepository.findOne({ where: { id }, relations: ['company'] });

    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }

    // ensure ownership: if companyId provided, employee must belong to that company
    if (companyId && employee.company?.id !== companyId) {
      throw new NotFoundException(`Employee with ID ${id} not found in company ${companyId}`);
    }
    const employeeData = EmployeeMapper.toInterface(updateEmployeeDto);
    await this.updateEmployeeRepository.update(id, employeeData);
    return EmployeeMapper.toResponse({ ...employee, ...employeeData });
  }
}
