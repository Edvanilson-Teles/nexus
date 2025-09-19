export class CompanyResponseDto {
  id: number;
  name: string;
  cnpj: string;
  address?: string;
  phone?: string;
  email?: string;
  logo?: string;
  isActive: boolean;
}
