import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UserMapper } from '../mappers/user.mapper';

@Injectable()
export class GetUserService {
  constructor(
    @InjectRepository(User)
    private readonly getUserRepository: Repository<User>,
  ) {}

  async findAll() {
    const users = await this.getUserRepository.find();
    return UserMapper.toResponseList(users);
  }

  async findOneBy(id: number) {
    const user = await this.getUserRepository.findOneBy({ id });

    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }

    return UserMapper.toResponse(user);
  }
}
