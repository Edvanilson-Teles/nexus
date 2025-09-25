import { Controller, Delete, Param } from '@nestjs/common';
import { DeleteUserService } from '../services/delete-user.service';

@Controller('user')
export class DeleteUserController {
  constructor(private readonly deleteUserService: DeleteUserService) {}

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.deleteUserService.remove(id);
  }
}
