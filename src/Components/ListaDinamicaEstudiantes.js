import React, { useEffect, useState } from 'react'

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { firestoreMiApp } from '../services/firebase-config';
import { Box, Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import DialogHistorialEst from './DialogHistorialEst';
import { XLSX } from 'sheetjs-style'
import ExportarExcel from './ExportarExcel';
import TortaCarreras from './TortaCarreras';
import PieChart from './PieCarreras';
import DialogEstadisticas from './DialogEstadisticas';
import HeightIcon from '@mui/icons-material/Height';
import DialogEstadisticasFull from './DialogEstadisticasFull';
import { Link } from 'react-router-dom';
import UT from './UT';

export default function ListaDinamicaEstudiantes(props) {

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

    const [listaFil, setListaFil] = useState([]);
    const [orden, setOrden] = useState(true);
    const [carreras, setCarreras] = useState([]);

    const [filtroSel, setFiltroSel] = useState("Todas");

    //let filtro = null;

    useEffect(() => {
        filtrarDatos("Todas");
        recuperarCarreras(props.lista);
    }, [props.lista])

    const filtrarDatos = (filtro) => {
        if (filtro !== "Todas") {
            let listaNueva = getListaFil(filtro);
            setListaFil(listaNueva);
        } else {
            setListaFil(props.lista);
        }

        setFiltroSel(filtro);
    }

    const recuperarCarreras = (datos) => {
        //console.log("datos,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,, ", datos.length);
        let listaCarr = [];

        for (let i = 0; i < datos.length; i++) {
            let dato = datos[i].carrera;
            /*if(!carreras.includes(nuevo)){
              carreras.push(nuevo);
              console.log(nuevo);
            }*/

            if (!listaCarr.includes(dato)) {
                listaCarr.push(dato);
            }
        }
        //setLabels(carreras);
        setCarreras(listaCarr);
    }

    const getListaFil = (filtro) => {
        let res = [];
        for (let i = 0; i < props.lista.length; i++) {
            if (props.lista[i].carrera === filtro) {
                res.push(props.lista[i]);
            }
        }

        return res;
    }


    const ordenarPorNombre = () => {
        if (orden) {
            setListaFil(listaAnt => {
                let lista = listaAnt.sort((a, b) => {
                    if (a.nombre < b.nombre) {
                        return -1;
                    }
                });

                return lista;
            });
        } else {
            setListaFil(listaAnt => {
                let lista = listaAnt.sort((a, b) => {
                    if (a.nombre > b.nombre) {
                        return -1;
                    }
                });
                return lista;
            });
        }

        setOrden(ordenAnt => {
            return !ordenAnt
        })
    }

    const ordenarPorHoras = () => {
        if (orden) {
            setListaFil(listaAnt => {
                let lista = listaAnt.sort((a, b) => {
                    if (a.totalhoras < b.totalhoras) {
                        return -1;
                    }
                });

                return lista;
            });
        } else {
            setListaFil(listaAnt => {
                let lista = listaAnt.sort((a, b) => {
                    if (a.totalhoras > b.totalhoras) {
                        return -1;
                    }
                });
                return lista;
            });
        }

        setOrden(ordenAnt => {
            return !ordenAnt
        })
    }

    const ordenarPorCarrera = () => {
        if (orden) {
            setListaFil(listaAnt => {
                let lista = listaAnt.sort((a, b) => {
                    if (a.carrera < b.carrera) {
                        return -1;
                    }
                });

                return lista;
            });
        } else {
            setListaFil(listaAnt => {
                let lista = listaAnt.sort((a, b) => {
                    if (a.carrera > b.carrera) {
                        return -1;
                    }
                });
                return lista;
            });
        }

        setOrden(ordenAnt => {
            return !ordenAnt
        })
    }

    const ordenarPorCargo = () => {
        if (orden) {
            setListaFil(listaAnt => {
                let lista = listaAnt.sort((a, b) => {
                    if (String(a.cargo) < String(b.cargo)) {
                        return -1;
                    }
                });

                return lista;
            });
        } else {
            setListaFil(listaAnt => {
                let lista = listaAnt.sort((a, b) => {
                    if (String(a.cargo) > String(b.cargo)) {
                        return -1;
                    }
                });
                return lista;
            });
        }

        setOrden(ordenAnt => {
            return !ordenAnt
        })
    }

    return (
        <Box>

            <Box display="flex" justifyContent="flex-end" sx={{ mb: 2 }} spacing={0.5}>
                <DialogEstadisticasFull listaDatos={listaFil} />
                <ExportarExcel apiData={listaFil} fileName={"Estudiantes Biblioteca"} />
            </Box>

            <FormControl sx={{ m: 1, minWidth: 300 }}>
                <InputLabel id="demo-simple-select-label-carrera">Carrera</InputLabel>
                <Select
                    labelId="demo-simple-select-label-carrera"
                    id="demo-simple-select"
                    value={filtroSel}
                    label="Carrera"
                    defaultValue={filtroSel}
                    onChange={(e) => { filtrarDatos(e.target.value) }}
                >
                    <MenuItem value={"Todas"}>{"Todas"}</MenuItem>
                    {
                        carreras.map((item, index) => (
                            <MenuItem value={item}>{item}</MenuItem>
                        ))
                    }
                </Select>
            </FormControl>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="right">N°</StyledTableCell>
                            <StyledTableCell><Button onClick={() => ordenarPorNombre()} color='inherit' endIcon={<HeightIcon />}>Estudiante</Button></StyledTableCell>
                            <StyledTableCell align="right">Codigo</StyledTableCell>
                            <StyledTableCell align="right"><Button onClick={() => ordenarPorCarrera()} color='inherit' endIcon={<HeightIcon />}>Carrera</Button></StyledTableCell>
                            <StyledTableCell align="right">Facultad</StyledTableCell>
                            <StyledTableCell align="right"><Button onClick={() => ordenarPorHoras()} color='inherit' endIcon={<HeightIcon />}>Total Horas</Button></StyledTableCell>
                            <StyledTableCell align="right">Acción</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listaFil.map((row, index) => (
                            <StyledTableRow key={index + "-" + row.codigo}>
                                <StyledTableCell align="right">{index + 1}</StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                    {row.nombre}
                                </StyledTableCell>
                                <StyledTableCell align="right">{row.codigo}</StyledTableCell>
                                <StyledTableCell align="right">{row.carrera}</StyledTableCell>
                                <StyledTableCell align="right">{row.facultad}</StyledTableCell>
                                <StyledTableCell align="right">{row.totalhoras}</StyledTableCell>
                                <StyledTableCell align="right"><Button component={Link} to={"/estudiante/" + row.codigo}>Historial</Button></StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

//<DialogHistorialEst idUser={row.codigo} nombre={row.nombre} total={row.totalhoras} />
//<DialogEstadisticas listaDatos={listaFil} />
//<StyledTableCell align="right"><Button onClick={() => cambiarCargo(row)}>{row.cargo ? "Recepción" : "Ninguno"}</Button></StyledTableCell>
//<StyledTableCell align="right"><Button onClick={() => ordenarPorCargo()} color='inherit' endIcon={<HeightIcon />}>Cargo</Button></StyledTableCell>