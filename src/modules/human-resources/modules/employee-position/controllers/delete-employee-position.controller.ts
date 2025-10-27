import { Controller, Delete, Param } from '@nestjs/common';
import { DeleteEmployeePositionService } from '../services/delete-employee-position.service';

@Controller('employee-position')
export class DeleteEmployeePositionController {
  constructor(
    private readonly deleteEmployeePositionService: DeleteEmployeePositionService,
  ) {}

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.deleteEmployeePositionService.remove(id);
  }
}
