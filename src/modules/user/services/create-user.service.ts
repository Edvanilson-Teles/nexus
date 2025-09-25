import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';
import { UserMapper } from '../mappers/user.mapper';

@Injectable()
export class CreateUserService {
  constructor(
    @InjectRepository(User)
    private readonly createUserRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    if (!createUserDto.password) {
      throw new BadRequestException('Password is required');
    }

    const userData = UserMapper.toInterface(createUserDto);

    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, 10);
    }

    const userEntity = this.createUserRepository.create(
      UserMapper.toEntity(userData),
    );

    const savedUser = await this.createUserRepository.save(userEntity);

    return UserMapper.toResponse(savedUser);
  }
}
