

import React, { useEffect, useState } from 'react'
import { ref, query, limitToLast, onValue, equalTo } from "firebase/database";
import { databaseMiApp } from '../services/firebase-config';
import AdminHistIndiv from './AdminHistIndiv';
import { Line } from 'react-chartjs-2';
import UT from './UT';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import RangoFechas from './RangoFechas';

export default function EstudianteEstadisticas(props) {
    const [datos, setDatos] = useState([]);
    const opciones = ["Mes"];

    let inicialLine = {
        labels: [],
        datasets: [{
            label: '...',
            data: [],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    };
    const [datosLine, setDatosLine] = useState(inicialLine);

    useEffect(() => {
        recuperarDatos(props.idEst)
    }, [props.idEst])

    const recuperarDatos = (id) => {
        const db = databaseMiApp;
        const recentPostsRef = ref(db, 'historial-2023-1/' + UT.getMesActual() + '/' + id);
        onValue(recentPostsRef, (snapshot) => {
            let lista = []
            snapshot.forEach((childSnapshot) => {
                //const childKey = childSnapshot.key;
                const childData = childSnapshot.val();
                // ...
                console.log("datro", id, childData);
                lista.push(childData);
            });

            generarDatosLine(lista);
            setDatos(lista);
        }, {
            onlyOnce: false
        });
    }

    const generarDatosLine = (datos) => {
        let inicialLine = {
            labels: UT.getListaDias(datos, "Mayo"),
            datasets: [{
                label: 'Mayo 2023',
                data: UT.getListaHoras(datos),
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        };

        setDatosLine(inicialLine);
    }

    return (
        <div>
            <FormControl sx={{ minWidth: 120 }}>
                <InputLabel id="demo-simple-select-label-buscarpor">Historial:</InputLabel>
                <Select
                    labelId="demo-simple-select-label-buscarpor"
                    id="demo-simple-select"
                    defaultValue="Mes"
                    label="Historial:"
                    onChange={(e) => {}}
                >
                    {
                        opciones.map((item, index) => (
                            <MenuItem value={item}>{item}</MenuItem>
                        ))
                    }
                </Select>
            </FormControl>

            <Line data={datosLine} />
            <AdminHistIndiv listaDatos={datos} total={props.total} />
        </div>
    )
}

//<RangoFechas/>