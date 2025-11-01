import { CreatePatientDto } from '../dto/create-patient.dto';
import { UpdatePatientDto } from '../dto/update-patient.dto';
import { PatientResponseDto } from '../dto/patient-response.dto';
import { Patient } from '../entities/patient.entity';
import { IPatientBase } from '../interfaces/patient.interface';

export class PatientMapper {
  static toInterface(
    dto: CreatePatientDto | UpdatePatientDto,
  ): Partial<IPatientBase> {
    const data: Partial<IPatientBase> = {};

    if ('name' in dto && dto.name !== undefined) data.name = dto.name;
    if ('cpf' in dto && dto.cpf !== undefined) data.cpf = dto.cpf;
    if ('rg' in dto && dto.rg !== undefined) data.rg = dto.rg;
    if ('dateOfBirth' in dto && dto.dateOfBirth !== undefined)
      data.dateOfBirth = dto.dateOfBirth;
    if ('gender' in dto && dto.gender !== undefined) data.gender = dto.gender;
    if ('bloodType' in dto && dto.bloodType !== undefined)
      data.bloodType = dto.bloodType;
    if ('email' in dto && dto.email !== undefined) data.email = dto.email;
    if ('phone' in dto && dto.phone !== undefined) data.phone = dto.phone;
    if ('mobilePhone' in dto && dto.mobilePhone !== undefined)
      data.mobilePhone = dto.mobilePhone;
    if ('zipCode' in dto && dto.zipCode !== undefined)
      data.zipCode = dto.zipCode;
    if ('address' in dto && dto.address !== undefined)
      data.address = dto.address;
    if ('city' in dto && dto.city !== undefined) data.city = dto.city;
    if ('state' in dto && dto.state !== undefined) data.state = dto.state;
    if ('country' in dto && dto.country !== undefined)
      data.country = dto.country;
    if ('insuranceName' in dto && dto.insuranceName !== undefined)
      data.insuranceName = dto.insuranceName;
    if ('insuranceNumber' in dto && dto.insuranceNumber !== undefined)
      data.insuranceNumber = dto.insuranceNumber;
    if ('insuranceValidity' in dto && dto.insuranceValidity !== undefined)
      data.insuranceValidity = dto.insuranceValidity;
    if (
      'emergencyContactName' in dto &&
      dto.emergencyContactName !== undefined
    )
      data.emergencyContactName = dto.emergencyContactName;
    if (
      'emergencyContactPhone' in dto &&
      dto.emergencyContactPhone !== undefined
    )
      data.emergencyContactPhone = dto.emergencyContactPhone;
    if (
      'emergencyContactRelationship' in dto &&
      dto.emergencyContactRelationship !== undefined
    )
      data.emergencyContactRelationship = dto.emergencyContactRelationship;
    if ('allergies' in dto && dto.allergies !== undefined)
      data.allergies = dto.allergies;
    if ('chronicDiseases' in dto && dto.chronicDiseases !== undefined)
      data.chronicDiseases = dto.chronicDiseases;
    if ('medications' in dto && dto.medications !== undefined)
      data.medications = dto.medications;
    if ('observations' in dto && dto.observations !== undefined)
      data.observations = dto.observations;
    if ('isActive' in dto && dto.isActive !== undefined)
      data.isActive = dto.isActive;
    if ('companyId' in dto && dto.companyId !== undefined)
      data.companyId = dto.companyId;

    return data;
  }

  static toEntity(data: Partial<IPatientBase>): Partial<Patient> {
    return {
      ...data,
      dateOfBirth:
        typeof data.dateOfBirth === 'string'
          ? new Date(data.dateOfBirth)
          : data.dateOfBirth,
      insuranceValidity:
        typeof data.insuranceValidity === 'string'
          ? new Date(data.insuranceValidity)
          : data.insuranceValidity,
    };
  }

  static toResponse(entity: Patient): PatientResponseDto {
    return {
      id: entity.id,
      name: entity.name,
      cpf: entity.cpf,
      rg: entity.rg,
      dateOfBirth: entity.dateOfBirth,
      gender: entity.gender,
      bloodType: entity.bloodType,
      email: entity.email,
      phone: entity.phone,
      mobilePhone: entity.mobilePhone,
      zipCode: entity.zipCode,
      address: entity.address,
      city: entity.city,
      state: entity.state,
      country: entity.country,
      insuranceName: entity.insuranceName,
      insuranceNumber: entity.insuranceNumber,
      insuranceValidity: entity.insuranceValidity,
      emergencyContactName: entity.emergencyContactName,
      emergencyContactPhone: entity.emergencyContactPhone,
      emergencyContactRelationship: entity.emergencyContactRelationship,
      allergies: entity.allergies,
      chronicDiseases: entity.chronicDiseases,
      medications: entity.medications,
      observations: entity.observations,
      isActive: entity.isActive,
      companyId: entity.companyId,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static toResponseList(entities: Patient[]): PatientResponseDto[] {
    return entities.map((entity) => PatientMapper.toResponse(entity));
  }
}
