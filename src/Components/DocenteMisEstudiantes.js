import { Alert, Box, Grid } from '@mui/material'
import React, { useState } from 'react'
import DetalleVisitante from './DetalleVisitante'
import ListaEnLinea from './ListaEnLinea'
import { databaseMiApp, firestoreMiApp } from '../services/firebase-config';
import { onChildAdded, onChildChanged, onChildRemoved, ref } from 'firebase/database';
import { useParams } from 'react-router-dom';
import { collection, doc, getDoc, getDocs, query } from 'firebase/firestore';
import ListaMisEstudiantes from './ListaMisEstudiantes';

export default function AdminDocenteMisEstudiantes(props) {

  //const [userSel, setUserSel] = useState(null);
  const [datosVisitantes, setDatosVisitantes] = useState(null);
  const { id } = useParams();
  let extension = "@uab.edu.bo";
  //let extension = "@gmail.com";
  //const [enSala, setEnSala] = React.useState(0);

  React.useEffect(() => {
    inicializarEventos();
  }, [])

  const getCorreoId = (correo) => {
    let res = correo.replace(extension, "").replace(".", "");
    return "ivanflores";
  }

  const inicializarEventos = async () => {
    const docRef = doc(firestoreMiApp, "grupos", getCorreoId(props.user.email));
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data dcoente est:", docSnap.data());
      let valor = docSnap.data();
      /*Object.keys(valor).forEach(function(k, v){
        console.log(k + ' - ' + valor[k]);
    });*/
      setDatosVisitantes(valor);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
      //setTotalAcum("")
    }

    /*const q = query(collection(firestoreMiApp, "grupos", getCorreoId(props.user.email)));
    const querySnapshot = await getDocs(q);

    let lista = [];

    querySnapshot.forEach((doc) => {
      lista.push(doc.data());
    });

    console.log("Estudiantes DOCS_____________", lista);
    */
    //setHistorialVis(lista);
  }
  //const [enSala, setEnSala] = useState(0);
  return (
    <Box>
      <Grid container spacing={1}>
        <Grid item xs={12} md={8}>
          <DetalleVisitante idUserView={id} datosVisitantes={datosVisitantes} />
        </Grid>
        <Grid item xs={12} md={4}>
          <ListaMisEstudiantes datosVisitantes={datosVisitantes} user={props.user} /*setEnSala={setEnSala}*/ />
        </Grid>
      </Grid>
    </Box>
  )
}