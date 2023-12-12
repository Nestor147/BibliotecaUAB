import React, { useState } from 'react'

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { firestoreMiApp } from '../services/firebase-config';
import { Button } from '@mui/material';
import DialogHistorialEst from './DialogHistorialEst';
import ListaDinamicaEstudiantes from './ListaDinamicaEstudiantes';

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

export default function DocenteMisEst(props) {
    const [listaDatos, setListaDatos] = React.useState([]);
    let extension = "@uab.edu.bo";

    React.useEffect(() => {
        //recuperarDatos();
        iniciarEventosNuevo();
    }, [])

    const getCorreoId = (correo) => {
        let res = correo.replace(extension, "").replace(".", "");
        //"ivanflores"
        return res;
    }

    const recuperarDato = async (id)=>{
        let docRefItem = doc(firestoreMiApp, "visitas-2023-1", id);
        let docSnapItem = await getDoc(docRefItem);
        let valor =docSnapItem.data();
        //console.log(valor, "................additem")
        
        return valor;
    }

    const iniciarEventosNuevo = async ()=>{

        let lista = [];

        if(props.estudiantes){
            for await(const datoEst of props.estudiantes){
                let datoRecup = await recuperarDato(datoEst);
                if(datoRecup){
                    lista.push(datoRecup);
                }
                
            }
        }

        setListaDatos(lista);


    }
    /*
    const inicializarEventos = async () => {
        const docRef = doc(firestoreMiApp, "grupos", getCorreoId(props.user.email));
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data dcoente est:", docSnap.data());
            let valor = docSnap.data();

            let lista = []; 

            let listaDatoEst = Object.keys(valor);
            console.log(listaDatoEst)
            for await(const datoEst of listaDatoEst){
                let datoRecup = await recuperarDato(datoEst);
                if(datoRecup){
                    lista.push(datoRecup);
                }
                
            }

            //console.log(lista, "............finlista")
            setListaDatos(lista);

        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            //setTotalAcum("")
        }
    }

    */

    const recuperarDatos = async () => {

        //let lista = [];

        const querySnapshot = await getDocs(collection(firestoreMiApp, "visitas_estudiantes"));
        //setListaDatos(querySnapshot)
        let lista = [];

        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " =>-----------------------", doc.data());
            lista.push(doc.data());
        });

        setListaDatos(lista);
    }

    return (
        <ListaDinamicaEstudiantes lista = {listaDatos}/>
    );
}

