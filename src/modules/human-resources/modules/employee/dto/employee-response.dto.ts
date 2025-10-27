export class EmployeeResponseDto {
  id: number;
  name: string;
  email: string;
  cpf: string;
  rg?: string;
  issuingAuthority?: string;
  pis?: string;
  workCardNumber?: string;
  workCardSeries?: string;
  nationality?: string;
  birthDate?: Date;
  maritalStatus?: string;
  educationLevel: string;
  voterRegistration?: string;
  driverLicense?: string;
  driverLicenseCategory?: string;
  driverLicenseExpiration?: Date;
  address?: string;
  city?: string;
  state?: string;
  bankName?: string;
  bankAccountNumber?: string;
  bankAgencyNumber?: string;
  hireDate: Date;
  terminationDate?: Date;
  companyId: number;
}
