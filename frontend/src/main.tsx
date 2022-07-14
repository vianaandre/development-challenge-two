import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from '@mui/material'
import { App } from './App'
import { theme } from './common/styles/themes'
import './common/styles/global.css'
import { ToastProvider } from './hooks/useToast'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
        <ToastProvider>
            <App />
        </ToastProvider>
    </ThemeProvider>
  </React.StrictMode>
)
