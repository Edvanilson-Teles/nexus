import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class DeleteUserService {
  constructor(
    @InjectRepository(User)
    private readonly deleteUserRepository: Repository<User>,
  ) {}

  async remove(id: number): Promise<void> {
    await this.deleteUserRepository.delete(id);
  }
}
