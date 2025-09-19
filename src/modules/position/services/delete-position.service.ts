import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Position } from '../entities/position.entity';

@Injectable()
export class DeletePositionService {
  constructor(
    @InjectRepository(Position)
    private readonly deletePositionRepository: Repository<Position>,
  ) {}

  async remove(id: number): Promise<void> {
    await this.deletePositionRepository.delete(id);
  }
}
