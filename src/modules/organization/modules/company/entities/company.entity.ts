import { BaseEntity } from 'src/database/entities/base.entity';
import { Employee } from 'src/modules/employee/entities/employee.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Company extends BaseEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  cnpj: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  logo: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Employee, (employee) => employee.company)
  employees: Employee[];
}
