import { Alert } from '@mui/material'
import React from 'react'
import ListaSimpleString from './ListaSimpleString'
import DocenteMisEst from './DocenteMisEst'

export default function DocenteDetalleMateria(props) {
  return (
    <div>
        <ListaSimpleString lista = {props.datos.carreras} titulo = {"Carreras"}/>
        <Alert severity="info">{props.datos.estudiantes.length+" estudiantes - "+props.datos.nombre}</Alert>
        <DocenteMisEst estudiantes = {props.datos.estudiantes}/>
    </div>
  )
}
