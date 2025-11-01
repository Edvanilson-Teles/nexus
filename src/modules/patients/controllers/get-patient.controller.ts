import { Controller, Get, Param, Query } from '@nestjs/common';
import {
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
  ApiParam,
} from '@nestjs/swagger';
import { PatientResponseDto } from '../dto/patient-response.dto';
import { GetPatientService } from '../services/get-patient.service';

@ApiTags('patients')
@Controller('patients')
export class GetPatientController {
  constructor(private readonly getPatientService: GetPatientService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos os pacientes' })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Buscar por nome, CPF ou email',
  })
  @ApiQuery({
    name: 'companyId',
    required: false,
    description: 'Filtrar por empresa',
  })
  @ApiQuery({
    name: 'isActive',
    required: false,
    description: 'Filtrar por status ativo/inativo',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de pacientes',
    type: [PatientResponseDto],
  })
  findAll(
    @Query('search') search?: string,
    @Query('companyId') companyId?: number,
    @Query('isActive') isActive?: boolean,
  ) {
    return this.getPatientService.findAll(search, companyId, isActive);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar paciente por ID' })
  @ApiParam({ name: 'id', description: 'ID do paciente' })
  @ApiResponse({
    status: 200,
    description: 'Paciente encontrado',
    type: PatientResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Paciente não encontrado' })
  findOne(@Param('id') id: string) {
    return this.getPatientService.findOne(+id);
  }

  @Get('cpf/:cpf')
  @ApiOperation({ summary: 'Buscar paciente por CPF' })
  @ApiParam({ name: 'cpf', description: 'CPF do paciente' })
  @ApiResponse({
    status: 200,
    description: 'Paciente encontrado',
    type: PatientResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Paciente não encontrado' })
  findByCpf(@Param('cpf') cpf: string) {
    return this.getPatientService.findByCpf(cpf);
  }
}
