import { ICreateAddressDTO } from "@modules/patients/dto/ICreateAddressDTO";
import { Address } from "@modules/patients/infra/typeorm/entities/Address";
import { Patients } from "@modules/patients/infra/typeorm/entities/Patients";
import { IAddressRepository } from "@modules/patients/repositories/IAddressRepository";
import { IPatientsRepository } from "@modules/patients/repositories/IPatientsRepository";
import { injectable, inject } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

interface IRequest {
  name: string;
  birth_date: string;
  email: string;
  address: ICreateAddressDTO;
}

interface IResponse extends Patients {
  address: Address;
}

@injectable()
class CreatePatientsUseCase {
  constructor(
    @inject("PatientsRepository")
    private patientsRepository: IPatientsRepository,
    @inject("AddressRepository")
    private addressRepository: IAddressRepository
  ) {}

  async execute({
    name,
    birth_date,
    email,
    address,
  }: IRequest): Promise<IResponse> {
    if (
      !/^\d\d\d\d-(0[1-9]|1[0-2])-(0[1-9]|[1-2]\d|3[0-1])$/.test(birth_date)
    ) {
      throw new AppError("Birth Date invalid - format(YYYY-MM-DD)", 404);
    }

    const getAddress = await this.addressRepository.create({
      city: address.city,
      state: address.state,
      neighborhood: address.neighborhood,
      number: address.number,
      postcode: address.postcode,
      district: address.district,
    });

    const pacient = await this.patientsRepository.create({
      name,
      birth_date,
      email,
      address_id: getAddress.id,
    });

    const addressPatient = await this.addressRepository.findById(
      pacient.address_id
    );

    return {
      ...pacient,
      address: addressPatient,
    };
  }
}

export { CreatePatientsUseCase };
