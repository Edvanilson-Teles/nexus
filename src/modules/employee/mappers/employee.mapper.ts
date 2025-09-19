import { CreateEmployeeDto } from '../dto/create-employee.dto';
import { EmployeeResponseDto } from '../dto/employee-response.dto';
import { UpdateEmployeeDto } from '../dto/update-employee.dto';
import { Employee } from '../entities/employee.entity';
import { IEmployeeBase } from '../interfaces/employee.interface';

export class EmployeeMapper {
  static toInterface(
    dto: CreateEmployeeDto | UpdateEmployeeDto,
  ): Partial<IEmployeeBase> {
    return {
      name: dto.name,
      email: dto.email,
      cpf: dto.cpf,
      rg: dto.rg,
      issuingAuthority: dto.issuingAuthority,
      pis: dto.pis,
      workCardNumber: dto.workCardNumber,
      workCardSeries: dto.workCardSeries,
      nationality: dto.nationality,
      birthDate: dto.birthDate,
      maritalStatus: dto.maritalStatus,
      educationLevel: dto.educationLevel,
      voterRegistration: dto.voterRegistration,
      driverLicense: dto.driverLicense,
      driverLicenseCategory: dto.driverLicenseCategory,
      driverLicenseExpiration: dto.driverLicenseExpiration,
      address: dto.address,
      city: dto.city,
      state: dto.state,
      bankName: dto.bankName,
      bankAccountNumber: dto.bankAccountNumber,
      bankAgencyNumber: dto.bankAgencyNumber,
      hireDate: dto.hireDate,
      terminationDate: dto.terminationDate,
      companyId: dto.companyId,
    };
  }

  static toEntity(data: Partial<IEmployeeBase>): Partial<Employee> {
    return {
      ...data,
    };
  }

  static toResponse(entity: Employee): Partial<EmployeeResponseDto> {
    return {
      id: entity.id,
      name: entity.name,
      email: entity.email,
      cpf: entity.cpf,
      rg: entity.rg,
      issuingAuthority: entity.issuingAuthority,
      pis: entity.pis,
      workCardNumber: entity.workCardNumber,
      workCardSeries: entity.workCardSeries,
      nationality: entity.nationality,
      birthDate: entity.birthDate,
      maritalStatus: entity.maritalStatus,
      educationLevel: entity.educationLevel,
      voterRegistration: entity.voterRegistration,
      driverLicense: entity.driverLicense,
      driverLicenseCategory: entity.driverLicenseCategory,
      driverLicenseExpiration: entity.driverLicenseExpiration,
      address: entity.address,
      city: entity.city,
      state: entity.state,
      bankName: entity.bankName,
      bankAccountNumber: entity.bankAccountNumber,
      bankAgencyNumber: entity.bankAgencyNumber,
      hireDate: entity.hireDate,
      terminationDate: entity.terminationDate,
      companyId: entity.companyId,
    };
  }
  static toResponseList(entity: Employee[]): any[] {
    return entity.map((Employee) => EmployeeMapper.toResponse(Employee));
  }
}
