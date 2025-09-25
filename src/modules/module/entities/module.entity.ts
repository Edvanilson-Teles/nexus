import { BaseEntity } from 'src/database/entities/base.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, ManyToMany, Entity } from 'typeorm';

@Entity('modules')
export class Module extends BaseEntity {
  @Column()
  name: string; // ex: 'EmployeeModule', 'ProjectModule'

  @ManyToMany(() => User, (user) => user.modules)
  users: User[];
}
