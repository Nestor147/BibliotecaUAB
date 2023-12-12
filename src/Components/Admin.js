import React, { useState } from 'react'
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
import LogoApp from '../images/logocraimark.svg'
import AdminMenu from './AdminMenu';

import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import HomeIcon from '@mui/icons-material/Home';
import WhereToVoteIcon from '@mui/icons-material/WhereToVote';
import SchoolIcon from '@mui/icons-material/School';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import UT from './UT';


const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function Admin(props) {

  //diseño
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };



  //normal
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  //let extension = "ivan.flores@uab.edu.bo";
  //let extension2 = "jhonmorales12020@gmail.com";

  const [datos, setDatos] = React.useState("");
  //const [open, setOpen] = React.useState(false);

  const navegar = useNavigate();

  const [user, setUser] = useState(null);

  let listaMenu = [
    { nombre: "Inicio", icono: <HomeIcon />, dir: "/admin" },
    { nombre: "Recepcionista", icono: <SchoolIcon />, dir: "/admin/recepcion"},
    { nombre: "En Sala", icono: <WhereToVoteIcon />, dir: "/admin/ensala" },
    { nombre: "Estudiantes", icono: <SchoolIcon />, dir: "/admin/estudiantes"}, 
    { nombre: "Docentes", icono: <BusinessCenterIcon />, dir: "/admin/docentes"}
  ]

  /*
    { nombre: "Materias", icono: <BookmarksIcon />, dir: "/admin/materias" },
    { nombre: "Perfil", icono: <PersonIcon />, dir: "/admin/perfil" },
  */

  let extension = "@uab.edu.bo";

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
      if (UT.correosAdmin.includes(user.email)) {
        console.log("Logueado");
        verificarDocente(user);
      } else {
        alert("Administrador no encontrado, intenta con otra cuenta");
        cerrarSesion();
        //console.log("errortipo2", user, extension)
      }
    } else {
      navegar("/");
    }
  }

  function formatoCorreo(correo) {
    return correo.replace(extension, "").replace(".", "");
  }

  function verificarDocente(user) {
    if (user.email.includes(extension)) {
      let correoFormat = formatoCorreo(user.email);
      const dbRef = ref(databaseMiApp);
      get(child(dbRef, `docentes/${correoFormat}`)).then((snapshot) => {
        if (snapshot.exists()) {
          let datoDocente = snapshot.val();
        }
      }).catch((error) => {
        console.error("ffffffffffffffff", error);
      });
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
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar position="fixed" open={open}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  marginRight: 5,
                  ...(open && { display: 'none' }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Avatar sx={{ borderRadius: '25%', mr: 1 }} component={Link} to={"/"} src={LogoApp}></Avatar>
              <Typography variant="h6" noWrap component="div">
                CRAI
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open}>
            <DrawerHeader>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
              </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
              {listaMenu.map((data, index) => (
                <ListItem key={data.nombre} disablePadding sx={{ display: 'block' }}>
                  <Link to={data.dir} style={{ color: 'inherit', textDecoration: 'inherit' }}>
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? 'initial' : 'center',
                        px: 2.5,
                      }}
                    >



                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : 'auto',
                          justifyContent: 'center',
                        }}
                      >
                        <Tooltip title={data.nombre}>
                          {data.icono}
                        </Tooltip>

                      </ListItemIcon>
                      <ListItemText primary={data.nombre} sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                  </Link>
                </ListItem>
              ))}
            </List>
            <Divider />
            <List>
              <ListItem key={"Cerrar Sesión"} disablePadding sx={{ display: 'block' }}>
                <ListItemButton onClick={() => cerrarSesion()}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    <Tooltip title={"Cerrar Sesión"}>
                      {<LogoutIcon />}
                    </Tooltip>
                  </ListItemIcon>
                  <ListItemText primary={"Cerrar Sesión"} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            </List>
          </Drawer>
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <DrawerHeader />
            {props.contenido}
          </Box>
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