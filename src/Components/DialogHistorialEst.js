import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AdminHistIndiv from './AdminHistIndiv';
import { collection, getDocs, query } from 'firebase/firestore';
import { firestoreMiApp } from '../services/firebase-config';
import { Alert } from '@mui/material';

export default function DialogHistorialEst(props) {
    const [open, setOpen] = React.useState(false);
    const [historialVis, setHistorialVis] = React.useState([]);

    const [datosRecup, setDatosRecup] = React.useState(false);

    //const [scroll, setScroll] = React.useState('paper');

    const handleClickOpen = () => () => {
        setOpen(true);
        //setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }

            recuperarDatos(props.idUser);

        }
    }, [open]);

    const recuperarDatos = async (idUser) => {
        const q = query(collection(firestoreMiApp, "visitas-2023-1", idUser, "historial"));//.orderBy("fecha", "desc");
        const querySnapshot = await getDocs(q);
        let lista = [];
        querySnapshot.forEach((doc) => {
            lista.push(doc.data());
        });

        lista = lista.sort((a, b) => {
            if (a.horasalida < b.horasalida) {
                return -1;
            }
        });

        lista = lista.sort((a, b) => {
            if (a.fecha < b.fecha) {
                return -1;
            }
        });

        setHistorialVis(lista);
        setDatosRecup(true);
    }



    return (
        <div>
            <Button onClick={handleClickOpen('paper')}>Historial</Button>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={'paper'}
                maxWidth={false}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">Historial - {props.nombre}</DialogTitle>
                <DialogContent dividers={true}>

                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        {
                            datosRecup && historialVis.length === 0 ?
                                <Alert severity="info">{"El estudiante no cuenta con registros disponibles."}</Alert>
                                : null
                        }
                        <AdminHistIndiv listaDatos={historialVis} total={props.total} />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cerrar</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}