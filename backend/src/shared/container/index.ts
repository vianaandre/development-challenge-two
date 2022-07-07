import { AddressRepository } from "@modules/patients/infra/typeorm/repositories/AddressRepository";
import { PatientsRepository } from "@modules/patients/infra/typeorm/repositories/PatientsRepository";
import { IAddressRepository } from "@modules/patients/repositories/IAddressRepository";
import { IPatientsRepository } from "@modules/patients/repositories/IPatientsRepository";
import { container } from "tsyringe";

container.registerSingleton<IPatientsRepository>(
  "PatientsRepository",
  PatientsRepository
);

container.registerSingleton<IAddressRepository>(
  "AddressRepository",
  AddressRepository
);
