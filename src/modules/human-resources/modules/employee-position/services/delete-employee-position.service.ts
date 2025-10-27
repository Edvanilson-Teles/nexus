import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployeePosition } from '../entities/employee-position.entity';

@Injectable()
export class DeleteEmployeePositionService {
  constructor(
    @InjectRepository(EmployeePosition)
    private deleteEmployeePositionRepository: Repository<EmployeePosition>,
  ) {}

  async remove(id: number): Promise<void> {
    await this.deleteEmployeePositionRepository.delete(id);
  }
}
