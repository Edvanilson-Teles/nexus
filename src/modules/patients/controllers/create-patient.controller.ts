import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePatientDto } from '../dto/create-patient.dto';
import { PatientResponseDto } from '../dto/patient-response.dto';
import { CreatePatientService } from '../services/create-patient.service';

@ApiTags('patients')
@Controller('patients')
export class CreatePatientController {
  constructor(
    private readonly createPatientService: CreatePatientService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Criar novo paciente' })
  @ApiResponse({
    status: 201,
    description: 'Paciente criado com sucesso',
    type: PatientResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 404, description: 'Empresa não encontrada' })
  @ApiResponse({ status: 409, description: 'CPF ou email já cadastrado' })
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.createPatientService.create(createPatientDto);
  }
}
