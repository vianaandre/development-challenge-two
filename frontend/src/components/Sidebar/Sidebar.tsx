import { Box, Typography, Button, useMediaQuery, IconButton } from "@mui/material"
import React, { useState } from "react"
import { Link } from "react-router-dom"
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import MenuIcon from '@mui/icons-material/Menu';

export const Sidebar: React.FC = () => {
    const matches = useMediaQuery('(max-width: 1000px)')
    const matchesMobile = useMediaQuery('(max-width: 576px)')
    const [ isOpenMenuSidebar, setIsOpenMenuSidebar ] = useState(false)

    return (
        <Box width={matches ? 110 : 279} height="100%" left={0} paddingX={3} borderRight={matchesMobile ? 0 : 1} borderColor="primary.light" position={matchesMobile ? 'fixed' : 'relative'} sx={{
            left: matchesMobile ? (isOpenMenuSidebar ? 0 : -100) : 0  
        }} bgcolor="#FFF" zIndex={2}>
            {matchesMobile && (
                <Box position="fixed" sx={{
                    left: 14,
                    top: 110
                }} >
                    <IconButton onClick={() => setIsOpenMenuSidebar(!isOpenMenuSidebar)}>
                        <MenuIcon />
                    </IconButton>
                </Box>
            )}
            <Typography variant="body1" textTransform="uppercase" color="secondary.dark">
                Menu
            </Typography>
            <Box mt={3}>
                <Link to="/">
                    <Button variant="text" sx={{
                        borderRadius: 2,
                        width: '100%',
                        backgroundColor: '#F5F7FF'
                    }}>
                        <Typography variant="body1" color="primary.main" display="flex" alignItems="center" width="100%" gap={2} height={48} paddingLeft={1.5} textTransform="capitalize">
                            <PeopleAltIcon />
                            {!matches && 'Pacientes'}
                        </Typography>
                    </Button>
                </Link>
            </Box>
        </Box>
    )
}