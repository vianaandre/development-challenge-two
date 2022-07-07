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

  async findById(id: string): Promise<Address> {
    const address = await this.repository.findOne({
      where: {
        id,
      },
    });

    return address;
  }

  async list(page: number, desc: "DESC" | "ASC"): Promise<Address[]> {
    const address = await this.repository
      .createQueryBuilder("address")
      .orderBy("address.created_at", desc)
      .skip((page - 1) * 10)
      .take(10)
      .getMany();

    return address;
  }

  async listFindById(ids: { id: string }[]): Promise<Address[]> {
    const address = await this.repository.find({
      where: ids,
    });

    return address;
  }
  async delete(ids: { id: string }[]): Promise<void> {
    await this.repository
      .createQueryBuilder("address")
      .delete()
      .from(Address)
      .where(ids)
      .execute();
  }
}

export { AddressRepository };
