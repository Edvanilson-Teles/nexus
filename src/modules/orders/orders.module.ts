import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { OrderController } from './controllers/order.controller';
import { OrderService } from './services/order.service';
import { Patient } from '../patients/entities/patient.entity';
import { Company } from '../organization/modules/company/entities/company.entity';
import { Test } from '../tests/entities/test.entity';
import { TestPanel } from '../tests/entities/test-panel.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Order,
      OrderItem,
      Patient,
      Company,
      Test,
      TestPanel,
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrdersModule {}
