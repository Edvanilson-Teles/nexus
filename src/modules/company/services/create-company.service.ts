import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { handleDbError } from 'src/common/db-error-handler';
import { Repository } from 'typeorm';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { Company } from '../entities/company.entity';
import { CompanyMapper } from '../mappers/company.mapper';

@Injectable()
export class CreateCompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly createCompanyRepository: Repository<Company>,
  ) {}
  async create(createCompanyDto: CreateCompanyDto) {
    const companyData = CompanyMapper.toInterface(createCompanyDto);
    const companyEntity = this.createCompanyRepository.create(
      CompanyMapper.toEntity(companyData),
    );

    const savedCompany = await handleDbError(() =>
      this.createCompanyRepository.save(companyEntity),
    );
    return CompanyMapper.toResponse(savedCompany);
  }
}
