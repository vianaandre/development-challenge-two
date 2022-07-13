import { Box, Typography, Button } from "@mui/material"
import React from "react"
import { Link } from "react-router-dom"
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

export const Sidebar: React.FC = () => {
    return (
        <Box width={279} height="100%" left={0} paddingX={3} borderRight={1} borderColor="primary.light" >
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
                            Pacientes
                        </Typography>
                    </Button>
                </Link>
            </Box>
        </Box>
    )
}