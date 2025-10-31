import { CreatePatientService } from './create-patient.service';
import { GetPatientService } from './get-patient.service';
import { UpdatePatientService } from './update-patient.service';
import { DeletePatientService } from './delete-patient.service';

export const PatientServices = [
  CreatePatientService,
  GetPatientService,
  UpdatePatientService,
  DeletePatientService,
];
