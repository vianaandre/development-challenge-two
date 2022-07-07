import { ICreateAddressDTO } from "@modules/patients/dto/ICreateAddressDTO";
import { Address } from "@modules/patients/infra/typeorm/entities/Address";
import { IAddressRepository } from "@modules/patients/repositories/IAddressRepository";
import { Repository } from "typeorm";

import { AppDataSource } from "@shared/infra/typeorm/data-source";

class AddressRepository implements IAddressRepository {
  private repository: Repository<Address>;

  constructor() {
    this.repository = AppDataSource.getRepository(Address);
  }

  async create({
    city,
    neighborhood,
    number,
    postcode,
    state,
  }: ICreateAddressDTO): Promise<Address> {
    const address = await this.repository.create({
      city,
      neighborhood,
      number,
      postcode,
      state,
    });

    await this.repository.save(address);

    return address;
  }
}

export { AddressRepository };
