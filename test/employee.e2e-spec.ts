import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
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

import { Module } from '@nestjs/common';

@Module({
  imports: [
  ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      synchronize: true,
      logging: false,
  entities: [User, Role, Permission, Company, Employee, EmployeePosition, Position, AppModuleEntity, Feature, BaseEntity, BaseCompanyEntity],
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
import { DataSource } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { getConnectionToken } from '@nestjs/typeorm';

describe('Employee (e2e)', () => {
  let app: INestApplication;
  let jwtService: JwtService;
  let dataSource: DataSource;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TestAppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    jwtService = moduleFixture.get(JwtService);
    dataSource = moduleFixture.get(getConnectionToken());
  });

  afterAll(async () => {
    if (dataSource && dataSource.isInitialized) await dataSource.destroy();
    await app.close();
  });

  it('allows user with permission to list employees and denies without', async () => {
    // setup: create company, permission, role, users and employee
    const companyRepo = dataSource.getRepository('Company');
    const userRepo = dataSource.getRepository('User');
    const roleRepo = dataSource.getRepository('Role');
    const permRepo = dataSource.getRepository('Permission');
    const employeeRepo = dataSource.getRepository('Employee');

  const company = await companyRepo.save({ name: 'C1', cnpj: '1' });
  const perm = await permRepo.save({ action: 'employee.view' });
  const role = await roleRepo.save({ name: 'viewer', permissions: [perm] });

  const moduleRepo = dataSource.getRepository(AppModuleEntity);
  const employeeModule = await moduleRepo.save({ name: 'EmployeeModule' });

  const userWith = await userRepo.save({ name: 'With', email: 'with@example.com', password: 'x', roles: [role], companies: [company], modules: [employeeModule] });
  const userWithout = await userRepo.save({ name: 'Without', email: 'without@example.com', password: 'x', roles: [], companies: [company] });

    await employeeRepo.save({ name: 'Emp1', email: 'e1@example.com', cpf: '1', hireDate: new Date(), companyId: company.id });

    const tokenWith = jwtService.sign({ sub: userWith.id, email: userWith.email });
    const tokenWithout = jwtService.sign({ sub: userWithout.id, email: userWithout.email });

    await request(app.getHttpServer()).get('/employee').set('Authorization', `Bearer ${tokenWith}`).expect(200);
    await request(app.getHttpServer()).get('/employee').set('Authorization', `Bearer ${tokenWithout}`).expect(403);
  });
});
