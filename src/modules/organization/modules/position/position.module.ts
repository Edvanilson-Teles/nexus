import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PositionControllers } from './controllers';
import { Position } from './entities/position.entity';
import { PositionServices } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([Position])],
  controllers: [...PositionControllers],
  providers: [...PositionServices],
})
export class PositionModule {}
