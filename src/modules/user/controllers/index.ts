import { CreateUserController } from './create-user.controller';
import { DeleteUserController } from './delete-user.controller';
import { GetUserController } from './get-user.controller';
import { UpdateUserController } from './update-user.controller';

export const UserControllers = [
  CreateUserController,
  GetUserController,
  UpdateUserController,
  DeleteUserController,
];
