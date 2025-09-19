import { Body, Controller, Param, Patch } from '@nestjs/common';
import { UpdateEmployeePositionDto } from '../dto/update-employee-position.dto';
import { UpdateEmployeePositionService } from '../services/update-employee-position.service';

@Controller('employee-position')
export class UpdateEmployeePositionController {
  constructor(
    private readonly updateEmployeePositionService: UpdateEmployeePositionService,
  ) {}

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateEmployeePositionDto: UpdateEmployeePositionDto,
  ) {
    return this.updateEmployeePositionService.update(
      id,
      updateEmployeePositionDto,
    );
  }
}
