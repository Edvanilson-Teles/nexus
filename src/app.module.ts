import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { DatabaseModule } from './database/database.module';
import { CompanyModule } from './modules/company/company.module';
import { EmployeeModule } from './modules/employee/employee.module';
import { PositionModule } from './modules/position/position.module';
import { EmployeePositionModule } from './modules/employee-position/employee-position.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    DatabaseModule,
    CompanyModule,
    EmployeeModule,
    PositionModule,
    EmployeePositionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
