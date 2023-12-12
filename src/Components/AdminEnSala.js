import { Alert, Box, Grid } from '@mui/material'
import React, { useState } from 'react'
import DetalleVisitante from './DetalleVisitante'
import ListaEnLinea from './ListaEnLinea'
import { databaseMiApp } from '../services/firebase-config';
import { onChildAdded, onChildChanged, onChildRemoved, ref } from 'firebase/database';
import { useParams } from 'react-router-dom';

export default function AdminEnSala(props) {

  //const [userSel, setUserSel] = useState(null);
  const [datosVisitantes, setDatosVisitantes] = useState([]);

  const {id} = useParams();

  //const [enSala, setEnSala] = React.useState(0);

  React.useEffect(() => {
    inicializarEventos();
  }, [])

  const inicializarEventos = () => {
    const db = databaseMiApp;
    const commentsRef = ref(db, 'EnSala');
    onChildAdded(commentsRef, (data) => {
      //addCommentElement(postElement, data.key, data.val().text, data.val().author);
      setDatosVisitantes(listaAnterior => {
        let nuevo = data.val();
        let repetido = false;
        for (let i = 0; i < listaAnterior.length; i++) {
          if (listaAnterior[i].codigo === nuevo.codigo) {
            repetido = true;
          }
        }
        let listaNueva;
        if (!repetido) {
          listaNueva = [...listaAnterior, nuevo];
        } else {
          listaNueva = listaAnterior;
        }

        //setEnSala(listaNueva.length);

        return listaNueva;
      });

    });

    onChildChanged(commentsRef, (data) => {
      //setCommentValues(postElement, data.key, data.val().text, data.val().author);
    });

    onChildRemoved(commentsRef, (data) => {
      //deleteComment(postElement, data.key);
      let dato = data.val();
      //console.log("eliminado........................................", dato, userSel);
      //console.log(porps.userSel);

      /*if(dato.codigo===userSel.codigo){
        setUserSel(null);
      }*/

      /*if(props.userSel!=null&&props.userSel.codigo===dato.codigo){
        props.setUserSel(null);
      }*/

      setDatosVisitantes(listaAnterior => {
        /*if(dato.codigo===props.userSel.codigo){
          props.setUserSel(null);
        }*/
        //console.log(listaAnterior);
        let listaNueva = listaAnterior.filter(itemDato => itemDato.codigo !== dato.codigo);
        //setEnSala(listaNueva.length);
        return listaNueva;
      })
    });
  }
  //const [enSala, setEnSala] = useState(0);
  return (
    <Box>
      <Grid container spacing={1}>
        <Grid item xs={12} md={8}>
          <DetalleVisitante idUserView={id} datosVisitantes={datosVisitantes}/>
        </Grid>
        <Grid item xs={12} md={4}>
          <ListaEnLinea tipoUser = {props.tipoUser} datosVisitantes={datosVisitantes} user={props.user} /*setEnSala={setEnSala}*/ />
        </Grid>
      </Grid>
    </Box>
  )
}