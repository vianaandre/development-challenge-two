import { Box, Button, IconButton, InputAdornment, OutlinedInput, Tooltip, Typography, useMediaQuery } from "@mui/material"
import React, { useEffect, useState } from "react"
import CloseIcon from '@mui/icons-material/Close'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import SearchIcon from '@mui/icons-material/Search'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import InfoIcon from '@mui/icons-material/Info'
import { IHeader } from './interface'
import { usePatient } from '../../../../hooks/usePatient'

export const Header: React.FC<IHeader> = ({ setIsOpenModal }) => {
    const [ isOnFocus, setIsOnFocus ] = useState(false)
    const { handleSearch, data } = usePatient()
    const [ isSearch, setIsSearch ] = useState<string>('')
    const matchesOne = useMediaQuery('(max-width: 996px)')
    const matchesTwo = useMediaQuery('(max-width: 798px)')
    
    useEffect(() => {
        handleSearch(isSearch)
    }, [isSearch])

    return (
        <Box display="flex" width="100%" justifyContent="space-between"  flexDirection={matchesTwo ? 'column' : 'row'} alignItems={matchesTwo ? 'flex-end' : 'flex-start'}>
            <Box width={matchesOne ? (matchesTwo ? '100%' : 260) : 373}>
                <OutlinedInput placeholder='Buscar pacientes...' sx={{
                }} fullWidth startAdornment={
                    <InputAdornment position='start'>
                        <SearchIcon color={isOnFocus ? 'primary' : 'disabled'} />
                    </InputAdornment>    
                } endAdornment={
                    <InputAdornment position="end">
                        {isSearch ? (
                            <IconButton onClick={() => setIsSearch('')}>
                                <CloseIcon />
                            </IconButton>
                        ) : null}
                    </InputAdornment>
                } onFocus={() => setIsOnFocus(true)} onBlur={() => setIsOnFocus(false)} onChange={(event) => setIsSearch(event.target.value)} value={isSearch} />
            </Box>
            <Box mt={matchesTwo ? 2 : 0}>
                <Button variant='text' sx={{
                    height: 47,
                    width: 189,
                    backgroundColor: 'primary.main',
                    borderRadius: 2,
                    color: "#FFF",
                    ":hover": {
                        backgroundColor: '#0A39B9'
                    }
                }} onClick={() => setIsOpenModal(true)}>
                    <PersonAddIcon />
                    <Typography variant='body2' fontWeight={500} textTransform="uppercase" ml={1} color="#FFF">
                        Novo Paciente
                    </Typography>
                </Button>
                <Box color="secondary.dark" display="flex" alignItems="center" gap={.5} mt={1} width="100%" justifyContent="flex-end">
                    <PeopleAltIcon sx={{
                        fontSize: 16
                    }} />
                        <Typography variant="body2" pt={0.3}>
                            {data?.patients.length}{data?.total ? `/${data.total}` : ''} Usuários
                        </Typography>
                    <Tooltip title={data?.total ? 'Usuário por página' : 'Usuários encontrados'}>
                        <IconButton>
                            <InfoIcon sx={{
                                fontSize: 16
                            }} />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>
        </Box>
    )
}