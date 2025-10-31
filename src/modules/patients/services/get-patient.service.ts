import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Patient } from '../entities/patient.entity';
import { PatientMapper } from '../mappers/patient.mapper';

@Injectable()
export class GetPatientService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
  ) {}

  async findAll(
    search?: string,
    companyId?: number,
    isActive?: boolean,
  ) {
    const where: any = {};

    if (companyId) {
      where.companyId = companyId;
    }

    if (isActive !== undefined) {
      where.isActive = isActive;
    }

    if (search) {
      // Busca por nome, CPF ou email
      const patients = await this.patientRepository
        .createQueryBuilder('patient')
        .where(
          '(patient.name LIKE :search OR patient.cpf LIKE :search OR patient.email LIKE :search)',
          { search: `%${search}%` },
        )
        .andWhere(where)
        .orderBy('patient.name', 'ASC')
        .getMany();

      return PatientMapper.toResponseList(patients);
    }

    const patients = await this.patientRepository.find({
      where,
      order: { name: 'ASC' },
    });

    return PatientMapper.toResponseList(patients);
  }

  async findOne(id: number) {
    const patient = await this.patientRepository.findOne({
      where: { id },
    });

    if (!patient) {
      throw new NotFoundException(`Paciente com ID ${id} não encontrado`);
    }

    return PatientMapper.toResponse(patient);
  }

  async findByCpf(cpf: string) {
    const patient = await this.patientRepository.findOne({
      where: { cpf },
    });

    if (!patient) {
      throw new NotFoundException(`Paciente com CPF ${cpf} não encontrado`);
    }

    return PatientMapper.toResponse(patient);
  }
}
