import { Controller, Get, Param } from '@nestjs/common';
import { GetCompanyService } from '../services/get-company.service';

@Controller('company')
export class GetCompanyController {
  constructor(private readonly getCompanyService: GetCompanyService) {}

  @Get()
  findAll() {
    return this.getCompanyService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id') id: number) {
    return this.getCompanyService.findOneById(id);
  }
}
