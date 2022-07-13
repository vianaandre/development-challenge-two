import { InputAdornment, OutlinedInput, Box, Typography, IconButton, Tooltip } from "@mui/material"
import React from "react"
import HelpIcon from '@mui/icons-material/Help'
import { IInput } from './interface'

export const Input: React.FC<IInput> = ({ Icon, id, type, labelText, requiredField, error, errorText, ...rest }) => {

    return (
        <Box width="100%" display="flex" flexDirection="column" justifyItems="flex-start" gap={.5} position="relative">
            <Typography variant="body2" fontWeight={600} display="flex" gap={.5} color={error ? 'error' : 'primary.dark'}>
                <label htmlFor={id}>{labelText}
                </label>
                {requiredField && <Typography color="error" variant="body2" fontWeight={700}>*</Typography>}
            </Typography>
            <OutlinedInput id={id} type={type} {...rest} endAdornment={
                <InputAdornment position='end'>
                    {error ? (
                        <Box position="absolute" right={4}>
                            <Tooltip title={errorText || ''}>
                                <IconButton>
                                    <HelpIcon color="error" />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    ) : <Icon color="primary" />}
                </InputAdornment>    
                }
                error={error}
                sx={{
                    borderRadius: 2,
                    width: "100%",
                }}
            />
        </Box>
    )
}