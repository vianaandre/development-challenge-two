import { Box, Button, IconButton, InputAdornment, OutlinedInput, Tooltip, Typography } from "@mui/material"
import React, { useState } from "react"
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import SearchIcon from '@mui/icons-material/Search'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import InfoIcon from '@mui/icons-material/Info'
import { IHeader } from './interface'

export const Header: React.FC<IHeader> = ({ handleOpenModal }) => {
    const [ isOnFocus, setIsOnFocus ] = useState(false)

    return (
        <>
            <Box width={373}>
                <OutlinedInput placeholder='Buscar pacientes...' sx={{
                }} fullWidth startAdornment={
                    <InputAdornment position='start'>
                        <SearchIcon color={isOnFocus ? 'primary' : 'disabled'} />
                    </InputAdornment>    
                } onFocus={() => setIsOnFocus(true)} onBlur={() => setIsOnFocus(false)} />
            </Box>
            <Box>
                <Button variant='text' sx={{
                    height: 47,
                    width: 189,
                    backgroundColor: 'primary.main',
                    borderRadius: 2,
                    color: "#FFF",
                    ":hover": {
                        backgroundColor: '#0A39B9'
                    }
                }}>
                    <PersonAddIcon />
                    <Box onClick={handleOpenModal} >
                        <Typography variant='body2' fontWeight={500} textTransform="uppercase" ml={1} >
                            Novo Paciente
                        </Typography>
                    </Box>
                </Button>
                <Box color="secondary.dark" display="flex" alignItems="center" gap={.5} mt={1} width="100%" justifyContent="flex-end">
                    <PeopleAltIcon sx={{
                        fontSize: 16
                    }} />
                        <Typography variant="body2" pt={0.3}>
                        10/100 Usuários
                    </Typography>
                    <Tooltip title="Usuário por página">
                        <IconButton>
                            <InfoIcon sx={{
                                fontSize: 16
                            }} />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>
        </>
    )
}