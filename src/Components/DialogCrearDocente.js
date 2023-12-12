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

export default function DialogCrearDocente(props) {

  const carreras = UT.carreras;

  const [open, setOpen] = React.useState(false);
  const [nombreDoc, setNombreDoc] = React.useState(null);
  const [correoDoc, setCorreoDoc] = React.useState(null);
  const [carreraDoc, setCarreraDoc] = React.useState(null);
  const [facultadDoc, setFacultadDoc] = React.useState(null);

  const [errorVarios, setErrorVarios] = React.useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);

    setNombreDoc(null);
    setCorreoDoc(null);
    setCarreraDoc(null);
    setFacultadDoc(null);
    setErrorVarios(null);
  };

  const agregarDocente = () => {

    let errores = "";
    setErrorVarios(null);

    //setErrorVarios(String(Boolean(!nombreDoc)))
    if (!nombreDoc) {
      errores += "Nombre vacío, ";
    }

    if (!correoDoc) {
      errores += "Correo vacío, "
    }else{
      if (UT.getidCorreo(correoDoc).length === correoDoc.length) {
        errores += "Correo no válido, "
      }
    }


    if (!carreraDoc) {
      errores += "Carrera vacío, "
    }

    if (!facultadDoc) {
      errores += "Facultad vacío, "
    }

    if (errores.length===0) {
      let objeto = {
        NOMBRE: nombreDoc,
        CORREO: correoDoc,
        CARRERA: carreraDoc,
        FACULTAD: facultadDoc,
        ID: UT.getidCorreo(correoDoc),
        CODIGO: UT.getidCorreo(correoDoc)
      }
      props.addListaDoc(objeto);
      handleClose();
    } else {
      setErrorVarios(errores);
    }
  }

  return (
    <div>
      <Fab disabled={props.solover} sx={{ mb: 1 }} variant="extended" size="medium" color="primary" aria-label="add" onClick={handleClickOpen}>
        <AddIcon sx={{ mr: 1 }} />
        Agregar
      </Fab>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Nuevo Docente</DialogTitle>
        <DialogContent>

          <Collapse in={errorVarios!==null}>
            <Alert
              severity="error"
              sx={{ mb: 2 }}
            >
              {errorVarios}
            </Alert>
          </Collapse>

          <FormControl sx={{ minWidth: 120, m: 1 }}>
            <InputLabel id="demo-simple-select-label-buscarpor">Carrera:</InputLabel>
            <Select
              labelId="demo-simple-select-label-buscarpor"
              id="demo-simple-select"
              label="Carrera:"
              value={carreraDoc}
              onChange={(e) => { setCarreraDoc(e.target.value) }}
            >
              {
                carreras.map((item, index) => (
                  <MenuItem value={item}>{item}</MenuItem>
                ))
              }
            </Select>
          </FormControl>

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Facultad"
            type="text"
            fullWidth
            variant="standard"
            value={facultadDoc}
            onChange={(e) => setFacultadDoc(e.target.value)}
          />

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nombre Completo"
            type="text"
            fullWidth
            variant="standard"
            value={nombreDoc}
            onChange={(e) => setNombreDoc(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Correo Institucional"
            type="email"
            fullWidth
            variant="standard"
            value={correoDoc}
            onChange={(e) => setCorreoDoc(e.target.value)}
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={() => agregarDocente()}>Agregar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
