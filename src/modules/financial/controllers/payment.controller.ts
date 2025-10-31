import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { PaymentService } from '../services/payment.service';
import { CreatePaymentDto } from '../dto/create-payment.dto';
import { Payment } from '../entities/payment.entity';

@ApiTags('payments')
@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @ApiOperation({ summary: 'Criar novo pagamento' })
  @ApiResponse({ status: 201, description: 'Pagamento criado com sucesso' })
  create(@Body() createPaymentDto: CreatePaymentDto): Promise<Payment> {
    return this.paymentService.create(createPaymentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os pagamentos' })
  @ApiQuery({ name: 'invoiceId', required: false })
  @ApiQuery({ name: 'status', required: false })
  @ApiQuery({ name: 'method', required: false })
  @ApiResponse({ status: 200, description: 'Lista de pagamentos' })
  findAll(
    @Query('invoiceId') invoiceId?: number,
    @Query('status') status?: string,
    @Query('method') method?: string,
  ): Promise<Payment[]> {
    return this.paymentService.findAll(invoiceId, status, method);
  }

  @Get('number/:number')
  @ApiOperation({ summary: 'Buscar pagamento por número' })
  @ApiResponse({ status: 200, description: 'Pagamento encontrado' })
  findByPaymentNumber(
    @Param('number') paymentNumber: string,
  ): Promise<Payment> {
    return this.paymentService.findByPaymentNumber(paymentNumber);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar pagamento por ID' })
  @ApiResponse({ status: 200, description: 'Pagamento encontrado' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Payment> {
    return this.paymentService.findOne(id);
  }

  @Post(':id/refund')
  @ApiOperation({ summary: 'Reembolsar pagamento' })
  @ApiResponse({ status: 200, description: 'Pagamento reembolsado' })
  refund(
    @Param('id', ParseIntPipe) id: number,
    @Body('userId') userId: number,
    @Body('amount') amount: number,
    @Body('reason') reason: string,
  ): Promise<Payment> {
    return this.paymentService.refund(id, userId, amount, reason);
  }
}
