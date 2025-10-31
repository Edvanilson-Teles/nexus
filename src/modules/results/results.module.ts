import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Result } from './entities/result.entity';
import { ResultService } from './services/result.service';
import { ResultController } from './controllers/result.controller';
import { Sample } from '../samples/entities/sample.entity';
import { Test } from '../tests/entities/test.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Result, Sample, Test])],
  controllers: [ResultController],
  providers: [ResultService],
  exports: [ResultService],
})
export class ResultsModule {}
