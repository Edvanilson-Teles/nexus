import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto, UpdateUserPasswordDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { IUserBase } from '../interfaces/user.interface';

export class UserMapper {
  /*
  static toInterfaceCreate(dto: CreateUserDto): Partial<IUserBase> {
    return {
      name: dto.name,
      email: dto.email,
      password: dto.password,
    };
  }

  static toInterfaceUpdate(dto: UpdateUserDto): Partial<IUserBase> {
    return {
      name: dto.name,
      email: dto.email,
    };
  }

  static toInterfaceUpdatePassword(
    dto: UpdateUserPasswordDto,
  ): Partial<IUserBase> {
    return {
      password: dto.newPassword,
    };
  }
  */

  static toInterface(
    dto: CreateUserDto | UpdateUserDto | UpdateUserPasswordDto,
  ): Partial<IUserBase> {
    const data: Partial<IUserBase> = {};

    if ('name' in dto) data.name = dto.name;
    if ('email' in dto) data.email = dto.email;
    if ('password' in dto && dto.password) data.password = dto.password;
    if ('newPassword' in dto && dto.newPassword)
      data.password = dto.newPassword;

    return data;
  }

  static toEntity(data: Partial<IUserBase>): Partial<User> {
    return {
      ...data,
    };
  }

  static toResponse(entity: Partial<User>): Partial<IUserBase> {
    return {
      id: entity.id,
      name: entity.name,
      email: entity.email,
    };
  }

  static toResponseList(entity: User[]): any[] {
    return entity.map((user) => UserMapper.toResponse(user));
  }
}
