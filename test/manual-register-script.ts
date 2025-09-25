import 'reflect-metadata';
import { Test } from '@nestjs/testing';
import { INestApplication, Module } from '@nestjs/common';
import request from 'supertest';
import { ConfigModule } from '@nestjs/config';
import configuration from '../src/config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyModule } from '../src/modules/company/company.module';
import { EmployeeModule } from '../src/modules/employee/employee.module';
import { PositionModule } from '../src/modules/position/position.module';
import { EmployeePositionModule } from '../src/modules/employee-position/employee-position.module';
import { UserModule } from '../src/modules/user/user.module';
import { RoleModule } from '../src/modules/role/role.module';
import { PermissionModule } from '../src/modules/permission/permission.module';
import { ModuleModule } from '../src/modules/module/module.module';
import { FeatureModule } from '../src/modules/feature/feature.module';
import { AuthModule } from '../src/auth/auth.module';
import { ContextModule } from '../src/common/context/context.module';
import { User } from '../src/modules/user/entities/user.entity';
import { Role } from '../src/modules/role/entities/role.entity';
import { Permission } from '../src/modules/permission/entities/permission.entity';
import { Company } from '../src/modules/company/entities/company.entity';
import { Employee } from '../src/modules/employee/entities/employee.entity';
import { EmployeePosition } from '../src/modules/employee-position/entities/employee-position.entity';
import { Position } from '../src/modules/position/entities/position.entity';
import { Module as AppModuleEntity } from '../src/modules/module/entities/module.entity';
import { Feature } from '../src/modules/feature/entities/feature.entity';
import { BaseEntity } from '../src/database/entities/base.entity';
import { BaseCompanyEntity } from '../src/database/entities/base-company.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      synchronize: true,
      logging: false,
      entities: [
        User,
        Role,
        Permission,
        Company,
        Employee,
        EmployeePosition,
        Position,
        AppModuleEntity,
        Feature,
        BaseEntity,
        BaseCompanyEntity,
      ],
    }),
    CompanyModule,
    EmployeeModule,
    PositionModule,
    EmployeePositionModule,
    UserModule,
    RoleModule,
    PermissionModule,
    ModuleModule,
    FeatureModule,
    AuthModule,
    ContextModule,
  ],
})
class TestAppModule {}

async function run() {
  const moduleRef = await Test.createTestingModule({ imports: [TestAppModule] }).compile();
  const app = moduleRef.createNestApplication();
  await app.init();

  const server = app.getHttpServer();

  const res = await request(server)
    .post('/user')
    .send({ name: 'Manual Test', email: 'manual+test@example.com', password: 'secret123' })
    .set('Content-Type', 'application/json');

  // Print status and body
  // eslint-disable-next-line no-console
  console.log('status', res.status);
  // eslint-disable-next-line no-console
  console.log('body', res.body);

  await app.close();
}

run().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});
