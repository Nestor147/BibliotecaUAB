import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestoreMiApp } from '../services/firebase-config';

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

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

/*const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];
*/


export default function AdminHistIndiv(props) {

    //const [listaDatos, setListaDatos] = React.useState([]);

    /*React.useEffect(() => {
        recuperarDatos(props.codigo);
      },[props.codigo])
    
      const recuperarDatos = async (codigo) => {
        const q = query(collection(firestoreMiApp, "historial_visitas"), where("codigo", "==", codigo));
        const querySnapshot = await getDocs(q);

        let lista = [];
        setListaDatos([]);
        
        querySnapshot.forEach((doc) => {
          lista.push(doc.data());
        });

        console.log(lista);
        setListaDatos(lista);
      }*/

    return (
        <div>
            {
                props.listaDatos.length > 0 ?
                    <TableContainer key={props.codigo} component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Día</StyledTableCell>
                                    <StyledTableCell align="right">Hora Ingreso</StyledTableCell>
                                    <StyledTableCell align="right">Hora Salida</StyledTableCell>
                                    <StyledTableCell align="right">Total</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {props.listaDatos.map((row, index) => (
                                    <StyledTableRow key={index + "-" + row.codigo}>
                                        <StyledTableCell component="th" scope="row">{row.dia}</StyledTableCell>
                                        <StyledTableCell align="right">{row.horaentrada}</StyledTableCell>
                                        <StyledTableCell align="right">{row.horasalida}</StyledTableCell>
                                        <StyledTableCell align="right">{row.total}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                                <StyledTableRow>
                                    <StyledTableCell align='right' colSpan={3}>Total</StyledTableCell>
                                    <StyledTableCell align="right">{props.total}</StyledTableCell>
                                </StyledTableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    : ""
            }
        </div>
    );
}
