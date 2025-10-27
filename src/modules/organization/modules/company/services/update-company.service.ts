import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateCompanyDto } from '../dto/update-company.dto';
import { Company } from '../entities/company.entity';
import { CompanyMapper } from '../mappers/company.mapper';

@Injectable()
export class UpdateCompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly updateCompanyRepository: Repository<Company>,
  ) {}

  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    const updatedCompany = await this.updateCompanyRepository.findOneBy({ id });

    if (!updatedCompany) {
      throw new NotFoundException(`Company with ID ${id} not found`);
    }

    const companyData = CompanyMapper.toInterface(updateCompanyDto);
    await this.updateCompanyRepository.update(id, companyData);
    return CompanyMapper.toResponse({ ...updatedCompany, ...companyData });
  }
}
