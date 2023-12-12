import { Box, Button, Grid, TextField } from '@mui/material'
import React, { useState } from 'react'
import MenuDinSimple from './MenuDinSimple'
import { useNavigate } from 'react-router-dom';

export default function EstudianteMain() {
    const [valorBuscador, setValorBuscador] = useState(null);
    const navegar = useNavigate();

    return (
        <Box>
            <MenuDinSimple titulo={"Buscar Estudiante"} />
            <Grid container spacing={3} sx={{p:2, display: 'flex', alignItems: 'center' }}>
                <Grid item xs>
                    <TextField value={valorBuscador} onChange={(e)=>setValorBuscador(e.target.value)} fullWidth id="outlined-basic" label="Código estudiante" variant="outlined" />
                </Grid>
                <Grid item xs="auto">
                <Button variant="contained" onClick={()=>navegar(valorBuscador)}>Buscar</Button>
                </Grid>
            </Grid>
        </Box>
    )
}