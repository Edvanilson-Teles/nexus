import { CreatePositionDto } from '../dto/create-position.dto';
import { PositionResponseDto } from '../dto/position-response.dto';
import { UpdatePositionDto } from '../dto/update-position.dto';
import { Position } from '../entities/position.entity';
import { IPositionBase } from '../interfaces/position.interface';

export class PositionMapper {
  static toInterface(
    dto: CreatePositionDto | UpdatePositionDto,
  ): Partial<IPositionBase> {
    return {
      name: dto.name,
      description: dto.description,
      level: dto.level,
      requirements: dto.requirements,
    };
  }

  static toEntity(data: Partial<IPositionBase>): Partial<IPositionBase> {
    return {
      ...data,
    };
  }
  static toResponse(entity: Position): Partial<PositionResponseDto> {
    return {
      id: entity.id,
      name: entity.name,
      description: entity.description,
      level: entity.level,
      requirements: entity.requirements,
    };
  }

  static toResponseList(entity: Position[]): any[] {
    return entity.map((position) => PositionMapper.toResponse(position));
  }
}
