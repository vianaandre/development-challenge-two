import { Box, Typography } from '@mui/material'
import React, { useCallback, useState } from 'react'
import { LayoutDashboard } from '../../layouts/Dashboard'
import { Header } from './components/Header'
import { ModalCreatedPatient } from './components/ModalCreatedPatient'

export const Dashboard: React.FC = () => {
    const [ isOpenModal, setIsOpenModal ] = useState(false)

    const handleOpenModal = useCallback(() => {
        setIsOpenModal(!isOpenModal)
    }, [isOpenModal])

    return (
        <LayoutDashboard>
            <Box>
                <Typography variant='h4' fontWeight={500} color="primary.dark">
                    Pacientes
                </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" mt={4.5}>
               <Header handleOpenModal={handleOpenModal} /> 
               <ModalCreatedPatient open={isOpenModal} onClose={handleOpenModal} />
            </Box>
        </LayoutDashboard>
    )
}