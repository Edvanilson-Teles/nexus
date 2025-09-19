import { Body, Controller, Param, Patch } from '@nestjs/common';
import { UpdateEmployeeDto } from '../dto/update-employee.dto';
import { UpdateEmployeeService } from '../services/update-employee.service';

@Controller('employee')
export class UpdateEmployeeController {
  constructor(private readonly updateEmployeeService: UpdateEmployeeService) {}

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.updateEmployeeService.update(id, updateEmployeeDto);
  }
}
