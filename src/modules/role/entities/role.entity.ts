import { BaseEntity } from 'src/database/entities/base.entity';
import { Permission } from 'src/modules/permission/entities/permission.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, JoinTable, ManyToMany, Entity } from 'typeorm';

@Entity('roles')
export class Role extends BaseEntity {
  @Column()
  name: string;

  @ManyToMany(() => Permission, (permission) => permission.roles)
  @JoinTable()
  permissions: Permission[];

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];
}
