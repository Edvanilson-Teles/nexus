import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ContextInterceptor } from './common/context/context.interceptor';
import { ContextService } from './common/context/context.service';
import { ContextModule } from './common/context/context.module';
import { PermissionGuard } from './common/guards/permission.guard';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { CompanyModule } from './modules/company/company.module';
import { EmployeeModule } from './modules/employee/employee.module';
import { PositionModule } from './modules/position/position.module';
import { EmployeePositionModule } from './modules/employee-position/employee-position.module';
import { UserModule } from './modules/user/user.module';
import { RoleModule } from './modules/role/role.module';
import { PermissionModule } from './modules/permission/permission.module';
import { ModuleModule } from './modules/module/module.module';
import { FeatureModule } from './modules/feature/feature.module';

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
    UserModule,
    RoleModule,
    PermissionModule,
    ModuleModule,
    FeatureModule,
    AuthModule,
    ContextModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ContextInterceptor,
    },
    PermissionGuard,
  ],
})
export class AppModule {}
