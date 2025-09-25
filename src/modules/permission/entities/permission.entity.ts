import { BaseEntity } from 'src/database/entities/base.entity';
import { Role } from 'src/modules/role/entities/role.entity';
import { Column, ManyToMany, Entity } from 'typeorm';

@Entity('permissions')
export class Permission extends BaseEntity {
  @Column()
  action: string; // ex: 'employee.create', 'project.view'

  @ManyToMany(() => Role, (role) => role.permissions)
  roles: Role[];
}
