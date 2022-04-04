import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { isBrowser } from 'react-device-detect';

const AlertDialog = (props) => {

    const { alertDialog, setAlertDialog } = props;
    const handleClose = () => setAlertDialog({ ...alertDialog, isOpen: false })
    const handleOk = () => {
        if (alertDialog.next) { alertDialog.next(); }
        handleClose();
    }

    return (
        <Dialog
            open={alertDialog.isOpen}
            onClose={(e, reason) => { if (reason !== 'backdropClick') { handleClose(); } }}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            PaperProps={isBrowser ? { sx: { position: "fixed", top: "10%" } } : {}}
            fullWidth={true}
            maxWidth="xs"
        >
            {alertDialog.title &&
                <DialogTitle id="alert-dialog-title" style={{ textAlign: "center" }}>
                    {`${alertDialog.title}`}
                </DialogTitle>
            }
            {alertDialog.description &&
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">{alertDialog.description}</DialogContentText>
                </DialogContent>
            }
            <DialogActions>
                <Button onClick={handleOk} autoFocus variant="contained" sx={{ width: "100%" }}>확인</Button>
            </DialogActions>
        </Dialog>
    )
}

const ConfirmDialog = (props) => {

    const { confirmDialog, setConfirmDialog } = props;
    const handleClose = () => {
        if (confirmDialog.cancel) { confirmDialog.cancel(); }
        setConfirmDialog({ ...confirmDialog, isOpen: false })
    }
    const handleOk = () => {
        if (confirmDialog.ok) { confirmDialog.ok(); }
        setConfirmDialog({ ...confirmDialog, isOpen: false })
    }

    return (
        <Dialog
            open={confirmDialog.isOpen}
            onClose={(e, reason) => { if (reason !== 'backdropClick') { handleClose(); } }}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            PaperProps={isBrowser ? { sx: { position: "fixed", top: "10%" } } : {}}
            fullWidth={true}
            maxWidth="xs"
        >
            {confirmDialog.title &&
                <DialogTitle id="alert-dialog-title" style={{ textAlign: "center" }}>
                    {`${confirmDialog.title}`}
                </DialogTitle>
            }
            {confirmDialog.description &&
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">{confirmDialog.description}</DialogContentText>
                </DialogContent>
            }
            <DialogActions>
                {/* <div style={{ width: "100%" }}> */}
                    <Button onClick={handleClose} autoFocus variant="text" sx={{ width: "100%" }}>취소</Button>
                    <Button onClick={handleOk} autoFocus variant="contained" sx={{ width: "100%" }}>확인</Button>
                {/* </div> */}
            </DialogActions>
        </Dialog>
    )
}

export { AlertDialog, ConfirmDialog };