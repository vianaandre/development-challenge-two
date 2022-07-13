import { Box } from "@mui/material"
import React from "react"
import { Header } from '../../components/Header'
import { Sidebar } from '../../components/Sidebar'


export const LayoutDashboard: React.FC<{ children: any }> = ({ children }) => {
    return (
        <Box height="100vh" width="100vw" minHeight={600} display="flex" flexDirection="column">
            <Header />
            <Box flex={1} marginTop={7} display="flex" maxWidth="100vw" width="100vw" gap={6}>
                <Sidebar />
                <Box flex={1} paddingRight={6}>
                    {children}
                </Box>
            </Box>
        </Box>
    )
}