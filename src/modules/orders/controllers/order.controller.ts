import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';
import { OrderService } from '../services/order.service';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { OrderStatus } from '../entities/order.entity';

@ApiTags('orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiOperation({ summary: 'Criar nova ordem de coleta' })
  @ApiResponse({ status: 201, description: 'Ordem criada com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 404, description: 'Paciente, empresa ou testes não encontrados' })
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as ordens' })
  @ApiQuery({ name: 'status', required: false, enum: OrderStatus, description: 'Filtrar por status' })
  @ApiQuery({ name: 'patientId', required: false, description: 'Filtrar por paciente' })
  @ApiQuery({ name: 'companyId', required: false, description: 'Filtrar por empresa' })
  @ApiResponse({ status: 200, description: 'Lista de ordens' })
  findAll(
    @Query('status') status?: OrderStatus,
    @Query('patientId') patientId?: number,
    @Query('companyId') companyId?: number,
  ) {
    return this.orderService.findAll(status, patientId, companyId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar ordem por ID' })
  @ApiParam({ name: 'id', description: 'ID da ordem' })
  @ApiResponse({ status: 200, description: 'Ordem encontrada' })
  @ApiResponse({ status: 404, description: 'Ordem não encontrada' })
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar ordem' })
  @ApiParam({ name: 'id', description: 'ID da ordem' })
  @ApiResponse({ status: 200, description: 'Ordem atualizada com sucesso' })
  @ApiResponse({ status: 404, description: 'Ordem não encontrada' })
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Cancelar ordem' })
  @ApiParam({ name: 'id', description: 'ID da ordem' })
  @ApiResponse({ status: 200, description: 'Ordem cancelada com sucesso' })
  @ApiResponse({ status: 400, description: 'Não é possível cancelar ordem concluída' })
  @ApiResponse({ status: 404, description: 'Ordem não encontrada' })
  cancel(@Param('id') id: string) {
    return this.orderService.cancel(+id);
  }
}
