import React from 'react';
import { Outlet } from 'react-router-dom';
import { AlertDialog } from './components/custom/dialog';
import { ConfirmDialog } from './components/custom/dialog';
import { AlertSnackbar } from './components/custom/snackbar';

const Common = ({ alertDialog, setAlertDialog, confirmDialog, setConfirmDialog, snackbar, setSnackbar }) => {

    return (
        <>
            <AlertDialog alertDialog={alertDialog} setAlertDialog={setAlertDialog} />
            <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
            <AlertSnackbar snackbar={snackbar} setSnackbar={setSnackbar} />
            <Outlet />
        </>
    );
}

export default Common;