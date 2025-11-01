import { Controller, Delete, Param, Patch } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DeletePatientService } from '../services/delete-patient.service';

@ApiTags('patients')
@Controller('patients')
export class DeletePatientController {
  constructor(
    private readonly deletePatientService: DeletePatientService,
  ) {}

  @Delete(':id')
  @ApiOperation({ summary: 'Remover paciente (soft delete)' })
  @ApiParam({ name: 'id', description: 'ID do paciente' })
  @ApiResponse({ status: 200, description: 'Paciente removido com sucesso' })
  @ApiResponse({ status: 404, description: 'Paciente não encontrado' })
  softDelete(@Param('id') id: string) {
    return this.deletePatientService.softDelete(+id);
  }

  @Patch(':id/deactivate')
  @ApiOperation({ summary: 'Desativar paciente' })
  @ApiParam({ name: 'id', description: 'ID do paciente' })
  @ApiResponse({ status: 200, description: 'Paciente desativado com sucesso' })
  @ApiResponse({ status: 404, description: 'Paciente não encontrado' })
  deactivate(@Param('id') id: string) {
    return this.deletePatientService.deactivate(+id);
  }
}
