import React from 'react'
import MenuBuscador from './MenuDinSimple'
import { Box, Button, Typography } from '@mui/material'

import './ErrorPagina.css'
import { Link } from 'react-router-dom'

export default function ErrorPagina() {
    return (
        <div>
            <MenuBuscador titulo={"Sitio no encontrado"} />
            <h1>404 Error Page</h1>
            <section class="error-container">
                <span><span>4</span></span>
                <span>0</span>
                <span><span>4</span></span>
            </section>

            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <Button component={Link} sx={{m:5}} variant="outlined" to={"/"}>Volver a Inicio</Button>
            </Box>
        </div>
    )
}