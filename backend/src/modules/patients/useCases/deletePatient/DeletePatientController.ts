import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeletePatientUseCase } from "./DeletePatientUseCase";

class DeletePatientController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deletePatientUseCase = container.resolve(DeletePatientUseCase);

    await deletePatientUseCase.execute(id);

    return response.status(200).send();
  }
}

export { DeletePatientController };
