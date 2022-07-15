import { IPatient } from "../../../../common/interfaces/IPatient";

export interface IPatientDate {
    name: string;
    birth_date: Date;
    email: string;
    district: string;
    number: number;
    city: string;
    cep: string;
    state: string;
    neighborhood: string;
}

export interface IModalCreatedPatient {
    open: boolean;
    handleClose(): void;
    patient?: IPatient;
    type: 'create' | 'update';
}
