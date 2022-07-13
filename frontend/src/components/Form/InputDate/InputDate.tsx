import * as React from 'react'
import { Box, TextField, Typography } from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { IInputDate } from './interface'

export const InputDate: React.FC<IInputDate> = ({ labelText, requiredField, id, value, setIsBirthDate }) => {

  return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
                value={value}
                onChange={(newValue) => {
                    setIsBirthDate(newValue);
                }}
                renderInput={(params) => {
                 return (
                    <Box width="100%" display="flex" flexDirection="column" justifyItems="flex-start" gap={.5}>
                        <Typography variant="body2" fontWeight={600} display="flex" gap={.5}>
                            <label htmlFor={id}>{labelText}
                            </label>
                            {requiredField && <Typography color="error" variant="body2" fontWeight={700}>*</Typography>}
                        </Typography>
                        <TextField {...params} id={id} placeholder="dd/mm/yyyy" color='primary' />
                    </Box>
                 )
                }}
            />
        </LocalizationProvider>
  );
}