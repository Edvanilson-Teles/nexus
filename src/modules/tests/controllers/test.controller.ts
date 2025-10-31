import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';
import { TestService } from '../services/test.service';
import { CreateTestDto } from '../dto/create-test.dto';
import { UpdateTestDto } from '../dto/update-test.dto';

@ApiTags('tests')
@Controller('tests')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Post()
  @ApiOperation({ summary: 'Criar novo exame' })
  @ApiResponse({ status: 201, description: 'Exame criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 404, description: 'Empresa não encontrada' })
  @ApiResponse({ status: 409, description: 'Código já cadastrado' })
  create(@Body() createTestDto: CreateTestDto) {
    return this.testService.create(createTestDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os exames' })
  @ApiQuery({ name: 'search', required: false, description: 'Buscar por nome, código ou descrição' })
  @ApiQuery({ name: 'category', required: false, description: 'Filtrar por categoria' })
  @ApiQuery({ name: 'companyId', required: false, description: 'Filtrar por empresa' })
  @ApiQuery({ name: 'isActive', required: false, description: 'Filtrar por status ativo' })
  @ApiResponse({ status: 200, description: 'Lista de exames' })
  findAll(
    @Query('search') search?: string,
    @Query('category') category?: string,
    @Query('companyId') companyId?: number,
    @Query('isActive') isActive?: boolean,
  ) {
    return this.testService.findAll(search, category, companyId, isActive);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar exame por ID' })
  @ApiParam({ name: 'id', description: 'ID do exame' })
  @ApiResponse({ status: 200, description: 'Exame encontrado' })
  @ApiResponse({ status: 404, description: 'Exame não encontrado' })
  findOne(@Param('id') id: string) {
    return this.testService.findOne(+id);
  }

  @Get('code/:code')
  @ApiOperation({ summary: 'Buscar exame por código' })
  @ApiParam({ name: 'code', description: 'Código do exame' })
  @ApiResponse({ status: 200, description: 'Exame encontrado' })
  @ApiResponse({ status: 404, description: 'Exame não encontrado' })
  findByCode(@Param('code') code: string) {
    return this.testService.findByCode(code);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar exame' })
  @ApiParam({ name: 'id', description: 'ID do exame' })
  @ApiResponse({ status: 200, description: 'Exame atualizado com sucesso' })
  @ApiResponse({ status: 404, description: 'Exame não encontrado' })
  @ApiResponse({ status: 409, description: 'Código já cadastrado' })
  update(@Param('id') id: string, @Body() updateTestDto: UpdateTestDto) {
    return this.testService.update(+id, updateTestDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover exame (soft delete)' })
  @ApiParam({ name: 'id', description: 'ID do exame' })
  @ApiResponse({ status: 200, description: 'Exame removido com sucesso' })
  @ApiResponse({ status: 404, description: 'Exame não encontrado' })
  remove(@Param('id') id: string) {
    return this.testService.remove(+id);
  }

  @Patch(':id/deactivate')
  @ApiOperation({ summary: 'Desativar exame' })
  @ApiParam({ name: 'id', description: 'ID do exame' })
  @ApiResponse({ status: 200, description: 'Exame desativado com sucesso' })
  @ApiResponse({ status: 404, description: 'Exame não encontrado' })
  deactivate(@Param('id') id: string) {
    return this.testService.deactivate(+id);
  }
}
