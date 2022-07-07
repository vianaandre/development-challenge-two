import { Router } from "express";

import { patientsRouter } from "./patients.routes";

const router = Router();

router.use("/patients", patientsRouter);

export { router };
