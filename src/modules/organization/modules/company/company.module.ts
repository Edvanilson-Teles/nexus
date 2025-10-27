import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyControllers } from './controllers';
import { Company } from './entities/company.entity';
import { CompanyServices } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([Company])],
  controllers: [...CompanyControllers],
  providers: [...CompanyServices],
})
export class CompanyModule {}
