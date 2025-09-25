import { Controller, Get, Param } from '@nestjs/common';
import { GetUserService } from '../services/get-user.service';

@Controller('user')
export class GetUserController {
  constructor(private readonly getUserService: GetUserService) {}

  @Get()
  findAll() {
    return this.getUserService.findAll();
  }

  @Get(':id')
  findOneBy(@Param('id') id: number) {
    return this.getUserService.findOneBy(+id);
  }
}
