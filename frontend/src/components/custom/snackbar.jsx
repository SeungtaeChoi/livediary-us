import React from 'react';
import { Snackbar, Alert } from '@mui/material';

const AlertSnackbar = (props) => {
    const { snackbar, setSnackbar } = props;
    const handleClose = () => setSnackbar({ ...snackbar, isOpen: false })
    const { isOpen, severity, message, vertical, horizontal } = snackbar;

    return (
        <>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={isOpen}
                autoHideDuration={2000}
                onClose={handleClose}
                key={vertical + horizontal}
            >
                <Alert elevation={3} onClose={handleClose} severity={severity} sx={{ width: '100%' }}>{message}</Alert>
            </Snackbar>
        </>
    )
};

export { AlertSnackbar };