import Module from 'module';
import { BaseEntity } from 'src/database/entities/base.entity';
import { Column, JoinTable, ManyToMany } from 'typeorm';

export class Feature extends BaseEntity {
  @Column()
  name: string; // ex: 'advancedReporting'

  @ManyToMany(() => Module)
  @JoinTable()
  modules: Module[];
}
