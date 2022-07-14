export interface IModalCreatedPatient {
    open: boolean;
    setIsOpenModal(setIsOpenModal: boolean): void;
}

export interface IPatientDate {
    name: string;
    birth_date: Date | null;
    email: string;
    district: string;
    number: number;
    city: string;
    cep: string;
    state: string;
}