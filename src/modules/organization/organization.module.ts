import { Module } from "@nestjs/common";
import { CompanyModule } from "./modules/company/company.module";
import { PositionModule } from "./modules/position/position.module";

const ORGANIZATION_MODULES = [
    CompanyModule,
    PositionModule,
]

@Module({
    imports: [...ORGANIZATION_MODULES],
    exports: [...ORGANIZATION_MODULES]
})

export class OrganizationModule { }