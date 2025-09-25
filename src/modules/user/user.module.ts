import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserControllers } from './controllers';
import { User } from './entities/user.entity';
import { UserServices } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [...UserControllers],
  providers: [...UserServices],
})
export class UserModule {}
