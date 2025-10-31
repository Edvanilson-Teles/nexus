import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from './entities/invoice.entity';
import { InvoiceItem } from './entities/invoice-item.entity';
import { Payment } from './entities/payment.entity';
import { InvoiceService } from './services/invoice.service';
import { PaymentService } from './services/payment.service';
import { InvoiceController } from './controllers/invoice.controller';
import { PaymentController } from './controllers/payment.controller';
import { Patient } from '../patients/entities/patient.entity';
import { Company } from '../organization/modules/company/entities/company.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Invoice,
      InvoiceItem,
      Payment,
      Patient,
      Company,
    ]),
  ],
  controllers: [InvoiceController, PaymentController],
  providers: [InvoiceService, PaymentService],
  exports: [InvoiceService, PaymentService],
})
export class FinancialModule {}
