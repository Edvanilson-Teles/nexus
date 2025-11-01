import { BaseCompanyEntity } from 'src/database/entities/base-company.entity';
import { Employee } from 'src/modules/human-resources/modules/employee/entities/employee.entity';
import { Position } from 'src/modules/organization/modules/position/entities/position.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne, Unique } from 'typeorm';

@Index(['employee', 'position', 'companyId'])
@Unique(['employee', 'position', 'companyId', 'startDate'])
@Entity()
export class EmployeePosition extends BaseCompanyEntity {
  @ManyToOne(() => Employee, (employee) => employee.employeePositions, {
    nullable: false,
  })
  @JoinColumn({ name: 'employeeId' })
  employee: Employee;

  @ManyToOne(() => Position, (position) => position.employeePositions, {
    nullable: false,
  })
  @JoinColumn({ name: 'positionId' })
  position: Position;

  @Column({ type: 'date', nullable: false })
  startDate: Date; 

  @Column({ type: 'date', nullable: true })
  endDate?: Date;
}
