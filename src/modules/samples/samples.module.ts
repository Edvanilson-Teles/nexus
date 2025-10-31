import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sample } from './entities/sample.entity';
import { SampleController } from './controllers/sample.controller';
import { SampleService } from './services/sample.service';
import { OrderItem } from '../orders/entities/order-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sample, OrderItem])],
  controllers: [SampleController],
  providers: [SampleService],
  exports: [SampleService],
})
export class SamplesModule {}
