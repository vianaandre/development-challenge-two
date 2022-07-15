import { IPatient } from "./IPatient";

export interface IPatientsRequest {
    currentPage: number;
    nextPage: number;
    prevPage: number;
    total: number;
    totalPage: number;
    orderBy: string;
    patients: IPatient[],
    search?: string
}