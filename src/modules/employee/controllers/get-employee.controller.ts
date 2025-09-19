import { Controller, Get, Param } from '@nestjs/common';
import { GetEmployeeService } from '../services/get-employee.service';

@Controller('employee')
export class GetEmployeeController {
  constructor(private readonly getEmployeeService: GetEmployeeService) {}

  @Get()
  findAll() {
    return this.getEmployeeService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id') id: number) {
    return this.getEmployeeService.findOneById(id);
  }
}
