import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListPatientsUseCase } from "./ListPatientsUseCase";

class ListPatientsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const page = Number(request.query.page) || 1;
    const orderBy = request.query.order === "desc" ? "DESC" : "ASC";

    const listPatientsUseCase = container.resolve(ListPatientsUseCase);

    const patients = await listPatientsUseCase.exeucte(page, orderBy);

    return response.status(200).json(patients);
  }
}

export { ListPatientsController };
