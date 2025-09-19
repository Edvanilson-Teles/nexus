import { CompanyResponseDto } from '../dto/company-response.dto';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { UpdateCompanyDto } from '../dto/update-company.dto';
import { Company } from '../entities/company.entity';
import { ICompanyBase } from '../interfaces/company.interface';

export class CompanyMapper {
  static toInterface(
    dto: CreateCompanyDto | UpdateCompanyDto,
  ): Partial<ICompanyBase> {
    const data: Partial<ICompanyBase> = {
      name: dto.name,
      cnpj: dto.cnpj,
      address: dto.address,
      phone: dto.phone,
      email: dto.email,
      logo: dto.logo,
    };

    if ('isActive' in dto) {
      data.isActive = dto.isActive;
    }

    return data;
  }

  static toEntity(data: Partial<ICompanyBase>): Partial<Company> {
    return { ...data };
  }

  static toResponse(entity: Company): Partial<CompanyResponseDto> {
    return {
      id: entity.id,
      name: entity.name,
      cnpj: entity.cnpj,
      address: entity.address,
      phone: entity.phone,
      email: entity.email,
      logo: entity.logo,
      isActive: entity.isActive,
    };
  }

  static toResponseList(entities: Company[]): any[] {
    return entities.map((company) => CompanyMapper.toResponse(company));
  }
}
