import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreatePatientsUseCase } from "./CreatePatientsUseCase";

class CreatePatientsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, birth_date, email, address } = request.body;

    const createPatientsUseCase = container.resolve(CreatePatientsUseCase);

    const pacients = await createPatientsUseCase.execute({
      name,
      birth_date,
      email,
      address,
    });

    return response.status(201).json(pacients);
  }
}

export { CreatePatientsController };
