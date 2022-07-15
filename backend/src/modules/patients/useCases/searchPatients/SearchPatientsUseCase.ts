import { Patients } from "@modules/patients/infra/typeorm/entities/Patients";
import { IAddressRepository } from "@modules/patients/repositories/IAddressRepository";
import { IPatientsRepository } from "@modules/patients/repositories/IPatientsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class SearchPatientsUseCase {
  constructor(
    @inject("PatientsRepository")
    private patientsRepository: IPatientsRepository,
    @inject("AddressRepository")
    private addressRepository: IAddressRepository
  ) {}

  async execute(
    search: string
  ): Promise<{ patients: Patients[]; search: string }> {
    const patients = await this.patientsRepository.search(search);

    const addressIds = patients.map((patient) => {
      return { id: patient.address_id };
    });

    const address = await this.addressRepository.listFindById(addressIds);

    const newFormatPatients = [];

    for (let i = 0; i < address.length; i++) {
      if (patients[i].address_id === address[i].id) {
        newFormatPatients.push({
          ...patients[i],
          address: address[i],
        });
      }
    }

    return {
      patients: newFormatPatients,
      search,
    };
  }
}

export { SearchPatientsUseCase };
