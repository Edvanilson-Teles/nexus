import { CreatePositionService } from './create-position.service';
import { DeletePositionService } from './delete-position.service';
import { GetPositionService } from './get-position.service';
import { UpdatePositionService } from './update-position.service';

export const PositionServices = [
  CreatePositionService,
  GetPositionService,
  UpdatePositionService,
  DeletePositionService,
];
