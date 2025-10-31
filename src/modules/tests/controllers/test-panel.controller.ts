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
import { TestPanelService } from '../services/test-panel.service';
import { CreateTestPanelDto } from '../dto/create-test-panel.dto';
import { UpdateTestPanelDto } from '../dto/update-test-panel.dto';

@ApiTags('test-panels')
@Controller('test-panels')
export class TestPanelController {
  constructor(private readonly panelService: TestPanelService) {}

  @Post()
  @ApiOperation({ summary: 'Criar novo painel de exames' })
  @ApiResponse({ status: 201, description: 'Painel criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 404, description: 'Empresa ou exames não encontrados' })
  @ApiResponse({ status: 409, description: 'Código já cadastrado' })
  create(@Body() createPanelDto: CreateTestPanelDto) {
    return this.panelService.create(createPanelDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os painéis de exames' })
  @ApiQuery({ name: 'search', required: false, description: 'Buscar por nome, código ou descrição' })
  @ApiQuery({ name: 'companyId', required: false, description: 'Filtrar por empresa' })
  @ApiQuery({ name: 'isActive', required: false, description: 'Filtrar por status ativo' })
  @ApiResponse({ status: 200, description: 'Lista de painéis' })
  findAll(
    @Query('search') search?: string,
    @Query('companyId') companyId?: number,
    @Query('isActive') isActive?: boolean,
  ) {
    return this.panelService.findAll(search, companyId, isActive);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar painel por ID' })
  @ApiParam({ name: 'id', description: 'ID do painel' })
  @ApiResponse({ status: 200, description: 'Painel encontrado' })
  @ApiResponse({ status: 404, description: 'Painel não encontrado' })
  findOne(@Param('id') id: string) {
    return this.panelService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar painel' })
  @ApiParam({ name: 'id', description: 'ID do painel' })
  @ApiResponse({ status: 200, description: 'Painel atualizado com sucesso' })
  @ApiResponse({ status: 404, description: 'Painel não encontrado' })
  @ApiResponse({ status: 409, description: 'Código já cadastrado' })
  update(@Param('id') id: string, @Body() updatePanelDto: UpdateTestPanelDto) {
    return this.panelService.update(+id, updatePanelDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover painel (soft delete)' })
  @ApiParam({ name: 'id', description: 'ID do painel' })
  @ApiResponse({ status: 200, description: 'Painel removido com sucesso' })
  @ApiResponse({ status: 404, description: 'Painel não encontrado' })
  remove(@Param('id') id: string) {
    return this.panelService.remove(+id);
  }
}
