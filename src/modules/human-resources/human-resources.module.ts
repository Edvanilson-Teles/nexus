import { Module } from "@nestjs/common";
import { EmployeePositionModule } from "./modules/employee-position/employee-position.module";
import { EmployeeModule } from "./modules/employee/employee.module";


const HUMAN_RESOURCES_MODULES = [
    EmployeeModule,
    EmployeePositionModule
]

@Module({
    imports: [...HUMAN_RESOURCES_MODULES],
    exports: [...HUMAN_RESOURCES_MODULES],
})

export class HumanResourcesModule { }