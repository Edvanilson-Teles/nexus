import { Body, Controller, Post } from '@nestjs/common';
import { CreatePositionDto } from '../dto/create-position.dto';
import { CreatePositionService } from '../services/create-position.service';

@Controller('position')
export class CreatePositionController {
  constructor(private readonly createPositionService: CreatePositionService) {}

  @Post()
  create(@Body() createPositionDto: CreatePositionDto) {
    return this.createPositionService.create(createPositionDto);
  }
}
