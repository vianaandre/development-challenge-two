import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdatePatientUseCase } from "./UpdatePatientUseCase";

class UpdatePatientController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, birth_date, address } = request.body;
    const { id } = request.params;

    const updatePatientUseCase = container.resolve(UpdatePatientUseCase);

    await updatePatientUseCase.execute(
      {
        name,
        address,
        birth_date,
        email,
      },
      id
    );

    return response.status(200).send();
  }
}

export { UpdatePatientController };
