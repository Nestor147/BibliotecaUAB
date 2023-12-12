import React from 'react'

import { Alert, Box, Button, Card, Typography } from '@mui/material'
import { useState } from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import WorkIcon from '@mui/icons-material/Work';
import BadgeIcon from '@mui/icons-material/Badge';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import { collection, doc, getDoc, getDocs, query } from 'firebase/firestore';
import { firestoreMiApp } from '../services/firebase-config';
import EstudianteEstadisticas from './EstudianteEstadisticas';

export default function EstudianteContenido(props) {
    const [userSel, setUserSel] = useState(null);
    const [mensajeAlert, setMensajeAlert] =  useState("Cargando...");

    React.useEffect(() => {
        recuperarDatos(props.idEst);
    }, [props.idEst])

    const recuperarDatos = async (idUser) => {
        if (idUser) {
            const docRef = doc(firestoreMiApp, "visitas-2023-1", idUser);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                let valor = docSnap.data();
                setUserSel(valor);
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
                setMensajeAlert("Usuario no encontrado");
            }
        }

    }

    return (

        <Box>
            {
                userSel ?
                    <Box>
                        <Alert severity="success">
                            <strong>{userSel.nombre}</strong> usuario activo
                        </Alert>
                        <Card variant="outlined" sx={{ m: 2, p: 2 }}>
                            <List dense={true} sx={{ width: '100%', bgcolor: 'background.paper' }}>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <BadgeIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Codigo" secondary={userSel.codigo} />
                                </ListItem>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <WorkIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Carrera" secondary={userSel.carrera} />
                                </ListItem>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <HourglassTopIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Total acumulado" secondary={userSel.totalhoras} />
                                </ListItem>
                                <ListItem>
                                    <EstudianteEstadisticas idEst = {userSel.codigo} total = {userSel.totalhoras}/>
                                </ListItem>
                            </List>
                        </Card>

                    </Box>
                    :
                    <Alert severity="warning">{mensajeAlert}</Alert>
            }
        </Box>
    )
}

/*<Alert severity="info">Historial en desarrollo...</Alert>*/