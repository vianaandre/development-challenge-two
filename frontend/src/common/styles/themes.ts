import { createTheme } from '@mui/material'

export const theme = createTheme({
    palette: {
        primary: {
            main: '#0A39DD',
            dark: '#282828',
            light: '#EEF2F7'
        },
        secondary: {
            main: '#E7E7E7',
            dark: '#808080',
            light: '#FCFDFC',
            
        }
    },
    typography: {
        fontFamily: [
            'Rubik',
            'Roboto',
            'sans-serif'
        ].join(','),
        h1: {
            fontSize: 36,
        },
        h2: {
            fontSize: 24
        },
        h4: {
            fontSize: 18
        },
        h6: {
            fontSize: 16
        },
        body1: {
            fontSize: 14
        },
        body2: {
            fontSize: 12
        }
    }
})