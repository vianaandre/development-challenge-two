import { IAddressRepository } from "@modules/patients/repositories/IAddressRepository";
import { IPatientsRepository } from "@modules/patients/repositories/IPatientsRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

@injectable()
class DeletePatientUseCase {
  constructor(
    @inject("PatientsRepository")
    private patientsRepository: IPatientsRepository,
    @inject("AddressRepository")
    private addressRepository: IAddressRepository
  ) {}

  async execute(id: string): Promise<void> {
    const idsNewArray = id.split(";").map((id) => {
      return { id };
    });

    const patientsExist = await this.patientsRepository.findById(idsNewArray);

    if (patientsExist.length <= 0) {
      throw new AppError("Patient does not found", 404);
    }

    const idsAddressNewArray = patientsExist.map((patient) => {
      return {
        id: patient.address_id,
      };
    });

    const addressExist = await this.addressRepository.listFindById(
      idsAddressNewArray
    );

    if (addressExist.length <= 0) {
      throw new AppError("Address does not found", 404);
    }

    await this.patientsRepository.delete(idsNewArray);
    await this.addressRepository.delete(idsAddressNewArray);
  }
}

export { DeletePatientUseCase };
