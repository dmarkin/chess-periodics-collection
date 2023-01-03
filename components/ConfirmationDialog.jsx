import * as React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';

const ConfirmationDialog = ({isOpen, item, confirmAction, cancelAction}) => {
    const handleConfirmation = () => {
        confirmAction(item);
    };

    const handleClose = () => {
        cancelAction();
    };

    return (
        <>
            <Dialog
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Do You really want to remove this Book?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        The {item?.type} called {item?.title} will be removed.
                        Are You sure?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleConfirmation} autoFocus>Remove</Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ConfirmationDialog;
