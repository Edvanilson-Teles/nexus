import { Body, Controller, Param, Patch, UseGuards } from '@nestjs/common';
import { UpdateEmployeeDto } from '../dto/update-employee.dto';
import { UpdateEmployeeService } from '../services/update-employee.service';
import { AuthGuard } from '@nestjs/passport';
import { PermissionGuard } from 'src/common/guards/permission.guard';
import { RequirePermission } from 'src/common/decorators/require-permission.decorator';
import { ContextService } from 'src/common/context/context.service';

@Controller('employee')
@UseGuards(AuthGuard('jwt'), PermissionGuard)
export class UpdateEmployeeController {
  constructor(
    private readonly updateEmployeeService: UpdateEmployeeService,
    private readonly ctxService: ContextService,
  ) {}

  @Patch(':id')
  @RequirePermission('employee.update', 'EmployeeModule')
  update(
    @Param('id') id: number,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    const ctx = this.ctxService.getContext();
    const companyId = ctx.company?.id as number;
    // service will perform update and enforce company ownership
    return this.updateEmployeeService.update(id, updateEmployeeDto, companyId);
  }
}
