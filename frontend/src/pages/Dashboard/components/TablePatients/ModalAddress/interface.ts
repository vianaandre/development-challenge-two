import { IAddress } from "../../../../../common/interfaces/IAddress";

export interface IModalAdress {
    open: boolean;
    handleClose(): void;
    address: IAddress
}