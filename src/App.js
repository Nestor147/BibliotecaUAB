import logo from './logo.svg';
import './App.css';
import IniciarSesion from './Components/IniciarSesion';
import { useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './services/firebase-config';
import ContenidoApp from './Components/ContenidoApp';
import Dinamicos from './Components/Dinamicos';

import { ThemeProvider } from '@mui/material';
import React from 'react';
import { createTheme } from '@mui/material';
const theme = createTheme({
  palette: {
    primary: {
      main: '#003264',
    },
  },
});

//#1b2e5e

function App(props) {

  //const [authUser, setAuthUser] = useState(auth);
  /*const [sesion, setSesion] = useState(null);

  onAuthStateChanged(auth, (user) => {
    setSesion(user);
    //setAuthUser(auth);
  });*/

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <React.StrictMode>
          <ContenidoApp />
        </React.StrictMode>
      </ThemeProvider>
    </div>
  );
}
//<ContenidoApp/>
//<Dinamicos/>
export default App;