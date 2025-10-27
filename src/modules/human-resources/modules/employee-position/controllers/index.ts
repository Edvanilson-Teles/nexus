import { CreateEmployeePositionController } from './create-employee-position.controller';
import { DeleteEmployeePositionController } from './delete-employee-position.controller';
import { GetEmployeePositionController } from './get-employee-position.controller';
import { UpdateEmployeePositionController } from './upddate-employee-position.controller';

export const EmployeePositionControllers = [
  GetEmployeePositionController,
  UpdateEmployeePositionController,
  DeleteEmployeePositionController,
  CreateEmployeePositionController,
];
