import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePositionDto } from '../dto/create-position.dto';
import { Position } from '../entities/position.entity';
import { PositionMapper } from '../mappers/position.mapper';
import { handleDbError } from 'src/common/db-error-handler';

@Injectable()
export class CreatePositionService {
  constructor(
    @InjectRepository(Position)
    private readonly createPositionRepository: Repository<Position>,
  ) {}
  async create(createPositionDto: CreatePositionDto) {
    const positionData = PositionMapper.toInterface(createPositionDto);
    const positionEntity = this.createPositionRepository.create(
      PositionMapper.toEntity(positionData),
    );

    const savedPosition = await handleDbError(() =>
      this.createPositionRepository.save(positionEntity),
    );
    return PositionMapper.toResponse(savedPosition);
  }
}
