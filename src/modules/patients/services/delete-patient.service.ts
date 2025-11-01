import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from '../entities/patient.entity';

@Injectable()
export class DeletePatientService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
  ) {}

  async softDelete(id: number) {
    const patient = await this.patientRepository.findOne({
      where: { id },
    });

    if (!patient) {
      throw new NotFoundException(`Paciente com ID ${id} não encontrado`);
    }

    await this.patientRepository.softDelete(id);

    return {
      message: `Paciente ${patient.name} removido com sucesso`,
      id,
    };
  }

  async deactivate(id: number) {
    const patient = await this.patientRepository.findOne({
      where: { id },
    });

    if (!patient) {
      throw new NotFoundException(`Paciente com ID ${id} não encontrado`);
    }

    await this.patientRepository.update(id, { isActive: false });

    return {
      message: `Paciente ${patient.name} desativado com sucesso`,
      id,
    };
  }
}
