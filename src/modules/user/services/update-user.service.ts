import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { UpdateUserDto, UpdateUserPasswordDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { UserMapper } from '../mappers/user.mapper';

@Injectable()
export class UpdateUserService {
  constructor(
    @InjectRepository(User)
    private readonly updateUserRepository: Repository<User>,
  ) {}

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.updateUserRepository.findOne({ where: { id } });

    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }

    const userData = UserMapper.toInterface(updateUserDto);
    await this.updateUserRepository.update(id, userData);
    return UserMapper.toResponse({ ...user, ...userData });
  }

  async updatePassword(
    id: number,
    updateUserPasswordDto: UpdateUserPasswordDto,
  ) {
    const { oldPassword, newPassword } = updateUserPasswordDto;
    const user = await this.updateUserRepository.findOne({
      where: { id },
      select: ['password'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const isValid = await bcrypt.compare(oldPassword, user.password);

    if (!isValid) {
      throw new BadRequestException('Old password is incorrect');
    }

    const userData = UserMapper.toInterface(
      updateUserPasswordDto,
    );
    await this.updateUserRepository.update(id, userData);
    return UserMapper.toResponse({ ...user, ...userData });
  }
}
