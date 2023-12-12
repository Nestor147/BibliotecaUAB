import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Alert, Chip, Collapse, Fab, FormControl, FormHelperText, InputLabel, MenuItem, Paper, Select, Stack, styled } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import UT from './UT';

export default function DialogCrearMateria(props) {

  const [errorLista, setErrorLista] = React.useState(null);
  const [errorCampo, setErrorCampo] = React.useState(null);

  const ListItem = styled('li')(({ theme }) => ({
    margin: theme.spacing(0.5),
  }));

  const carreras = UT.carreras;

  const [listaCarreras, setListaCarreras] = React.useState([]);

  const [open, setOpen] = React.useState(false);
  const [textoMat, setTextoMat] = React.useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);

    setTextoMat(null);
    setListaCarreras([]);
    setErrorCampo(null);
    setErrorLista(null);

  };

  const agregarMateria = () => {

    if (listaCarreras.length > 0) {
      setErrorLista(null);
      if (textoMat) {
        setErrorCampo(null);
        handleClose();

        let objeto = {
          idmateria: "default",
          carreras: listaCarreras,
          docente: props.nombreuser,
          estado: "Activo",
          estudiantes: [],
          iddocente: props.iduser,
          nombre: textoMat
        }

        props.addListaMat(objeto);
      } else {
        setErrorCampo("Campo Obligatorio");
      }
    } else {
      setErrorLista("Selecciona al menos una carrera")
    }
  }

  const elimCarreraList = (carrera) => {
    const nuevaLista = listaCarreras.filter((item) => item !== carrera)
    setListaCarreras(nuevaLista);
  }

  const addCarreraList = (carrera) => {
    if (!listaCarreras.includes(carrera)) {
      setListaCarreras(listaAnterior => {
        let nuevaLista = [...listaAnterior, carrera];
        return nuevaLista;
      })
    }
  }

  return (
    <div>
      <Fab sx={{ mb: 1 }} variant="extended" size="medium" color="primary" aria-label="add" onClick={handleClickOpen}>
        <AddIcon sx={{ mr: 1 }} />
        Agregar
      </Fab>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Nueva Materia</DialogTitle>
        <DialogContent>
          <FormControl sx={{ minWidth: 120, m: 1 }}>
            <InputLabel id="demo-simple-select-label-buscarpor">Carrera:</InputLabel>
            <Select
              labelId="demo-simple-select-label-buscarpor"
              id="demo-simple-select"
              label="Carrera:"
              onChange={(e) => { addCarreraList(e.target.value) }}
            >
              {
                carreras.map((item, index) => (
                  <MenuItem value={item}>{item}</MenuItem>
                ))
              }
            </Select>
          </FormControl>

          <Collapse in={errorLista!==null}>
            <Alert
              severity="error"
              sx={{ mb: 2 }}
            >
              {errorLista}
            </Alert>
          </Collapse>

          <Paper
            sx={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              listStyle: 'none',
              p: 0.5,
              m: 0,
            }}
            component="ul"
          >
            {listaCarreras.map((data) => {
              return (
                <ListItem key={data}>
                  <Chip
                    label={data}
                    onDelete={() => elimCarreraList(data)}
                  />
                </ListItem>
              );
            })}
          </Paper>

          <TextField
            error={errorCampo !== null}
            helperText={errorCampo}
            autoFocus
            margin="dense"
            id="name"
            label="Nombre de la materia"
            type="text"
            fullWidth
            variant="standard"
            value={textoMat}
            onChange={(e) => setTextoMat(e.target.value)}
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={() => agregarMateria()}>Agregar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
