import { CreateUserService } from './create-user.service';
import { DeleteUserService } from './delete-user.service';
import { GetUserService } from './get-user.service';
import { UpdateUserService } from './update-user.service';

export const UserServices = [
  CreateUserService,
  DeleteUserService,
  UpdateUserService,
  GetUserService,
];
