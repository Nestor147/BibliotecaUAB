import { Alert, Avatar, Box, Button, Card, Grid, List, ListItem, ListItemAvatar, ListItemText, Snackbar, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import BadgeIcon from '@mui/icons-material/Badge';
import BusinessIcon from '@mui/icons-material/Business';
import PersonIcon from '@mui/icons-material/Person';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import PerfilDocenteMaterias from './PerfilDocenteMaterias';
import UT from './UT';
import { child, get, ref, set } from 'firebase/database';
import { databaseMiApp } from '../services/firebase-config';

export default function PerfilDocente(props) {


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

    const [datos, setDatos] = useState(null);
    const [contNueva, setContNueva] = useState(null);

    let extension = "@uab.edu.bo";

    useEffect(() => {
        verificarDocente();
    }, [props.user]);

    function verificarDocente() {
        if (props.user) {
            if (props.user.email.includes(extension)) {
                let correoFormat = UT.getidCorreo(props.user.email);
                const dbRef = ref(databaseMiApp);
                get(child(dbRef, `docentes/${correoFormat}`)).then((snapshot) => {
                    if (snapshot.exists()) {
                        //console.log(snapshot.val());
                        let valor = snapshot.val();
                        setDatos(valor);
                        setContNueva(valor.CODIGO);
                    }
                }).catch((error) => {
                    console.error("ffffffffffffffff", error);
                });
            }
        }
    }

    const cambiarContra = () => {
        if (props.user) {
            if (contNueva) {
                set(ref(databaseMiApp, 'docentes/' + UT.getidCorreo(props.user.email) + "/CODIGO"), contNueva)
                    .then(() => {
                        handleClick();
                        verificarDocente();
                    })
                    .catch((error) => {
                        // The write failed...
                    });
            }
        }
    }

    return (
        <div>
            {datos ?
                <Box sx={{ m: 2, p: 2, display: "flex", flexDirection: "column" }}>
                    <TextField
                        id="outlined-read-only-input"
                        label="Nombre"
                        defaultValue={datos.NOMBRE}
                        InputProps={{
                            readOnly: true,
                        }}
                        sx={{ m: 1 }}
                    />

                    <TextField
                        id="outlined-read-only-input"
                        label="Correo"
                        defaultValue={datos.CORREO}
                        InputProps={{
                            readOnly: true,
                        }}
                        sx={{ m: 1 }}
                    />
                    <TextField
                        id="outlined-read-only-input"
                        label="Facultad"
                        defaultValue={datos.FACULTAD}
                        InputProps={{
                            readOnly: true,
                        }}
                        sx={{ m: 1 }}
                    />
                    <TextField
                        id="outlined-read-only-input"
                        label="Carrera"
                        defaultValue={datos.CARRERA}
                        InputProps={{
                            readOnly: true,
                        }}
                        sx={{ m: 1 }}
                    />

                    <Grid container spacing={3} sx={{ display: 'flex', alignItems: 'center' }}>
                        <Grid item xs>
                            <TextField
                                id="outlined-read-only-input"
                                label="Contraseña App Móvil"
                                fullWidth
                                value={contNueva}
                                type='password'
                                onChange={(e) => setContNueva(e.target.value)}
                                sx={{ m: 1 }}
                                inputProps={{
                                    maxLength: 16
                                }}
                            />
                        </Grid>

                        <Grid item xs="auto">
                            <Button onClick={()=>cambiarContra()} disabled={contNueva === datos.CODIGO} color="success" variant='contained'>Guardar Cambios</Button>
                        </Grid>
                    </Grid>
                    <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                            Cambios guardados correctamente.
                        </Alert>
                    </Snackbar>
                </Box>
                : "Usted no es docente."
            }
        </div>
    )
}


// <PerfilDocenteMaterias user={props.user}/>