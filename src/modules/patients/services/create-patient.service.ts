import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePatientDto } from '../dto/create-patient.dto';
import { Patient } from '../entities/patient.entity';
import { PatientMapper } from '../mappers/patient.mapper';
import { Company } from 'src/modules/organization/modules/company/entities/company.entity';

@Injectable()
export class CreatePatientService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async create(createPatientDto: CreatePatientDto) {
    // Verificar se a empresa existe
    const company = await this.companyRepository.findOne({
      where: { id: createPatientDto.companyId },
    });

    if (!company) {
      throw new NotFoundException(
        `Empresa com ID ${createPatientDto.companyId} não encontrada`,
      );
    }

    // Verificar se já existe paciente com o mesmo CPF
    const existingPatient = await this.patientRepository.findOne({
      where: { cpf: createPatientDto.cpf },
    });

    if (existingPatient) {
      throw new ConflictException(
        `Já existe um paciente cadastrado com o CPF ${createPatientDto.cpf}`,
      );
    }

    // Verificar se já existe paciente com o mesmo email
    const existingEmail = await this.patientRepository.findOne({
      where: { email: createPatientDto.email },
    });

    if (existingEmail) {
      throw new ConflictException(
        `Já existe um paciente cadastrado com o email ${createPatientDto.email}`,
      );
    }

    const patientData = PatientMapper.toInterface(createPatientDto);
    const patientEntity = this.patientRepository.create(
      PatientMapper.toEntity(patientData),
    );

    const savedPatient = await this.patientRepository.save(patientEntity);
    return PatientMapper.toResponse(savedPatient);
  }
}
