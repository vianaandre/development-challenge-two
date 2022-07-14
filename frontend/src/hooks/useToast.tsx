import { Alert, Snackbar, Typography } from '@mui/material'
import React, { createContext, useCallback, useContext, useState } from 'react'

interface ToastContextData {
  addToast(message: Omit<ToastMessage, 'id'>): void;
}

export interface ToastMessage {
  type: 'success' | 'error' | 'info';
  description: string;
  openToast: boolean;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<ToastMessage>({
    description: '',
    type: 'success',
    openToast: false
  });

  const addToast = useCallback(
    ({ type, description, openToast }: Omit<ToastMessage, 'id'>) => {

      setMessages({
        openToast,
        description,
        type
      });
    },
    [],
  );

  return (
    <ToastContext.Provider value={{ addToast }}>
        {children}
            <Snackbar 
                open={messages.openToast}
                autoHideDuration={100}
                message="asasasasasa"
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
            >
                <Alert severity={messages.type} >
                    <Typography variant='body1'>
                        {messages.description}
                    </Typography>
                </Alert>
            </Snackbar>
    </ToastContext.Provider>
  );
};

export function useToast(): ToastContextData {
  const context = useContext(ToastContext);
  return context;
}
