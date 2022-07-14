export interface IInputDate {
    labelText: string;
    id: string;
    requiredField?: boolean;
    setIsBirthDate(isBirthDate: Date | null): void;
    value: Date | null;
    error?: boolean;
    errorText?: string | null
}