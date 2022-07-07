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

  async list(
    page: number,
    desc: "DESC" | "ASC"
  ): Promise<{
    patients: Patients[];
    totalPatients: number;
  }> {
    const patients = await this.repository
      .createQueryBuilder("patients")
      .orderBy("patients.created_at", desc)
      .skip((page - 1) * 10)
      .take(10)
      .getMany();

    const totalPatients = await this.repository
      .createQueryBuilder("patients")
      .getCount();

    return {
      patients,
      totalPatients,
    };
  }

  async search(search: string): Promise<Patients[]> {
    const patients = await this.repository
      .createQueryBuilder("patients")
      .select()
      .where("name ILIKE :search", { search: `%${search}%` })
      .getMany();

    return patients;
  }

  async delete(ids: { id: string }[]): Promise<void> {
    await this.repository
      .createQueryBuilder("patients")
      .delete()
      .from(Patients)
      .where(ids)
      .execute();
  }

  async findById(ids: { id: string }[]): Promise<Patients[]> {
    const patients = await this.repository.find({
      where: ids,
    });

    return patients;
  }
}

export { PatientsRepository };
