import * as React from 'react';
import { databaseMiApp } from '../services/firebase-config';
import { ref, set, update } from 'firebase/database';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Alert, IconButton, Snackbar } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DetalleVisitante from './DetalleVisitante';

export default function DialogConfirmarElim(props) {
    const [open, setOpen] = React.useState(false);
    //const [alertaExito, setAlertaExito] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (eliminar) => {
        setOpen(false);
        if (eliminar) {
            eliminarDatoCompletamente()
        }
    };

    const eliminarDatoCompletamente = () => {
        console.log("borrando.....................")
        const db = databaseMiApp;
        // A post entry.
        //const postData = {};

        let datoElim = props.user;
        datoElim.superUser = props.superUser.email;

        set(ref(db, 'Eliminados/' + datoElim.codigo), datoElim)
            .then(() => {
                // Data saved successfully!
            })
            .catch((error) => {
                // The write failed...
            });
            
        //props.eliminarUserSel(props.user);        
        set(ref(db, 'EnSala/' + props.user.codigo), null)
            .then(() => {
                // Data saved successfully!
            })
            .catch((error) => {
                // The write failed...
            });

    }

    return (
        <div>
            <IconButton edge="end" aria-label="delete" onClick={handleClickOpen}>
                <DeleteIcon />
            </IconButton>
            <Dialog
                open={open}
                onClose={() => handleClose(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"¿Esta seguro de eliminar su registro?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {props.user.codigo + " - " + props.user.nombre}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleClose(false)}>Cancelar</Button>
                    <Button onClick={() => handleClose(true)} autoFocus>
                        Eliminar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}


/*
<DetalleVisitante userSel = {props.user}/>
*/