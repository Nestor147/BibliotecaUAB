import React, { useEffect, useState } from 'react'
import MenuDinSimple from './MenuDinSimple'
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, databaseMiApp } from '../services/firebase-config';
import { useNavigate, useParams } from 'react-router-dom';
import UT from './UT';
import { Alert, AlertTitle, Box, Button, Card } from '@mui/material';
import { onValue, ref } from 'firebase/database';

export default function Recepcion(props) {
    const [user, setUser] = useState(null);
    const navegar = useNavigate();
    const { id } = useParams();

    const [listaCorreos, setListaCorreos] = useState([]);

    useEffect(() => {
        /*setUser(auth.currentUser);
        verificarAdmin(auth.currentUser);*/

        onAuthStateChanged(auth, (user) => {
            setUser(user);
            //setAuthUser(auth);
            verificarAdmin(user);
        });

    }, [])


    function verificarAdmin(user) {
        if (user) {
            /*if (UT.correosRecepcion.includes(user.email)) {
                console.log("Logueado");
            } else {
                alert("Administrador no encontrado, intenta con otra cuenta");
                cerrarSesion();
                //console.log("errortipo2", user, extension)
            }*/

            const db = databaseMiApp;
            const docentesRef = ref(db, 'recepcion');

            onValue(docentesRef, (snapshot) => {
                if (snapshot.exists()) {
                    let lista = snapshot.val();
                    //setListaCorreos(lista);
                    if (lista.includes(user.email)) {
                        console.log("Logueado");
                    } else {
                        alert("Recepcionista no encontrado, intenta con otra cuenta");
                        cerrarSesion();
                    }
                }
            }, {
                onlyOnce: true
            });

        } else {
            navegar("/");
        }
    }

    function cerrarSesion() {
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        });
    }

    return (
        <Box>
            <MenuDinSimple titulo="Control Recepción" />
            <Card sx={{ p: 2 }}>
                {props.contenido}
            </Card>
            <Button variant='contained' sx={{ m: 2 }} onClick={() => cerrarSesion()}>Cerrar Sesión</Button>
        </Box>
    )
}
/*
{user ?
                <Alert sx={{ m: 2 }} severity="info">
                    <AlertTitle>Bienvenido al sistema de control</AlertTitle>
                    {user.displayName} — <strong>{user.email}</strong>
                </Alert>
                : null}
*/