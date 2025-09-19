import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeControllers } from './controllers';
import { Employee } from './entities/employee.entity';
import { EmployeeServices } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([Employee])],
  controllers: [...EmployeeControllers],
  providers: [...EmployeeServices],
})
export class EmployeeModule {}
