import { Address } from "@modules/patients/infra/typeorm/entities/Address";

import { ICreateAddressDTO } from "../dto/ICreateAddressDTO";

interface IAddressRepository {
  create(data: ICreateAddressDTO): Promise<Address>;
}

export { IAddressRepository };
