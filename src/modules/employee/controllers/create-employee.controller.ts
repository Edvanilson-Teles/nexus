import { Body, Controller, Post } from '@nestjs/common';
import { CreateEmployeeDto } from '../dto/create-employee.dto';
import { CreateEmployeeService } from '../services/create-employee.service';

@Controller('employee')
export class CreateEmployeeController {
  constructor(private readonly createEmployeeService: CreateEmployeeService) {}

  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.createEmployeeService.create(createEmployeeDto);
  }
}
