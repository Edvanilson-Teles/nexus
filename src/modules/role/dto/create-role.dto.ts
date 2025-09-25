import { Column } from 'typeorm';

export class CreateRoleDto {
  @Column()
  name: string;
}
