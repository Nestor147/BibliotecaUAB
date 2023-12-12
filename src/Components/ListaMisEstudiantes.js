import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ItemEnLinea from './ItemEnLinea';
import { Alert, Box } from '@mui/material';
import { databaseMiApp } from '../services/firebase-config';
import { onChildAdded, onChildChanged, onChildRemoved, ref } from 'firebase/database';

export default function ListaMisEstudiantes(props) {

  //let datosVisitantes = [{ codigo: 1, carrera:"Ing. en Ambiental", facultad:"Ingenieria", nombre: "Bruno Rosas", horaentrada: "16:37:22", fecha:"06/07/2023" }, {codigo: 0, carrera:"Ing. en Sistemas", facultad:"Ingenieria", nombre: "Juan Perez", horaentrada: "16:35:22", fecha:"06/07/2023" }];
  //const [datosVisitantes, setDatosVisitantes] = React.useState([]);
  //const [enSala, setEnSala] = React.useState(0);
  
  /*React.useEffect(() => {
    //inicializarEventos();
  }, [])*/
  
  return (
    <div>
      {
        props.user&&props.datosVisitantes?
          <Box>
            <Alert severity="info">{props.datosVisitantes.length} estudiante{props.datosVisitantes.length === 1 ? "" : "s"} en sala. </Alert>
            {
              Object.keys(props.datosVisitantes).map((value, index) => {
                return (
                  <ItemEnLinea indice = {index} ident={value} user={props.datosVisitantes[value]} />
                );
              })}
          </Box>

          : "..."
      }
    </div>
  );
}