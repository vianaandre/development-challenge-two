import { Box, Typography } from "@mui/material"
import React from "react"
import { Link } from "react-router-dom"
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { Button } from '../Button'

export const Sidebar: React.FC = () => {
    return (
        <Box width={216} height="100%" left={0} paddingX={3}>
            <Typography variant="body1" textTransform="uppercase" color="secondary.dark">
                Menu
            </Typography>
            <Box>
                <Link to="/">
                    <Button title="Pacientes">
                        <PeopleAltIcon />
                    </Button>
                </Link>
            </Box>
        </Box>
    )
}