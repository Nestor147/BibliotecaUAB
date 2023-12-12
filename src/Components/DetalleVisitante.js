import { Alert, Box, Button, Card, Typography } from '@mui/material'
import React, { useState } from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import BadgeIcon from '@mui/icons-material/Badge';
import BusinessIcon from '@mui/icons-material/Business';
import PersonIcon from '@mui/icons-material/Person';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import AdminHistIndiv from './AdminHistIndiv';
import { collection, doc, getDoc, getDocs, query } from 'firebase/firestore';
import { firestoreMiApp } from '../services/firebase-config';
import { Link, Navigate } from 'react-router-dom';
import DialogHistorialEst from './DialogHistorialEst';

export default function DetalleVisitante(props) {

    const [userSel, setUserSel] = useState(null);
    const [totalAcum, setTotalAcum] = useState("");

    //const [historialVis, setHistorialVis] = useState([]);
    //const navegar = Navigate();

    React.useEffect(() => {
        //if(props.userSel){
        recuperarDatos(props.idUserView);
        //}
    }, [props.idUserView])

    const recuperarDatos = async (idUser) => {
        console.log("id........................................", idUser);
        let dato = enlista();

        //console.log("--------------------------", codigo)
        if (idUser && enlista()) {
            setUserSel(dato);
            const docRef = doc(firestoreMiApp, "visitas-2023-1", idUser);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                let valor = docSnap.data();
                setTotalAcum(valor.totalhoras);
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
                setTotalAcum("")
            }

            /*
            const q = query(collection(firestoreMiApp, "visitas_estudiantes", idUser,"historial"));
            const querySnapshot = await getDocs(q);

            let lista = [];

            querySnapshot.forEach((doc) => {
                lista.push(doc.data());
            });
            setHistorialVis(lista);

            */
        }

    }

const enlista = () => {
    let res = null;
    if (props.idUserView) {
        props.datosVisitantes.forEach(element => {
            if (element.codigo === props.idUserView) {
                res = element;
            }
        });
    }
    return res;
}


return (

    <Box>
        {
            userSel ?
                <Box>
                    <Alert severity="success">
                        <strong>{userSel.nombre}</strong> en sala ahora mismo.
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
                                <ListItemText primary="Total acumulado" secondary={totalAcum} />
                            </ListItem>
                            <ListItem>
                                <Button component={Link} to={"/estudiante/"+userSel.codigo}>Historial</Button>
                            </ListItem>
                        </List>
                    </Card>

                </Box>
                :
                <Alert severity="warning">Selecciona un Usuario</Alert>
        }

    </Box>
)
}

//<DialogHistorialEst idUser = {userSel.codigo} nombre={userSel.nombre} total={totalAcum}/>

//<AdminHistIndiv listaDatos = {historialVis} />