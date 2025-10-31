import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Test } from './entities/test.entity';
import { TestPanel } from './entities/test-panel.entity';
import { TestController } from './controllers/test.controller';
import { TestPanelController } from './controllers/test-panel.controller';
import { TestService } from './services/test.service';
import { TestPanelService } from './services/test-panel.service';
import { Company } from '../organization/modules/company/entities/company.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Test, TestPanel, Company])],
  controllers: [TestController, TestPanelController],
  providers: [TestService, TestPanelService],
  exports: [TestService, TestPanelService],
})
export class TestsModule {}
