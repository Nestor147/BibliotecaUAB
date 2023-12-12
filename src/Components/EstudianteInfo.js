import { Box } from '@mui/material'
import React from 'react'
import MenuDinSimple from './MenuDinSimple'
import DetalleVisitante from './DetalleVisitante'
import { useParams } from 'react-router-dom';
import EstudianteContenido from './EstudianteContenido';

export default function EstudianteInfo() {
  const {id} = useParams();

  return (
    <Box>
        <MenuDinSimple titulo = {"Estudiante - "+id}/>
        <EstudianteContenido idEst={id}/>
    </Box>
  )
}
