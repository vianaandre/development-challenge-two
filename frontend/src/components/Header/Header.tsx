import React from 'react'
import { Box, Typography } from '@mui/material'
import { Search } from '../Search'

export const Header: React.FC = () => {
    return (
        <Box sx={{
            width: '100%',
            height: 100,
            backgroundColor: '#FFF'
        }}
            paddingX={6}
            display="flex"
            alignItems="center"
            component="header"
            borderBottom={1}
            borderColor="secondary.main"
        >
            <Typography variant='h1' fontWeight={800} color="primary.dark" display="flex">
                <Typography variant='h1' fontWeight={800} color="primary.main">
                    Med
                </Typography>
                Pacientes
            </Typography>
            <Box marginLeft={5}>
                <Search />
            </Box>
            <Box display="flex" height="100%" alignItems="center" ml="auto" paddingY={3}>
                <img src="https://avatars.githubusercontent.com/u/67127843?v=4" alt="André Viana" style={{
                    width: 52,
                    borderRadius: '50%'
                }} />
                <Typography variant='body1' color="secondary.dark" display="flex" alignItems="center" pl={2} fontWeight="bold" gap={.5} height="100%" borderLeft={1} ml={2} borderColor="primary.light">
                    <Typography fontWeight="400">Olá, </Typography>    
                    André Viana
                </ Typography>
            </Box>
        </Box>
    )
}