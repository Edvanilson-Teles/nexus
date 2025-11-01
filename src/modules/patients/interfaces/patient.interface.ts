import { Gender, BloodType } from '../entities/patient.entity';

export interface IPatientBase {
  id?: number;
  name: string;
  cpf: string;
  rg?: string;
  dateOfBirth: Date | string;
  gender: Gender;
  bloodType?: BloodType;
  email: string;
  phone: string;
  mobilePhone?: string;
  zipCode?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  insuranceName?: string;
  insuranceNumber?: string;
  insuranceValidity?: Date | string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  emergencyContactRelationship?: string;
  allergies?: string;
  chronicDiseases?: string;
  medications?: string;
  observations?: string;
  isActive?: boolean;
  companyId: number;
  createdAt?: Date;
  updatedAt?: Date;
}
