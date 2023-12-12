import React, { useState } from 'react'

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { collection, getDocs } from 'firebase/firestore';
import { firestoreMiApp } from '../services/firebase-config';

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

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

/*const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];*/

export default function AdminHistorialEst() {
    const [listaDatos, setListaDatos] = React.useState([]);

    React.useEffect(() => {
        recuperarDatos();
      }, [])
    
      const recuperarDatos = async () => {
    
        //let lista = [];
    
        const querySnapshot = await getDocs(collection(firestoreMiApp, "historial_visitas"));
        //setListaDatos(querySnapshot)
        let lista = [];
        
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          lista.push(doc.data());
        });
    
        setListaDatos(lista);
      }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Estudiante</StyledTableCell>
                        <StyledTableCell align="right">Codigo</StyledTableCell>
                        <StyledTableCell align="right">Carrera</StyledTableCell>
                        <StyledTableCell align="right">Hora Ingreso</StyledTableCell>
                        <StyledTableCell align="right">Hora Salida</StyledTableCell>
                        <StyledTableCell align="right">Total</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {listaDatos.map((row, index) => (
                        <StyledTableRow key={index+"-"+row.codigo}>
                            <StyledTableCell component="th" scope="row">
                                {row.nombre}
                            </StyledTableCell>
                            <StyledTableCell align="right">{row.codigo}</StyledTableCell>
                            <StyledTableCell align="right">{row.carrera}</StyledTableCell>
                            <StyledTableCell align="right">{row.horaentrada}</StyledTableCell>
                            <StyledTableCell align="right">{row.horasalida}</StyledTableCell>
                            <StyledTableCell align="right">{row.total}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

