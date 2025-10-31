import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { PatientControllers } from './controllers';
import { PatientServices } from './services';
import { Company } from '../organization/modules/company/entities/company.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Patient, Company])],
  controllers: [...PatientControllers],
  providers: [...PatientServices],
  exports: [...PatientServices],
})
export class PatientsModule {}
