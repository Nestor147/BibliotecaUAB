import { Alert, Box, Button, Chip, ListItem, Paper, Snackbar, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { databaseMiApp } from '../services/firebase-config';
import { onValue, ref, set } from 'firebase/database';
import UT from './UT';

export default function AdminsRecepcion() {

    const [listaCorreos, setListaCorreos] = useState([]);
    //const [listaNueva, setListaNueva] = useState([]);
    const [textoCorr, setTextoCorr] = useState(null);

    useEffect(() => {
        recuperarCorreos();
    }, [])

    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const recuperarCorreos = () => {
        const db = databaseMiApp;
        const docentesRef = ref(db, 'recepcion');

        onValue(docentesRef, (snapshot) => {
            if (snapshot.exists()) {
                let lista = snapshot.val();//[];
                /*snapshot.forEach((childSnapshot) => {
                    const childKey = childSnapshot.key;
                    const childData = childSnapshot.val();
                    lista.push(childData);
                    // ...
                });*/
                setListaCorreos(lista);
            }
        }, {
            onlyOnce: false
        });
    }

    const addListaCorreosBD = () => {
        set(ref(databaseMiApp, 'recepcion'), listaCorreos)
            .then(() => {
                // Data saved successfully!
                handleClick();
            })
            .catch((error) => {
                // The write failed...
            });
    }

    const elimCarreraList = (carrera) => {
        const nuevaLista = listaCorreos.filter((item) => item !== carrera)
        setListaCorreos(nuevaLista);
    }
    const addCarreraList = (carrera) => {
        if (!listaCorreos.includes(carrera)) {
            setListaCorreos(listaAnterior => {
                let nuevaLista = [...listaAnterior, carrera];
                return nuevaLista;
            })
        }
    }

    const clickBotonAgregar = () => {
        if (textoCorr) {
            if (textoCorr.includes("@")) {//UT.extension
                addCarreraList(textoCorr);
            }
        }
        setTextoCorr("");
    }

    return (
        <Box>
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Agregar"
                type="text"
                fullWidth
                variant="standard"
                value={textoCorr}
                onChange={(e) => setTextoCorr(e.target.value)}
            />

            <Button onClick={() => { clickBotonAgregar() }}>Agregar</Button>
            <Paper
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    listStyle: 'none',
                    p: 0.5,
                    m: 0,
                }}
                component="ul"
            >
                {listaCorreos.map((data) => {
                    return (
                        <ListItem key={data}>
                            <Chip
                                label={data}
                                onDelete={() => elimCarreraList(data)}
                            />
                        </ListItem>
                    );
                })}
            </Paper>

            <Button sx={{ my: 2 }} variant='contained' onClick={() => { addListaCorreosBD() }} color="success">Guardar Cambios</Button>

            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Cambios guardados correctamente
                </Alert>
            </Snackbar>

        </Box>
    )
}
