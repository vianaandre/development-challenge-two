import { Patients } from "@modules/patients/infra/typeorm/entities/Patients";
import { IAddressRepository } from "@modules/patients/repositories/IAddressRepository";
import { IPatientsRepository } from "@modules/patients/repositories/IPatientsRepository";
import { inject, injectable } from "tsyringe";

interface IResponse {
  patients: Patients[];
  currentPage: number;
  nextPage: number;
  prevPage: number;
  total: number;
  totalPage: number;
  orderBy: string;
}

@injectable()
class ListPatientsUseCase {
  constructor(
    @inject("PatientsRepository")
    private patientsRepository: IPatientsRepository,
    @inject("AddressRepository")
    private addressRepository: IAddressRepository
  ) {}

  async exeucte(page = 1, orderBy: "ASC" | "DESC" = "ASC"): Promise<IResponse> {
    const { patients, totalPatients } = await this.patientsRepository.list(
      page,
      orderBy
    );
    const address = await this.addressRepository.list(page, orderBy);

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
      currentPage: page,
      nextPage: page + 1 > Math.ceil(totalPatients / 10) ? page : page + 1,
      prevPage: page === 1 ? 1 : page - 1,
      total: totalPatients,
      totalPage: Math.ceil(totalPatients / 10),
      orderBy,
    };
  }
}

export { ListPatientsUseCase };
