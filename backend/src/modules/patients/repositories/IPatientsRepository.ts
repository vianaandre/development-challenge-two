import { ICreatePatientsDTO } from "@modules/patients/dto/ICreatePatientsDTO";
import { Patients } from "@modules/patients/infra/typeorm/entities/Patients";

interface IPatientsRepository {
  create(data: ICreatePatientsDTO): Promise<Patients>;
  list(
    page: number,
    desc: "DESC" | "ASC"
  ): Promise<{
    patients: Patients[];
    totalPatients: number;
  }>;
  search(search: string): Promise<Patients[]>;
}
export { IPatientsRepository };
