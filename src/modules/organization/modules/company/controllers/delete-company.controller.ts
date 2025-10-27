import { Controller, Delete, Param } from '@nestjs/common';
import { DeleteCompanyService } from '../services/delete-company.service';

@Controller('company')
export class DeleteCompanyController {
  constructor(private readonly deleteCompanyService: DeleteCompanyService) {}

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.deleteCompanyService.remove(id);
  }
}
