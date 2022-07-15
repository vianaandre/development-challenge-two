import { Box, IconButton, Modal, Typography } from "@mui/material"
import React from "react"
import RoomIcon from '@mui/icons-material/Room'
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered'
import ApartmentIcon from '@mui/icons-material/Apartment'
import CloseIcon from '@mui/icons-material/Close'
import HomeIcon from '@mui/icons-material/Home'
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage'
import { IModalAdress } from './interface'
import { Input } from "../../../../../components/Form"

export const ModalAddress: React.FC<IModalAdress> = ({ open, handleClose, address }) => {
    return (
        <Modal
            onClose={handleClose}
            open={open}
        >
            <Box width="100%" height="100%" display="flex" alignItems="center" justifyContent="center">
                <Box width="90%" maxWidth={700} bgcolor="#FFF" padding={4} borderRadius={.75}>
                    <Box width="100%" display="flex" justifyContent="space-between" alignItems="center" borderBottom={1} borderColor="secondary.main" paddingBottom={3}>
                        <Typography variant="h6" fontWeight={700} color="primary.dark" >
                            Endereço do paciente
                        </Typography>
                        <IconButton onClick={handleClose}>
                            <CloseIcon color="action"/>
                        </IconButton>
                    </Box>
                    <Box width="100%" mt={3} display="flex" flexWrap="wrap" justifyContent="space-between">
                            <Box width="49%" mb={3}>
                                <Input id="read_id" name="cep" type="text" placeholder="CEP" Icon={HomeIcon} labelText="CEP" value={address.postcode} readOnly />
                            </Box>
                            <Box width="49%" mb={3}>
                                <Input id="read_number" type="number" placeholder="Número" Icon={FormatListNumberedIcon} labelText="Número" value={address.number} readOnly />
                            </Box>
                            <Box width="100%" mb={3}>
                                <Input id="read_neighborhood" type="text" placeholder="Bairro" Icon={RoomIcon} labelText="Bairro" value={address.neighborhood} readOnly />
                            </Box>
                            <Box width="100%" mb={3}>
                                <Input id="read_district" type="text" placeholder="Endereço" Icon={RoomIcon} labelText="Bairro" value={address.district} readOnly />
                            </Box>
                            <Box width="49%" mb={3}>
                                <Input id="city" type="text" placeholder="Cidade" Icon={ApartmentIcon} labelText="Cidade" value={address.city} readOnly />
                            </Box>
                            <Box width="49%" mb={3}>
                                <Input id="state" type="text" placeholder="Estado" Icon={HolidayVillageIcon} labelText="Estado" value={address.state} readOnly />
                            </Box>
                    </Box>
                </Box>
            </Box>
        </Modal>
    )
}