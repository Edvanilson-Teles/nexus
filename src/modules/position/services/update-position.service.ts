import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdatePositionDto } from '../dto/update-position.dto';
import { Position } from '../entities/position.entity';
import { PositionMapper } from '../mappers/position.mapper';

@Injectable()
export class UpdatePositionService {
  constructor(
    @InjectRepository(Position)
    private readonly updatePositionRepository: Repository<Position>,
  ) {}

  async update(id: number, updatePositionDto: UpdatePositionDto) {
    const position = await this.updatePositionRepository.findOneBy({ id });

    if (!position) {
      throw new Error(`Position with ID ${id} not found`);
    }

    const positionData = await PositionMapper.toInterface(updatePositionDto);
    await this.updatePositionRepository.update(id, positionData);
    return PositionMapper.toResponse({ ...position, ...positionData });
  }
}
