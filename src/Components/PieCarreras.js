// ./components/PieChart.js
import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { Doughnut, Pie } from "react-chartjs-2";
import { Alert, Box } from "@mui/material";

//import React from 'react'

export default function PieCarreras(props) {
  
  const [carreras, setCarreras] = useState([]);
  const [cantCarr, setCantCarr] = useState([]);

  useEffect(()=>{
    recuperarDatos(props.listaDatos)
  },[props.listaDatos])

  const recuperarDatos = (datos)=>{
    console.log("datos,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,, ", datos.length);
    let listaCarr = [];
    let listaNum = [];

    for(let i=0;i<datos.length;i++){
      let dato = datos[i].carrera;
      let nuevo = {"carrera":dato, "total":contarCarrera(dato, datos)}
      /*if(!carreras.includes(nuevo)){
        carreras.push(nuevo);
        console.log(nuevo);
      }*/

      if(!listaCarr.includes(nuevo.carrera)){
        listaCarr.push(nuevo.carrera);
        listaNum.push([nuevo.total]);
      }

    }

    //setLabels(carreras);

    setCarreras(listaCarr);
    setCantCarr(listaNum);

  }

  const contarCarrera = (item, datos)=>{
    let cont = 0;
    for(let i=0;i<datos.length;i++){
      let dato = datos[i].carrera;
      if(dato === item){
        cont  = cont + 1;
      }
    }
    return cont;
  }

  //const labels = ["January", "February", "March", "April", "May", "June"];

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
        //return getRandomColor();
        console.log("repetido")
      } else {
        console.log("color.........................", color);
        colores.push(color)

        contador = contador + 1;
      }

    }

    //para evitar que se repitan colores 
    return colores;
  }

  /*
  const getLabelsString = ()=>{
    let res = [];
    for(let i=0;i<labels.length;i++){
      res.push(labels[i].carrera);
    }
    return res;
  }

  const getLabelsNum= ()=>{
    let res = [];
    for(let i=0;i<labels.length;i++){
      res.push([labels[i].total]);
    }

    return res;
  }*/

  const getData = ()=>{
    let res = null;

    if(carreras.length>0){
      res = {
        labels: carreras,
        datasets: [
          {
            label: "Total",
            backgroundColor: generarRandomColor(carreras.length),
            data: cantCarr,
          },
        ],
      };
    }else{
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

  /*const data = {
    labels: labels,
    datasets: [
      {
        label: "My First dataset",
        backgroundColor: generarRandomColor(6),
        data: [0, 10, 5, 2, 20, 30, 45],
      },
    ],
  };*/


  var colores = [];

  return (
    <Box sx={{ width: '40vw' }}>
      <Alert sx={{m:2}} severity="info">Cantidad de estudiantes por carreras</Alert>
      <Doughnut data={getData()} />
    </Box>
  )
}


/*
const labels = ["January", "February", "March", "April", "May", "June"];

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
      //return getRandomColor();
      console.log("repetido")
    } else {
      console.log("color.........................", color);
      colores.push(color)

      contador = contador+1;
    }

  }

  //para evitar que se repitan colores 
  return colores;
}

const data = {
  labels: labels,
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: generarRandomColor(6),
      data: [0, 10, 5, 2, 20, 30, 45],
    },
  ],
};


var colores = [];

function getRandomColor() {
  var num = (Math.floor(Math.random() * 4) * 4).toString(16);
  var letters = ['0', 'F', num];
  var color = '#';

  for (var i = 0; i < 3; i++) {
    let pos = Math.floor(Math.random() * letters.length);
    color += letters[pos];
    letters.splice(pos, 1);
  }

  //para evitar que se repitan colores 
  if (colores.includes(color))
    return getRandomColor();
  else
    colores.push(color)

  var str = "<div style='background-color:" + color + "'><button id='b1'>hola</button></div>"
  document.getElementById('colores').innerHTML += str;
  return color;
}

const PieCarreras = () => {
  return (
    <Box sx={{ width: '65vh' }}>
      <Pie data={data} />
    </Box>
  );
};
export default PieCarreras;*/