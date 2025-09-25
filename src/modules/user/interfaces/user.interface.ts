export interface IUserBase {
  id: number;
  name: string;
  email: string;
  password: string;
  oldPassword?: string;
  newPassword?: string;
}
