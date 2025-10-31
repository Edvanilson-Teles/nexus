import { BaseCompanyEntity } from 'src/database/entities/base-company.entity';
import { EmployeePosition } from 'src/modules/human-resources/modules/employee-position/entities/employee-position.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Position extends BaseCompanyEntity {
  @Column({ type: 'varchar', length: 255 })
  name: string; // Nome do cargo (ex: "Analista de Sistemas", "Gerente de Projetos")

  @Column({ type: 'text', nullable: true })
  description?: string; // Descrição detalhada das responsabilidades e atividades do cargo

  @Column({ type: 'varchar', length: 50, nullable: true })
  level?: string; // Nível hierárquico do cargo (ex: "Júnior", "Pleno", "Sênior")

  @Column({ type: 'text', nullable: true })
  requirements?: string; // Requisitos necessários para ocupar o cargo (ex: "Graduação em...", "Experiência em...")

  @OneToMany(
    () => EmployeePosition,
    (employeePosition) => employeePosition.position,
  )
  employeePositions?: EmployeePosition[];
}
