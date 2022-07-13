import { IAddress } from "./IAddress";

export interface IPatient {
    name: string;
    email: string;
    birthDate: Date | null;
    address: IAddress
}