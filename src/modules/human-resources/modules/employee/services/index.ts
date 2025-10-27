import { CreateEmployeeService } from './create-employee.service';
import { DeleteEmployeeService } from './delete-employee.service';
import { GetEmployeeService } from './get-employee.service';
import { UpdateEmployeeService } from './update-employee.service';

export const EmployeeServices = [
  CreateEmployeeService,
  UpdateEmployeeService,
  DeleteEmployeeService,
  GetEmployeeService,
];
