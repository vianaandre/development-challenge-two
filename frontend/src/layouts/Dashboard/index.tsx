import { Box, useMediaQuery } from "@mui/material"
import React from "react"
import { Header } from '../../components/Header'
import { Sidebar } from '../../components/Sidebar'


export const LayoutDashboard: React.FC<{ children: any }> = ({ children }) => {
    const matches = useMediaQuery('(max-width: 576px)')

    return (
        <Box height="100vh" width="100vw" minHeight={600} display="flex" flexDirection="column">
            <Header />
            <Box flex={1} marginTop={7} display="flex" maxWidth="100vw" width="100vw" gap={matches ? 3 : 6} sx={{
                maxHeight: 'calc(100vh - 100px)'
            }} overflow="hidden" marginBottom={6} paddingLeft={matches ? 3 : 0}>
                <Sidebar />
                <Box flex={1} paddingRight={matches ? 2 : 6} height="100%">
                    {children}
                </Box>
            </Box>
        </Box>
    )
}