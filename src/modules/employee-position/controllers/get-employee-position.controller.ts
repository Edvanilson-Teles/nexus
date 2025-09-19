import { Controller, Get, Param } from '@nestjs/common';
import { GetEmployeePositionService } from '../services/get-employee-position.service';

@Controller('employee-position')
export class GetEmployeePositionController {
  constructor(
    private readonly getEmployeePositionService: GetEmployeePositionService,
  ) {}

  @Get()
  findAll() {
    return this.getEmployeePositionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.getEmployeePositionService.findOne(id);
  }
}
