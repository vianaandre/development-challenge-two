import React, { useState } from "react"
import { Box, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { SearchProps } from './interface'

export const Search: React.FC<SearchProps> = ({ ...rest }) => {
    const [ isFocus, setIsFocus ] = useState(false)

    return (
        <Box display="flex" alignItems="center" position="relative">
            <TextField label="Pesquisar" variant="outlined" sx={{ width: 324, height: 47, borderRadius: 10 }} {...rest} onFocus={() => setIsFocus(true)} onBlur={() => setIsFocus(false)} />
            <Box position="absolute" top={14} right={12}>
                <SearchIcon color={isFocus ? 'primary' : 'action'} />
            </Box>
        </Box>
    )
}