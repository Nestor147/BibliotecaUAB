import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Avatar, Button, Grid, Menu, MenuItem, Tooltip } from '@mui/material';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useEffect } from 'react';
import { child, get, getDatabase, ref } from 'firebase/database';
import { databaseMiApp } from '../services/firebase-config';
import Perfil from './Perfil';
import DrawerEjemplo from './DrawerEjemplo';
import TablaValores from './TablaValores';
import { Link, useNavigate } from 'react-router-dom';
import UserEnSala from './UserEnSala';
import { auth } from '../services/firebase-config'
import ContenidoDocente from './ContenidoDocente';
import LogoApp from '../images/logocraimark.svg'
import { AccountCircle } from '@mui/icons-material';
import DialogPerfilFull from './DialogPerfilFull';

export default function Docente() {

  let extension = "@uab.edu.bo";
  //let extension = "@gmail.com";

  const [datos, setDatos] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const navegar = useNavigate();

  const [user, setUser] = React.useState(null);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  useEffect(() => {
    /*setUser(auth.currentUser);
    verificarAdmin(auth.currentUser);*/

    onAuthStateChanged(auth, (user) => {
      setUser(user);
      verificarDocente(user);
    });

  }, [])

  function formatoCorreo(correo) {
    return correo.replace(extension, "").replace(".", "");
  }

  function verificarDocente(user) {
    if (user.email.includes(extension)) {
      let correoFormat = formatoCorreo(user.email);
      const dbRef = ref(databaseMiApp);
      get(child(dbRef, `docentes/${correoFormat}`)).then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          setDatos(snapshot.val())
        } else {
          console.log("error............", correoFormat)
          alert("Docente no encontrado, intenta con otra cuenta");
          cerrarSesion();
        }
      }).catch((error) => {
        console.error("ffffffffffffffff", error);
      });
    } else {
      alert("Docente no encontrado, intenta con otra cuenta");
      cerrarSesion();
      console.log("errortipo2", user, extension)
    }
  }

  function cerrarSesion() {
    signOut(auth).then(() => {
      navegar("/")
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }

  return (
    <div>
        {
        user?
        <Box sx={{ flexGrow: 1, height: '100vh' }}>
      <AppBar position="static">
      <Toolbar variant="dense">
          <Avatar  component={Link} to={"/"} src={LogoApp}></Avatar>
          <Typography variant="h6" color="inherit" component="div" sx={{ flexGrow: 1 }}>
            Visitas Biblioteca SK
          </Typography>

          <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar src={user.photoURL} />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <DialogPerfilFull user = {datos} handleClose = {handleClose}/>
                <MenuItem onClick={()=>cerrarSesion()}>Cerrar Sesión</MenuItem>
              </Menu>
            </div>

        </Toolbar>

      </AppBar>

      <ContenidoDocente user = {user}/>

    </Box>
    :
    "......"
      }
    </div>
  );
}

/*
{
        user?
        <Box sx={{ flexGrow: 1, height: '100vh' }}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div" sx={{ flexGrow: 1 }}>
            Inicio
          </Typography>
          <IconButton onClick={() => setOpen(true)} >
            <Avatar src={user.photoURL} />
          </IconButton>
        </Toolbar>

      </AppBar>

      <DrawerEjemplo open={open} setOpen={setOpen} cerrarSesion={cerrarSesion} datosUser={datos} />

      <TablaValores/>
      
      <Perfil />

    </Box>
    :
    "......"
      }
*/