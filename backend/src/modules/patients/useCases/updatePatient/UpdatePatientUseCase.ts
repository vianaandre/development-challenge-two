import { ICreateAddressDTO } from "@modules/patients/dto/ICreateAddressDTO";
import { IAddressRepository } from "@modules/patients/repositories/IAddressRepository";
import { IPatientsRepository } from "@modules/patients/repositories/IPatientsRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

interface IRequest {
  name: string;
  birth_date: string;
  email: string;
  address: ICreateAddressDTO;
}

@injectable()
class UpdatePatientUseCase {
  constructor(
    @inject("PatientsRepository")
    private patientRepository: IPatientsRepository,
    @inject("AddressRepository")
    private addressRepository: IAddressRepository
  ) {}

  async execute(data: IRequest, id: string): Promise<void> {
    const patientsExist = await this.patientRepository.findById([{ id }]);

    if (patientsExist.length <= 0) {
      throw new AppError("Patient does not found", 404);
    }

    const addressExist = await this.addressRepository.findById(
      patientsExist[0].address_id
    );

    if (!addressExist) {
      throw new AppError("Addres does not found", 404);
    }

    await this.patientRepository.update(
      {
        name: data.name,
        birth_date: data.birth_date,
        email: data.email,
      },
      id
    );
    await this.addressRepository.update(data.address, addressExist.id);
  }
}

export { UpdatePatientUseCase };
