import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { ContextInterceptor } from './common/context/context.interceptor';
import { ContextModule } from './common/context/context.module';
import { PermissionGuard } from './common/guards/permission.guard';
import configuration from './config/configuration';
import { DatabaseModule } from './database/database.module';
import { FeatureModule } from './modules/feature/feature.module';
import { ModuleModule } from './modules/module/module.module';
import { OrganizationModule } from './modules/organization/organization.module';
import { PatientsModule } from './modules/patients/patients.module';
import { PermissionModule } from './modules/permission/permission.module';
import { RoleModule } from './modules/role/role.module';
import { TestsModule } from './modules/tests/tests.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    DatabaseModule,
    UserModule,
    RoleModule,
    PermissionModule,
    ModuleModule,
    FeatureModule,
    AuthModule,
    ContextModule,
    OrganizationModule,
    PatientsModule,
    TestsModule,
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
export class AppModule { }
