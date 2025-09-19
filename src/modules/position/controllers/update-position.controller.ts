import { Body, Controller, Param, Patch } from '@nestjs/common';
import { UpdatePositionDto } from '../dto/update-position.dto';
import { UpdatePositionService } from '../services/update-position.service';


@Controller('position')
export class UpdatePositionController {
  constructor(private readonly updatePositionService: UpdatePositionService) {}

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updatePositionDto: UpdatePositionDto,
  ) {
    return this.updatePositionService.update(+id, updatePositionDto);
  }
}
