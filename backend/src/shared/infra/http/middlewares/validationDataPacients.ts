import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

function validationDataPacients(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const errors = validationResult(request);

  if (!errors.isEmpty()) {
    return response.status(400).json({ errors: errors.array() });
  }

  next();
}

export { validationDataPacients };
