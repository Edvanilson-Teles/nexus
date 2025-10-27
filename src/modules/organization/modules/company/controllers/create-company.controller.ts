import { Body, Controller, Post } from '@nestjs/common';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { CreateCompanyService } from '../services/create-company.service';

@Controller('company')
export class CreateCompanyController {
  constructor(private readonly createCompanyService: CreateCompanyService) {}

  @Post()
  async create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.createCompanyService.create(createCompanyDto);
  }
}
