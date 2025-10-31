import { PartialType } from '@nestjs/swagger';
import { CreateTestPanelDto } from './create-test-panel.dto';

export class UpdateTestPanelDto extends PartialType(CreateTestPanelDto) {}
