import { Body, Controller, Post } from '@nestjs/common';
import { CreateEmployeePositionService } from '../services/create-employee-position.service';
import { CreateEmployeePositionDto } from '../dto/create-employee-position.dto';


@Controller('employee-position')
export class CreateEmployeePositionController {
  constructor(
    private readonly createEmployeePositionService: CreateEmployeePositionService,
  ) {}

  @Post()
  create(@Body() createEmployeePositionDto: CreateEmployeePositionDto) {
    return this.createEmployeePositionService.create(createEmployeePositionDto);
  }
}
