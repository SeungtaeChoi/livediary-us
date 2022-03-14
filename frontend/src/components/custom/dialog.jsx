import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { isBrowser } from 'react-device-detect';

const AlertDialog = (props) => {

    const { alertDialog, setAlertDialog } = props;
    const handleClose = () => setAlertDialog({ ...alertDialog, isOpen: false })
    const handleOk = () => {
        if(alertDialog.next){ alertDialog.next(); }
        handleClose();
    }

    return (
        <Dialog
            open={alertDialog.isOpen}
            onClose={(e, reason) => { if (reason !== 'backdropClick') { handleClose(); } }}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            PaperProps={isBrowser && { sx: { position: "fixed", top: "10%" } }}
            fullWidth={true}
            maxWidth="xs"
        >
            {alertDialog.title &&
                <DialogTitle id="alert-dialog-title" style={{ textAlign:"center" }}>
                    {`${alertDialog.title}`}
                </DialogTitle>
            }
            {alertDialog.description &&
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">{alertDialog.description}</DialogContentText>
                </DialogContent>
            }
            <DialogActions>
                <Button onClick={handleOk} autoFocus>확인</Button>
            </DialogActions>
        </Dialog>
    )
}

export { AlertDialog };