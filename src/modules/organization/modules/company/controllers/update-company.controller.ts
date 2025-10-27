import { Body, Controller, Param, Patch } from '@nestjs/common';
import { UpdateCompanyDto } from '../dto/update-company.dto';
import { UpdateCompanyService } from '../services/update-company.service';

@Controller('company')
export class UpdateCompanyController {
  constructor(private readonly updateCompanyService: UpdateCompanyService) {}

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.updateCompanyService.update(id, updateCompanyDto);
  }
}
