import React from 'react'
import MenuDinSimple from './MenuDinSimple'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import MainPageUsuario from './MainPageUsuario'

export default function RecepcionMain(props) {
  return (
    <div>
        <MainPageUsuario user={props.user} />
        <Button component={Link} sx={{m:2}} color='success' variant='contained' to="ensala">Ver usuarios en sala</Button>
    </div>
  )
}
