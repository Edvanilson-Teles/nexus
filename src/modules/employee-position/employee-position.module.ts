import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeePositionControllers } from './controllers';
import { EmployeePosition } from './entities/employee-position.entity';
import { EmployeePositionServices } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([EmployeePosition])],
  controllers: [...EmployeePositionControllers],
  providers: [...EmployeePositionServices],
})
export class EmployeePositionModule {}
