import { Controller, Delete, Param, UseGuards } from '@nestjs/common';
import { DeleteEmployeeService } from '../services/delete-employee.service';
import { AuthGuard } from '@nestjs/passport';
import { PermissionGuard } from '../../../common/guards/permission.guard';
import { RequirePermission } from '../../../common/decorators/require-permission.decorator';
import { ContextService } from '../../../common/context/context.service';

@Controller('employee')
@UseGuards(AuthGuard('jwt'), PermissionGuard)
export class DeleteEmployeeController {
  constructor(
    private readonly deleteEmployeeService: DeleteEmployeeService,
    private readonly ctxService: ContextService,
  ) {}

  @Delete(':id')
  @RequirePermission('employee.delete', 'EmployeeModule')
  remove(@Param('id') id: number) {
    const ctx = this.ctxService.getContext();
    const companyId = ctx.company?.id as number;
    return this.deleteEmployeeService.remove(id, companyId);
  }
}
