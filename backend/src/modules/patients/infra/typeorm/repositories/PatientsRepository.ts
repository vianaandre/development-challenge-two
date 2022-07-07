import { ICreatePatientsDTO } from "@modules/patients/dto/ICreatePatientsDTO";
import { Patients } from "@modules/patients/infra/typeorm/entities/Patients";
import { IPatientsRepository } from "@modules/patients/repositories/IPatientsRepository";
import { Repository } from "typeorm";

import { AppDataSource } from "@shared/infra/typeorm/data-source";

class PatientsRepository implements IPatientsRepository {
  private repository: Repository<Patients>;

  constructor() {
    this.repository = AppDataSource.getRepository(Patients);
  }

  async create({
    name,
    birth_date,
    email,
    address_id,
  }: ICreatePatientsDTO): Promise<Patients> {
    const pacients = await this.repository.create({
      name,
      birth_date: new Date(birth_date),
      email,
      address_id,
    });

    this.repository.save(pacients);

    return pacients;
  }
}

export { PatientsRepository };
