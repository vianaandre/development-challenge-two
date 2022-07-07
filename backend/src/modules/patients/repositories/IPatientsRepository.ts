import { ICreatePatientsDTO } from "@modules/patients/dto/ICreatePatientsDTO";
import { Patients } from "@modules/patients/infra/typeorm/entities/Patients";

interface IPatientsRepository {
  create(data: ICreatePatientsDTO): Promise<Patients>;
}
export { IPatientsRepository };
