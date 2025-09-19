import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from '../entities/company.entity';

@Injectable()
export class DeleteCompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly deleteCompanyRepository: Repository<Company>,
  ) {}

  async remove(id: number): Promise<void> {
    await this.deleteCompanyRepository.delete(id);
  }
}
