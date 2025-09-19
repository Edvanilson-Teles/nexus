import { Controller, Delete, Param } from '@nestjs/common';
import { DeleteEmployeeService } from '../services/delete-employee.service';

@Controller('employee')
export class DeleteEmployeeController {
  constructor(private readonly deleteEmployeeService: DeleteEmployeeService) {}

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.deleteEmployeeService.remove(id);
  }
}
