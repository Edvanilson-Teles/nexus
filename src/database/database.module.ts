import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const dbConfig = configService.get('database');
        return {
          type: dbConfig.type,
          host: dbConfig.host,
          port: dbConfig.port,
          username: dbConfig.username,
          password: dbConfig.password,
          database: dbConfig.database,
          ssl: dbConfig.ssl
            ? { rejectUnauthorized: dbConfig.rejectUnauthorized }
            : false,
          entities: [__dirname + '/../**/*.entity{.ts,.js}'],
          synchronize: true, // set to false in production
          autoLoadEntities: true,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
