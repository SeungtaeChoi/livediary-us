import React, { useEffect, useRef, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const CustomAlertDialog = ({ openState, setOpenState, title, description }) => {

    const handleClose = () => setOpenState(false);

    return (
        <Dialog
            open={openState}
            onClose={(e, reason)=> { if(reason !== 'backdropClick'){ handleClose(); } }}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {`${title}`}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">{description}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} autoFocus>확인</Button>
            </DialogActions>
        </Dialog>
    )
}

export default CustomAlertDialog;