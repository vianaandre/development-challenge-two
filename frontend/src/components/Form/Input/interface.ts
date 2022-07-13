import { OutlinedInputProps, SvgIconTypeMap } from '@mui/material'
import { OverridableComponent } from '@mui/material/OverridableComponent'


export interface IInput extends OutlinedInputProps {
    Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
    id: string;
    type: string;
    name?: string;
    labelText: string;
    requiredField?: boolean;
    mask?: string;
    error?: boolean;
    errorText?: string
}