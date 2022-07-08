import { Address } from "@modules/patients/infra/typeorm/entities/Address";

import { ICreateAddressDTO } from "../dto/ICreateAddressDTO";

interface IAddressRepository {
  create(data: ICreateAddressDTO): Promise<Address>;
  findById(id: string): Promise<Address>;
  list(page: number, desc: "DESC" | "ASC"): Promise<Address[]>;
  listFindById(ids: { id: string }[]): Promise<Address[]>;
  delete(id: { id: string }[]): Promise<void>;
  update(data: ICreateAddressDTO, id: string): Promise<void>;
}

export { IAddressRepository };
