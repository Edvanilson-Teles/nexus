import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdatePatientDto } from '../dto/update-patient.dto';
import { Patient } from '../entities/patient.entity';
import { PatientMapper } from '../mappers/patient.mapper';

@Injectable()
export class UpdatePatientService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
  ) {}

  async update(id: number, updatePatientDto: UpdatePatientDto) {
    const patient = await this.patientRepository.findOne({
      where: { id },
    });

    if (!patient) {
      throw new NotFoundException(`Paciente com ID ${id} não encontrado`);
    }

    // Se estiver atualizando o CPF, verificar se já existe outro paciente com o mesmo CPF
    if (updatePatientDto.cpf && updatePatientDto.cpf !== patient.cpf) {
      const existingCpf = await this.patientRepository.findOne({
        where: { cpf: updatePatientDto.cpf },
      });

      if (existingCpf) {
        throw new ConflictException(
          `Já existe outro paciente cadastrado com o CPF ${updatePatientDto.cpf}`,
        );
      }
    }

    // Se estiver atualizando o email, verificar se já existe outro paciente com o mesmo email
    if (updatePatientDto.email && updatePatientDto.email !== patient.email) {
      const existingEmail = await this.patientRepository.findOne({
        where: { email: updatePatientDto.email },
      });

      if (existingEmail) {
        throw new ConflictException(
          `Já existe outro paciente cadastrado com o email ${updatePatientDto.email}`,
        );
      }
    }

    const patientData = PatientMapper.toInterface(updatePatientDto);
    const updatedData = PatientMapper.toEntity(patientData);

    await this.patientRepository.update(id, updatedData);

    const updatedPatient = await this.patientRepository.findOne({
      where: { id },
    });

    return PatientMapper.toResponse(updatedPatient!);
  }
}
