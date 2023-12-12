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
import { Box, Button } from '@mui/material';
import DialogHistorialEst from './DialogHistorialEst';
import { XLSX } from 'sheetjs-style'
import ExportarExcel from './ExportarExcel';
import TortaCarreras from './TortaCarreras';
import PieChart from './PieCarreras';
import DialogEstadisticas from './DialogEstadisticas';
import HeightIcon from '@mui/icons-material/Height';
import ListaDinamicaEstudiantes from './ListaDinamicaEstudiantes';
import UT from './UT';

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

export default function AdminHTotalEst() {
    const [listaDatos, setListaDatos] = React.useState([]);
    const [orden, setOrden] = useState(true);

    React.useEffect(() => {
        recuperarDatos();
    }, [])

    const recuperarDatos = async () => {

        //let lista = [];

        const querySnapshot = await getDocs(collection(firestoreMiApp, UT.estudiantesSemestreActual));
        //setListaDatos(querySnapshot)
        let lista = [];

        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " =>-----------------------", doc.data());
            lista.push(doc.data());
        });

        setListaDatos(lista);
    }

    const ordenarPorNombre=()=>{
        if(orden){
            setListaDatos(listaAnt => {
                let lista = listaAnt.sort((a, b) => {
                    if (a.nombre < b.nombre) {
                      return -1;
                    }
                  });

                  return lista;
            });
        }else{
            setListaDatos(listaAnt => {
                let lista = listaAnt.sort((a, b) => {
                    if (a.nombre > b.nombre) {
                      return -1;
                    }
                  });
                  return lista;
            });
        }

        setOrden(ordenAnt=>{
            return !ordenAnt
        })
    }

    const ordenarPorHoras=()=>{
        if(orden){
            setListaDatos(listaAnt => {
                let lista = listaAnt.sort((a, b) => {
                    if (a.totalhoras < b.totalhoras) {
                      return -1;
                    }
                  });

                  return lista;
            });
        }else{
            setListaDatos(listaAnt => {
                let lista = listaAnt.sort((a, b) => {
                    if (a.totalhoras > b.totalhoras) {
                      return -1;
                    }
                  });
                  return lista;
            });
        }

        setOrden(ordenAnt=>{
            return !ordenAnt
        })
    }

    const ordenarPorCarrera=()=>{
        if(orden){
            setListaDatos(listaAnt => {
                let lista = listaAnt.sort((a, b) => {
                    if (a.carrera < b.carrera) {
                      return -1;
                    }
                  });

                  return lista;
            });
        }else{
            setListaDatos(listaAnt => {
                let lista = listaAnt.sort((a, b) => {
                    if (a.carrera > b.carrera) {
                      return -1;
                    }
                  });
                  return lista;
            });
        }

        setOrden(ordenAnt=>{
            return !ordenAnt
        })
    }

    return (
        <Box>
            <ListaDinamicaEstudiantes lista = {listaDatos}/>
        </Box>
    );
}

