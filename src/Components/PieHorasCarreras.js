// ./components/PieChart.js
import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { Bar, Pie } from "react-chartjs-2";
import { Alert, Box } from "@mui/material";

export default function PieHorasCarreras(props) {

  const [carreras, setCarreras] = useState([]);
  const [sumCarr, setSumCarr] = useState([]);

  useEffect(() => {
    recuperarDatos(props.listaDatos)
  }, [props.listaDatos])

  const recuperarDatos = (datos) => {
    console.log("datos,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,, ", datos.length);
    let listaCarr = [];
    let listaNum = [];

    for (let i = 0; i < datos.length; i++) {
      let dato = datos[i].carrera;
      let nuevo = { "carrera": dato, "total": contarCarrera(dato, datos) }

      if (!listaCarr.includes(nuevo.carrera)) {
        listaCarr.push(nuevo.carrera);
        listaNum.push(nuevo.total);
      }

    }

    setCarreras(listaCarr);
    setSumCarr(listaNum);

  }

  const contarCarrera = (item, datos) => {
    let totalHoras = 0;
    for (let i = 0; i < datos.length; i++) {
      let dato = datos[i].carrera;
      if (dato === item) {
        const tiempo = datos[i].totalhoras.split(':');
        const horas = parseFloat(tiempo[0]);
        const minutos = parseFloat(tiempo[1]) / 60;
        const segundos = parseFloat(tiempo[2]) / 3600;
        totalHoras += horas + minutos + segundos;
      }
    }
    return totalHoras.toFixed(2);
  }

  const generarRandomColor = (cant) => {
    let colores = [];
    let contador = 0;
    while (colores.length < cant) {
      var num = (Math.floor(Math.random() * 4) * 4).toString(16);
      console.log(num)
      var letters = ['0', 'F', num];
      var color = '#';

      for (var i = 0; i < 3; i++) {
        let pos = Math.floor(Math.random() * letters.length);
        color += letters[pos];
        letters.splice(pos, 1);
      }

      if (colores.includes(color)) {
        console.log("repetido")
      } else {
        console.log("color.........................", color);
        colores.push(color)

        contador = contador + 1;
      }

    }
    return colores;
  }

  const getData = () => {
    let res = null;

    if (carreras.length > 0) {
      res = {
        labels: carreras,
        datasets: [
          {
            label: "Total horas",
            backgroundColor: generarRandomColor(carreras.length),
            data: sumCarr,
          },
        ],
        
      };
    } else {
      res = {
        labels: ["Cargando..."],
        datasets: [
          {
            label: "Carreras",
            backgroundColor: generarRandomColor(1),
            data: [100]
          },
        ],
      };
    }

    return res;

  }

  return (
    <Box sx={{ width: '70vw' }}>
      <Alert sx={{m:2}} severity="info">Cantidad horas acumuladas por carreras</Alert>
      <Bar data={getData()} />
    </Box>
  )
}