export interface ICompanyBase {
  name: string;
  cnpj: string;
  address?: string;
  phone?: string;
  email?: string;
  logo?: string;
  isActive: boolean;
}
