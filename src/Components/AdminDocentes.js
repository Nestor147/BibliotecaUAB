import React from 'react'

import { Alert, Box, Button, Fab, Grid, Paper, Table, TableBody, TableContainer, TableHead, TableRow, styled } from '@mui/material'
import { useState } from 'react'
import { databaseMiApp } from '../services/firebase-config';
import { onChildAdded, onChildChanged, onChildRemoved, onValue, ref, set } from 'firebase/database';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import AddIcon from '@mui/icons-material/Add';
import DialogCrearDocente from './DialogCrearDocente';
import DialogEliminar from './DialogEliminar';

export default function AdminDocentes(props) {

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

  const [listaDocentes, setListaDocentes] = useState([]);

  React.useEffect(() => {
    inicializarEventos();
  }, [])

  const addListaDoc = (objeto) =>{
    set(ref(databaseMiApp, 'docentes/' + objeto.ID), objeto)
      .then(() => {
        // Data saved successfully!
      })
      .catch((error) => {
        // The write failed...
      });
  }

  const removeListaDoc = (ID) =>{
    set(ref(databaseMiApp, 'docentes/' + ID), null)
      .then(() => {
        // Data saved successfully!
      })
      .catch((error) => {
        // The write failed...
      });
  }

  const inicializarEventos = () => {
    const db = databaseMiApp;
    const docentesRef = ref(db, 'docentes');

    onValue(docentesRef, (snapshot) => {
      let lista = [];
      snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        const childData = childSnapshot.val();
        lista.push(childData);
        // ...
      });
      setListaDocentes(lista);
    }, {
      onlyOnce: false
    });

  }

  return (
    <div>
      <DialogCrearDocente solover = {props.solover} addListaDoc = {addListaDoc} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
            <StyledTableCell align="right">N°</StyledTableCell>
              <StyledTableCell>Nombre</StyledTableCell>
              <StyledTableCell align="right">Correo</StyledTableCell>
              <StyledTableCell align="right">Carrera</StyledTableCell>
              <StyledTableCell align="right">Facultad</StyledTableCell>
              <StyledTableCell align="right">Acción</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listaDocentes.map((row, index) => (
              <StyledTableRow key={index + "-" + row.codigo}>
                <StyledTableCell align="right">{index+1}</StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {row.NOMBRE}
                </StyledTableCell>
                <StyledTableCell align="right">{row.CORREO}</StyledTableCell>
                <StyledTableCell align="right">{row.CARRERA}</StyledTableCell>
                <StyledTableCell align="right">{row.FACULTAD}</StyledTableCell>
                <StyledTableCell align="right"><DialogEliminar solover = {props.solover} eliminar={removeListaDoc} itemid={row.ID} titulo="¿Esta seguro de eliminar el docente?" texto={"Esta acción no se puede deshacer, se eliminará al docente: " + row.NOMBRE} /></StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
