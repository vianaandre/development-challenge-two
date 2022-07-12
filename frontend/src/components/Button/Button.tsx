import React from "react"
import { Box, Typography } from '@mui/material'
import { IButton } from './interface'

export const Button: React.FC<IButton> = ({ children, title }) => {
    return (
        <Box display="flex" alignItems="center" justifyContent="center" gap={1} bgcolor="primary.main" borderRadius={2} height={48} color="#FFF">
            {children}
            <Typography variant="body1" >
                {title}
            </Typography>
        </Box>
    )
}