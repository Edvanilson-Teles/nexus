import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { InvoiceService } from '../services/invoice.service';
import { CreateInvoiceDto } from '../dto/create-invoice.dto';
import { Invoice } from '../entities/invoice.entity';

@ApiTags('invoices')
@Controller('invoices')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Post()
  @ApiOperation({ summary: 'Criar nova fatura' })
  @ApiResponse({ status: 201, description: 'Fatura criada com sucesso' })
  create(@Body() createInvoiceDto: CreateInvoiceDto): Promise<Invoice> {
    return this.invoiceService.create(createInvoiceDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as faturas' })
  @ApiQuery({ name: 'status', required: false })
  @ApiQuery({ name: 'patientId', required: false })
  @ApiQuery({ name: 'companyId', required: false })
  @ApiResponse({ status: 200, description: 'Lista de faturas' })
  findAll(
    @Query('status') status?: string,
    @Query('patientId') patientId?: number,
    @Query('companyId') companyId?: number,
  ): Promise<Invoice[]> {
    return this.invoiceService.findAll(status, patientId, companyId);
  }

  @Get('number/:number')
  @ApiOperation({ summary: 'Buscar fatura por número' })
  @ApiResponse({ status: 200, description: 'Fatura encontrada' })
  findByNumber(@Param('number') invoiceNumber: string): Promise<Invoice> {
    return this.invoiceService.findByNumber(invoiceNumber);
  }

  @Get('patient/:patientId')
  @ApiOperation({ summary: 'Buscar faturas por paciente' })
  @ApiResponse({ status: 200, description: 'Lista de faturas do paciente' })
  findByPatient(
    @Param('patientId', ParseIntPipe) patientId: number,
  ): Promise<Invoice[]> {
    return this.invoiceService.findByPatient(patientId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar fatura por ID' })
  @ApiResponse({ status: 200, description: 'Fatura encontrada' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Invoice> {
    return this.invoiceService.findOne(id);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Atualizar status da fatura' })
  @ApiResponse({ status: 200, description: 'Status atualizado' })
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status') status: string,
  ): Promise<Invoice> {
    return this.invoiceService.updateStatus(id, status);
  }

  @Patch(':id/cancel')
  @ApiOperation({ summary: 'Cancelar fatura' })
  @ApiResponse({ status: 200, description: 'Fatura cancelada' })
  cancel(
    @Param('id', ParseIntPipe) id: number,
    @Body('userId') userId: number,
    @Body('reason') reason: string,
  ): Promise<Invoice> {
    return this.invoiceService.cancel(id, userId, reason);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar fatura (apenas rascunhos)' })
  @ApiResponse({ status: 200, description: 'Fatura deletada' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.invoiceService.remove(id);
  }
}
