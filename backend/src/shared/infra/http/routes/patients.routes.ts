import { CreatePatientsController } from "@modules/patients/useCases/createPatients/CreatePatientsController";
import { DeletePatientController } from "@modules/patients/useCases/deletePatient/DeletePatientController";
import { ListPatientsController } from "@modules/patients/useCases/listPatients/ListPatientsController";
import { SearchPatientsController } from "@modules/patients/useCases/searchPatients/SearchPatientsController";
import { Router } from "express";
import { body } from "express-validator";

import { validationDataPacients } from "@shared/infra/http/middlewares/validationDataPacients";

const createPatientsController = new CreatePatientsController();
const listPatientsController = new ListPatientsController();
const searchPatientController = new SearchPatientsController();
const deletePatientController = new DeletePatientController();

const patientsRouter = Router();

patientsRouter.get("/", listPatientsController.handle);
patientsRouter.get("/:search", searchPatientController.handle);
patientsRouter.post(
  "/",
  [
    body("name").isString(),
    body("email").isEmail(),
    body("birth_date").isDate(),
    body("address.city").isString(),
    body("address.state").isString(),
    body("address.postcode").isString(),
    body("address.number").isNumeric(),
    body("address.neighborhood").isString(),
  ],
  validationDataPacients,
  createPatientsController.handle
);
patientsRouter.delete("/:id", deletePatientController.handle);

export { patientsRouter };
