import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import GoogleIcon from '@mui/icons-material/Google';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import socialMediaAuth from '../services/auth';
import { googleProvider } from '../services/authMethod';
import { useLocation, useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../services/firebase-config';
import LogoApp from '../images/logocraimark.svg'
import CardBuscarLibros from './CardBuscarLibros';
import { Divider, Fab, FormControl, FormLabel, Radio, RadioGroup } from '@mui/material';
import PlagiarismIcon from '@mui/icons-material/Plagiarism';
import { Link } from 'react-router-dom';
import imagencrai from '../images/biblioteca.jpg'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import UT from './UT';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Typography component={Link} color="inherit" to="https://www.uab.edu.bo/">
        Universidad Adventista Bolivia
      </Typography>{' '}
      {new Date().getFullYear()}
      {'.'}
      {" - "}
      <Typography component={Link} color="inherit" to="/politicas">
        Políticas
      </Typography>{' '}
    </Typography>
  );
}

//const theme = createTheme();

export default function IniciarSesion() {


  //const correoAD = "ivan.flores@uab.edu.bo";
  //const correoAD2 = "jhonmorales12020@gmail.com";

  const [user, setUser] = React.useState(null);
  const navegar = useNavigate();

  const [tipoUser, setTipoUser] = React.useState('docente');

  const handleChangeUser = (event) => {
    setTipoUser(event.target.value);
  };

  React.useEffect(() => {

    onAuthStateChanged(auth, (user) => {
      //setUser(user);
      //setAuthUser(auth);
      //verificarUser(user);
      setUser(user);
    });

  }, [])


  const verificarUser = (user) => {
    if (user) {
      /*if (UT.correosRecepcion.includes(user.email)) {
        navegar("recepcion/ensala");
      } else if (UT.correosAdmin.includes(user.email)) {
        navegar("admin");
      } else {
        navegar("docente");
      }*/

      navegar(tipoUser);
    }
  }

  const handleSubmit = async (event) => {
    if (user) {
      verificarUser(user);
    } else {
      const res = await socialMediaAuth(googleProvider);
      console.log(res);
    }
  };

  return (

    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${imagencrai})`,
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            height: "100vh",
            display: "flex",
            flexDirection: "column"
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flex: '1',

              flexDirection: 'column',
              alignItems: 'center',
              p: 2
            }}
          >
            <Avatar src={LogoApp} sx={{
              width: 100,
              height: 100,
              borderRadius: '25%',
              borderColor: 'transparent',
              boxSizing: 'content-box'
            }}>
            </Avatar>
            <Typography component="h1" variant="h5">
              CRAI
            </Typography>

            <FormControl>
              <FormLabel id="demo-controlled-radio-buttons-group">Soy usuario:</FormLabel>
              
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={tipoUser}
                onChange={handleChangeUser}
              >
                
                <FormControlLabel value="docente" control={<Radio />} label="Docente" />
                <FormControlLabel value="estudiante" control={<Radio />} label="Estudiante" />
                <FormControlLabel value="admin" control={<Radio />} label="Administrador" />
                <FormControlLabel value="recepcion" control={<Radio />} label="Recepcionista" />
              </RadioGroup>
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => handleSubmit()}
            >
              {user ? "Ingresar" : "Iniciar Sesión con Google"}
            </Button>
          </Box>

          <Box
            sx={{
              display: 'flex',
              p: 2,
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'row', mb: 2 }}>
              <Fab sx={{ mr: 1 }} variant="extended" component={Link} to={"/buscarlibros"}>
                <PlagiarismIcon sx={{ mr: 1 }} />
                Buscar Libros
              </Fab>
              <Fab sx={{ ml: 1 }} variant="extended" component={Link} to={"/estudiante"}>
                <PlagiarismIcon sx={{ mr: 1 }} />
                Estudiantes
              </Fab>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <Fab sx={{ ml: 1 }} variant="extended" component={Link} to={"https://github.com/obed-tc/Apps/raw/main/VisitasCrai.apk"}>
                <ArrowDownwardIcon sx={{ mr: 1 }} />
                App móvil
              </Fab>
            </Box>

            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>

  );
}

/*

*/