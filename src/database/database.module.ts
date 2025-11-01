import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const dbConfig = configService.get('database');
        const base = {
          type: dbConfig.type as any,
          ssl: dbConfig.ssl || false,
          entities: [__dirname + '/../**/*.entity{.ts,.js}'],
          synchronize: dbConfig.synchronize ?? true,
          logging: dbConfig.logging ?? false,
          extra: dbConfig.extra,
          autoLoadEntities: true,
        } as any;

        if (dbConfig.url) {
          // Prefer URL-based configuration (e.g., Neon connection string)
          return {
            ...base,
            url: dbConfig.url,
          };
        }

        // Fallback to discrete connection parameters
        return {
          ...base,
          host: dbConfig.host,
          port: dbConfig.port,
          username: dbConfig.username,
          password: dbConfig.password,
          database: dbConfig.database,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
