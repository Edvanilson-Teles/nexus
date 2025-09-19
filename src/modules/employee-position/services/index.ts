import { CreateEmployeePositionService } from './create-employee-position.service';
import { DeleteEmployeePositionService } from './delete-employee-position.service';
import { GetEmployeePositionService } from './get-employee-position.service';
import { UpdateEmployeePositionService } from './update-employee-position.service';

export const EmployeePositionServices = [
  UpdateEmployeePositionService,
  CreateEmployeePositionService,
  GetEmployeePositionService,
  DeleteEmployeePositionService,
];
