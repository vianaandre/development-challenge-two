import { IAddress } from "./IAddress";

export interface IPatient {
    id?: string;
    name: string;
    email: string;
    birth_date: Date;
    address: IAddress
}