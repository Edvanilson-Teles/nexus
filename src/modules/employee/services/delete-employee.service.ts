import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from '../entities/employee.entity';

@Injectable()
export class DeleteEmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly deleteEmployeeRepository: Repository<Employee>,
  ) {}
  async remove(id: number, companyId?: number): Promise<void> {
    if (companyId) {
      await this.deleteEmployeeRepository.delete({ id, company: { id: companyId } as any } as any);
    } else {
      await this.deleteEmployeeRepository.delete(id);
    }
  }
}
