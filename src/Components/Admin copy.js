import React, { useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Avatar, Button, Grid, Menu, MenuItem, SvgIcon, Tooltip } from '@mui/material';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useEffect } from 'react';
import { child, get, getDatabase, ref } from 'firebase/database';
import { databaseMiApp } from '../services/firebase-config';
import Perfil from './Perfil';
import DrawerEjemplo from './DrawerEjemplo';
import TablaValores from './TablaValores';
import UserEnSala from './UserEnSala';
import ListaEnLinea from './ListaEnLinea';
import { auth } from '../services/firebase-config'
import { Link, useNavigate } from 'react-router-dom';
import DetalleVisitante from './DetalleVisitante';
import ContenidoAdmin from './ContenidoAdmin';
import LogoApp from '../images/logobibcent.svg'
import AdminMenu from './AdminMenu';

export default function Admin() {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  let extension = "ivan.flores@uab.edu.bo";
  let extension2 = "jhonmorales12020@gmail.com";

  const [datos, setDatos] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const navegar = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    /*setUser(auth.currentUser);
    verificarAdmin(auth.currentUser);*/

    onAuthStateChanged(auth, (user) => {
      setUser(user);
      //setAuthUser(auth);
      verificarAdmin(user);
    });

  }, [])

  function verificarAdmin(user) {
    if (user) {
      if (user.email === extension || user.email === extension2) {
        console.log("Logueado");
      } else {
        alert("Administrador no encontrado, intenta con otra cuenta");
        cerrarSesion();
        console.log("errortipo2", user, extension)
      }
    } else {
      navegar("/");
    }
  }

  function cerrarSesion() {
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }

  /**Toolbar
   * <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
      <Typogr..
          */

  return (
    <div>
      {user ?

        
        <Box sx={{ flexGrow: 1, height: '100vh' }}>
          <AppBar position="static">
            <Toolbar variant="dense">
              <Avatar component={Link} to={"/"} src={LogoApp}></Avatar>
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
                  <MenuItem onClick={() => cerrarSesion()}>Cerrar Sesión</MenuItem>
                </Menu>
              </div>

            </Toolbar>

          </AppBar>
      
          <ContenidoAdmin user={user} />
          

        </Box>
        : null
      }
    </div>
  );
}

//<ContenidoAdmin user={user} />

/*
<Grid container spacing={2}>
        <Grid item xs={4}>
          <ListaEnLinea user={user} setUserSel = {setUserSel} />
        </Grid>
        <Grid item xs={8}>
          <DetalleVisitante userSel = {userSel} />
        </Grid>
      </Grid>
*/