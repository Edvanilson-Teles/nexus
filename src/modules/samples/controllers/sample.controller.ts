import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';
import { SampleService } from '../services/sample.service';
import { CreateSampleDto } from '../dto/create-sample.dto';
import { UpdateSampleDto } from '../dto/update-sample.dto';
import { SampleStatus } from '../entities/sample.entity';

@ApiTags('samples')
@Controller('samples')
export class SampleController {
  constructor(private readonly sampleService: SampleService) {}

  @Post()
  @ApiOperation({ summary: 'Coletar/registrar nova amostra' })
  @ApiResponse({ status: 201, description: 'Amostra registrada com sucesso' })
  @ApiResponse({ status: 404, description: 'Item da ordem não encontrado' })
  create(@Body() createSampleDto: CreateSampleDto) {
    return this.sampleService.create(createSampleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as amostras' })
  @ApiQuery({ name: 'status', required: false, enum: SampleStatus, description: 'Filtrar por status' })
  @ApiQuery({ name: 'orderItemId', required: false, description: 'Filtrar por item da ordem' })
  @ApiQuery({ name: 'barcode', required: false, description: 'Buscar por código de barras' })
  @ApiResponse({ status: 200, description: 'Lista de amostras' })
  findAll(
    @Query('status') status?: SampleStatus,
    @Query('orderItemId') orderItemId?: number,
    @Query('barcode') barcode?: string,
  ) {
    return this.sampleService.findAll(status, orderItemId, barcode);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar amostra por ID' })
  @ApiParam({ name: 'id', description: 'ID da amostra' })
  @ApiResponse({ status: 200, description: 'Amostra encontrada' })
  @ApiResponse({ status: 404, description: 'Amostra não encontrada' })
  findOne(@Param('id') id: string) {
    return this.sampleService.findOne(+id);
  }

  @Get('barcode/:barcode')
  @ApiOperation({ summary: 'Buscar amostra por código de barras' })
  @ApiParam({ name: 'barcode', description: 'Código de barras da amostra' })
  @ApiResponse({ status: 200, description: 'Amostra encontrada' })
  @ApiResponse({ status: 404, description: 'Amostra não encontrada' })
  findByBarcode(@Param('barcode') barcode: string) {
    return this.sampleService.findByBarcode(barcode);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar amostra' })
  @ApiParam({ name: 'id', description: 'ID da amostra' })
  @ApiResponse({ status: 200, description: 'Amostra atualizada com sucesso' })
  @ApiResponse({ status: 404, description: 'Amostra não encontrada' })
  update(@Param('id') id: string, @Body() updateSampleDto: UpdateSampleDto) {
    return this.sampleService.update(+id, updateSampleDto);
  }

  @Patch(':id/reject')
  @ApiOperation({ summary: 'Rejeitar amostra' })
  @ApiParam({ name: 'id', description: 'ID da amostra' })
  @ApiResponse({ status: 200, description: 'Amostra rejeitada com sucesso' })
  @ApiResponse({ status: 404, description: 'Amostra não encontrada' })
  reject(
    @Param('id') id: string,
    @Body('reason') reason: string,
  ) {
    return this.sampleService.reject(+id, reason);
  }
}
