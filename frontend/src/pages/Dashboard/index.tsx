import { Box } from "@mui/material"
import React from "react"
import { Header } from '../../components/Header'
import { Sidebar } from '../../components/Sidebar'


export const Dashboard: React.FC = () => {
    return (
        <Box height="100vh" width="100vw" minHeight={600} display="flex" flexDirection="column">
            <Header />
            <Box flex={1} marginTop={7}>
                <Sidebar />
            </Box>
        </Box>
    )
}