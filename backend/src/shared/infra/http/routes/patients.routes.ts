import { requiredPatientsRequest } from "@config/requiredPatientsRequest";
import { CreatePatientsController } from "@modules/patients/useCases/createPatients/CreatePatientsController";
import { DeletePatientController } from "@modules/patients/useCases/deletePatient/DeletePatientController";
import { ListPatientsController } from "@modules/patients/useCases/listPatients/ListPatientsController";
import { SearchPatientsController } from "@modules/patients/useCases/searchPatients/SearchPatientsController";
import { UpdatePatientController } from "@modules/patients/useCases/updatePatient/UpdatePatientController";
import { Router } from "express";

import { validationDataPacients } from "@shared/infra/http/middlewares/validationDataPacients";

const createPatientsController = new CreatePatientsController();
const listPatientsController = new ListPatientsController();
const searchPatientController = new SearchPatientsController();
const deletePatientController = new DeletePatientController();
const updatePatientController = new UpdatePatientController();

const patientsRouter = Router();

patientsRouter.get("/", listPatientsController.handle);
patientsRouter.get("/:search", searchPatientController.handle);
patientsRouter.post(
  "/",
  requiredPatientsRequest,
  validationDataPacients,
  createPatientsController.handle
);
patientsRouter.put(
  "/:id",
  requiredPatientsRequest,
  validationDataPacients,
  updatePatientController.handle
);
patientsRouter.delete("/:id", deletePatientController.handle);

export { patientsRouter };
