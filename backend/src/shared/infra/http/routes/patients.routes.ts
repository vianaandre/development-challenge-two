import { CreatePatientsController } from "@modules/patients/useCases/createPatients/CreatePatientsController";
import { Router } from "express";
import { body } from "express-validator";

import { validationDataPacients } from "@shared/infra/http/middlewares/validationDataPacients";

const createPatientsController = new CreatePatientsController();

const patientsRouter = Router();

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

export { patientsRouter };
