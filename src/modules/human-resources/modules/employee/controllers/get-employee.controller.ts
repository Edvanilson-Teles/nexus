import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { GetEmployeeService } from '../services/get-employee.service';
import { AuthGuard } from '@nestjs/passport';
import { PermissionGuard } from 'src/common/guards/permission.guard';
import { RequirePermission } from 'src/common/decorators/require-permission.decorator';
import { ContextService } from 'src/common/context/context.service';

@Controller('employee')
@Controller('employee')
@UseGuards(AuthGuard('jwt'), PermissionGuard)
export class GetEmployeeController {
  constructor(
    private readonly getEmployeeService: GetEmployeeService,
    private readonly ctxService: ContextService,
  ) {}

  @Get()
  @RequirePermission('employee.view', 'EmployeeModule')
  findAll() {
    const ctx = this.ctxService.getContext();
    const companyId = ctx.company?.id;
    return this.getEmployeeService.findAllByCompany(companyId as number);
  }

  @Get(':id')
  @RequirePermission('employee.view', 'EmployeeModule')
  findOneById(@Param('id') id: number) {
    const ctx = this.ctxService.getContext();
    const companyId = ctx.company?.id;
    return this.getEmployeeService.findOneById(id, companyId as number);
  }
}
