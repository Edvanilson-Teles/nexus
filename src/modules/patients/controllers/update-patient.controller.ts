import { Body, Controller, Param, Patch } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdatePatientDto } from '../dto/update-patient.dto';
import { PatientResponseDto } from '../dto/patient-response.dto';
import { UpdatePatientService } from '../services/update-patient.service';

@ApiTags('patients')
@Controller('patients')
export class UpdatePatientController {
  constructor(
    private readonly updatePatientService: UpdatePatientService,
  ) {}

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar paciente' })
  @ApiParam({ name: 'id', description: 'ID do paciente' })
  @ApiResponse({
    status: 200,
    description: 'Paciente atualizado com sucesso',
    type: PatientResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 404, description: 'Paciente não encontrado' })
  @ApiResponse({ status: 409, description: 'CPF ou email já cadastrado' })
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.updatePatientService.update(+id, updatePatientDto);
  }
}
