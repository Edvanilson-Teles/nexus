import { Controller, Delete, Param } from '@nestjs/common';
import { DeletePositionService } from '../services/delete-position.service';

@Controller('position')
export class DeletePositionController {
  constructor(private readonly deletePositionService: DeletePositionService) {}

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.deletePositionService.remove(id);
  }
}
