import { CreateEmployeeController } from './create-employee.controller';
import { DeleteEmployeeController } from './delete-employee.controller';
import { GetEmployeeController } from './get-employee.controller';
import { UpdateEmployeeController } from './update-employee.controller';

export const EmployeeControllers = [
  GetEmployeeController,
  UpdateEmployeeController,
  CreateEmployeeController,
  DeleteEmployeeController,
];
