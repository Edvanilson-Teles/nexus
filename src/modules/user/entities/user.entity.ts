import * as bcrypt from 'bcryptjs';
import { BaseEntity } from 'src/database/entities/base.entity';
import { Company } from 'src/modules/organization/modules/company/entities/company.entity';
import { Module } from 'src/modules/module/entities/module.entity';
import { Role } from 'src/modules/role/entities/role.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
} from 'typeorm';

@Entity('users')
export class User extends BaseEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password && !this.password.startsWith('$2b$')) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }

  async comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable()
  roles: Role[];

  @ManyToMany(() => Module)
  @JoinTable()
  modules: Module[];

  @ManyToMany(() => Company)
  @JoinTable()
  companies: Company[];
}
