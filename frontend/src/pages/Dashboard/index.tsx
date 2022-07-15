import { Box, Typography } from '@mui/material'
import React, { useState } from 'react'
import { LayoutDashboard } from '../../layouts/Dashboard'
import { Header } from './components/Header'
import { ModalCreatedPatient } from './components/ModalCreatedPatient'
import { TablePatients } from './components/TablePatients'
import { PatientProvider } from '../../hooks/usePatient'

export const Dashboard: React.FC = () => {
    const [ isOpenModal, setIsOpenModal ] = useState(false)

    return (
        <PatientProvider>
            <LayoutDashboard>
                <Box width="100%" height="100%" display="flex" flexDirection="column">
                    <Box>
                        <Typography variant='h4' fontWeight={500} color="primary.dark">
                            Pacientes
                        </Typography>
                    </Box>
                    <Box display="flex" flex={1} flexDirection="column" alignItems="center" mt={4.5} sx={{
                        maxHeight: 'calc(100% - 22px - 36px)'
                    }}>
                        <Header setIsOpenModal={setIsOpenModal} /> 
                        <ModalCreatedPatient open={isOpenModal} handleClose={() => setIsOpenModal(false)} type="create" />
                        <Box width="100%" className='table' overflow="auto" sx={{
                            maxHeight: 'calc(100% - 87px)'
                        }} mt={4}>
                            <TablePatients />
                        </Box>
                    </Box>
                </Box>
            </LayoutDashboard>
        </PatientProvider>
    )
}