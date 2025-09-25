import { Body, Controller, Param, Patch } from '@nestjs/common';
import { UpdateUserDto, UpdateUserPasswordDto } from '../dto/update-user.dto';
import { UpdateUserService } from '../services/update-user.service';

@Controller('user')
export class UpdateUserController {
  constructor(private readonly updateUserService: UpdateUserService) {}

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.updateUserService.update(id, updateUserDto);
  }

  @Patch(':id/password')
  updatePassword(
    @Param('id') id: number,
    @Body() updateUserPasswordDto: UpdateUserPasswordDto,
  ) {
    return this.updateUserService.updatePassword(id, updateUserPasswordDto);
  }
}
