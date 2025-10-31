import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3000);

  // Enable CORS for frontend access
  app.enableCors({
    origin: ['http://localhost:3001', 'http://localhost:3000'],
    credentials: true,
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Swagger/OpenAPI Documentation
  const config = new DocumentBuilder()
    .setTitle('Nexus - Clinical Laboratory API')
    .setDescription('API completa para gestão de laboratórios de análises clínicas')
    .setVersion('1.0')
    .addTag('users', 'Gestão de usuários')
    .addTag('roles', 'Gestão de perfis e permissões')
    .addTag('companies', 'Gestão de empresas/laboratórios')
    .addTag('positions', 'Gestão de cargos')
    .addTag('permissions', 'Gestão de permissões')
    .addTag('modules', 'Gestão de módulos')
    .addTag('features', 'Gestão de features')
    .addTag('patients', 'Gestão de pacientes')
    .addTag('tests', 'Catálogo de exames')
    .addTag('test-panels', 'Painéis de exames')
    .addTag('orders', 'Ordens de coleta')
    .addTag('samples', 'Amostras e rastreamento')
    .addBearerAuth()
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
  
  console.log(`\n🚀 Application is running on: http://localhost:${port}`);
  console.log(`📚 Swagger documentation: http://localhost:${port}/api`);
  console.log(`\n📋 Available endpoints:`);
  console.log(`   - GET  /user`);
  console.log(`   - POST /user`);
  console.log(`   - GET  /role`);
  console.log(`   - GET  /company`);
  console.log(`   - GET  /position`);
  console.log(`\n💡 Tip: Access http://localhost:${port}/api to test the API\n`);
}
bootstrap();
