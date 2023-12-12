import React, { useEffect, useState } from 'react'
import MenuBuscador from './MenuDinSimple'
import { Box, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import datoslibros from '../Documents/MisDatos.json';
import BuscarLibrosTable from './BuscarLibrosTable';

export default function BuscarLibros() {

    const [valorBuscador, setValorBuscador] = useState("");

    //const [valorBusq, setValorBusq] = useState("fdasdfS");
    const [resBusq, setResBusq] = useState([]);

    //const [titiloBusq, setTituloBusq] = useState({titulo:"Codigo", param:"cod_lib"});
    //const [posBusq, setPosBusq] = useState(0);

    const [filtroSel, setFiltroSel] = useState("Titulo");
    const carreras = ["Codigo", "Titulo", "Tipo", "Autor", "Etiqueta"]

    //const listaFil = [{titulo:"Codigo", param:"cod_lib"},{titulo:"Nombre", param:"titulo"},{titulo:"Tipo", param:"tipo"},{titulo:"Autor", param:"autor_aux"},{titulo:"Etiqueta", param:"descriptores"}]

    const listaFil = [{ titulo: "Codigo", param: "cod_lib" }, { titulo: "Titulo", param: "titulo" }, { titulo: "Tipo", param: "tipo" }, { titulo: "Autor", param: "autor_aux" }, { titulo: "Etiqueta", param: "descriptores" }]
    //let idParam = "titulo"
    const [idParam, setIdParam] = useState("titulo");

    useEffect(() => {
        //recuperarExcel();
    }, [])

    const recuperarExcel = () => {
        let lista = [];
        for (let i = 0; i < 100; i++) {
            lista.push(datoslibros[i])
        }

        setResBusq(lista);
    }

    const filtroBusqueda = (valor) => {
        setValorBuscador(valor);

        let listaNueva = [];
        datoslibros.forEach(element => {

            let valorString = String(valor);

            if (valorString.length > 0) {
                if (elimDiac(element[idParam]).includes(elimDiac(valorString))) {
                    listaNueva.push(element);
                }
            }
        });

        setResBusq(listaNueva);
    }

    function elimDiac(texto) {
        let res = ""
        if (texto) {
            res = texto.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
        }
        return res;
    }

    const setIdFiltroSel = (titulo) => {
        setFiltroSel(titulo);
        setValorBuscador(null);

        listaFil.forEach(element => {
            if (element.titulo === titulo) {
                console.log("...........", titulo, element.titulo)
                //idParam = element.param;
                setIdParam(element.param);
            }
        });

        filtroBusqueda("");
    }

    return (
        <div>
            <MenuBuscador titulo={"Buscar Libros"} />

            <Box sx={{ p: 2 }}>

                <Grid container spacing={3}>
                    <Grid item xs="auto">
                        <FormControl sx={{minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-label-buscarpor">Buscar por:</InputLabel>
                            <Select
                                labelId="demo-simple-select-label-buscarpor"
                                id="demo-simple-select"
                                value={filtroSel}
                                defaultValue={filtroSel}
                                label="Buscar por:"
                                onChange={(e) => { setIdFiltroSel(e.target.value) }}
                            >
                                {
                                    carreras.map((item, index) => (
                                        <MenuItem value={item}>{item}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs>
                        <TextField fullWidth
                            id="filled-search"
                            label="Buscar..."
                            type="search"
                            variant="filled"
                            value={valorBuscador}
                            onChange={(e) => filtroBusqueda(e.target.value)}
                        />
                    </Grid>
                </Grid>

                <BuscarLibrosTable rows={resBusq} />
            </Box>

        </div>
    )
}

//setValorBusq(e.target.value)

/*
{
                    resBusq.map((valor, index)=>{
                        let i = 0;

                        return <p>{valor.titulo}</p>
                    })
                }
*/