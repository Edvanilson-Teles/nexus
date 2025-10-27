import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from '../entities/company.entity';
import { CompanyMapper } from '../mappers/company.mapper';

@Injectable()
export class GetCompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly getCompanyRepository: Repository<Company>,
  ) {}

  async findAll() {
    const companies = await this.getCompanyRepository.find();
    return CompanyMapper.toResponseList(companies);
  }

  async findOneById(id: number) {
    const company = await this.getCompanyRepository.findOneBy({ id });

    if (!company) {
      throw new NotFoundException(`Company with ID ${id} not found`);
    }

    return CompanyMapper.toResponse(company);
  }
}
