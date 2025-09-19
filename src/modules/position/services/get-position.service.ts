import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Position } from '../entities/position.entity';
import { PositionMapper } from '../mappers/position.mapper';

@Injectable()
export class GetPositionService {
  constructor(
    @InjectRepository(Position)
    private readonly getPositionRepository: Repository<Position>,
  ) {}

  async findAll() {
    const positions = await this.getPositionRepository.find();
    return PositionMapper.toResponseList(positions);
  }

  async findOneBy(id: number) {
    const position = await this.getPositionRepository.findOneBy({ id });

    if (!position) {
      throw new Error(`Position with ID ${id} not found`);
    }

    return PositionMapper.toResponse(position);
  }
}
