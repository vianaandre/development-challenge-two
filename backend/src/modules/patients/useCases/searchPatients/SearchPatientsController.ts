import { Request, Response } from "express";
import { container } from "tsyringe";

import { SearchPatientsUseCase } from "./SearchPatientsUseCase";

class SearchPatientsController {
  async handle(request: Request, response: Response) {
    const { search } = request.params;

    const searchPatientsUseCase = container.resolve(SearchPatientsUseCase);

    const patients = await searchPatientsUseCase.execute(search);

    return response.status(200).json(patients);
  }
}

export { SearchPatientsController };
