import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/modules/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async validateUserById(id: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id }, relations: ['roles', 'roles.permissions', 'modules', 'companies'] });
  }
}
