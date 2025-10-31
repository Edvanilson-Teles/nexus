
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateEmployeeDto } from '../dto/create-employee.dto';
import { CreateEmployeeService } from '../services/create-employee.service';
import { PermissionGuard } from 'src/common/guards/permission.guard';
import { RequirePermission } from 'src/common/decorators/require-permission.decorator';
import { AuthGuard } from '@nestjs/passport';
import { ContextService } from 'src/common/context/context.service';

@Controller('employee')
@UseGuards(AuthGuard('jwt'), PermissionGuard)
export class CreateEmployeeController {
  constructor(
    private readonly createEmployeeService: CreateEmployeeService,
    private readonly ctxService: ContextService,
  ) {}

  @Post()
  @RequirePermission('employee.create', 'EmployeeModule')
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    const ctx = this.ctxService.getContext();
    const company = ctx.company;
    // attach company to dto/entity
    (createEmployeeDto as any).company = { id: company?.id };
    return this.createEmployeeService.create(createEmployeeDto);
  }
}
