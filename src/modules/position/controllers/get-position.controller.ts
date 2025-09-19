import { Controller, Get, Param } from '@nestjs/common';
import { GetPositionService } from '../services/get-position.service';

@Controller('position')
export class GetPositionController {
  constructor(private readonly getPositionService: GetPositionService) {}

  @Get()
  findAll() {
    return this.getPositionService.findAll();
  }

  @Get(':id')
  findOneBy(@Param('id') id: number) {
    return this.getPositionService.findOneBy(id);
  }
}
