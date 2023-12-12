import React, { useState } from 'react'
import {
    Routes,
    Route,
    BrowserRouter,
} from 'react-router-dom';
import Admin from './Admin';
import IniciarSesion from './IniciarSesion';
import Mostrar from './Mostrar';
import Perfil from './Perfil';
import Docente from './Docente';
import BuscarLibros from './BuscarLibros';
import ErrorPagina from './ErrorPagina';
import AdminEnSala from './AdminEnSala';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../services/firebase-config'
import AdminHTotalEst from './AdminHTotalEst';
import AdminDocentes from './AdminDocentes';
import DocenteMain from './DocenteMain';
import DocenteMisEst from './DocenteMisEst';
import DocenteMisMaterias from './DocenteMisMaterias';
import PerfilDocente from './PerfilDocente';
import EstudianteInfo from './EstudianteInfo';
import EstudianteMain from './EstudianteMain';
import Politicas from './Politicas';
import Recepcion from './Recepcion';
import AdminsRecepcion from './AdminsRecepcion';
import MainPageUsuario from './MainPageUsuario';
import RecepcionMain from './RecepcionMain';

/*
<Router>
            <h1>lista</h1>
            {
            user.map((item)=>
            <div><Link to={'/user/'+item.id}>{item.name}</Link></div>
            )
            }
            <Routes>
                <Route path='/user/:id' element={<Usuario/>}></Route>
            </Routes>
        </Router>
*/

export default function ContenidoApp() {

    const [user, setUser] = useState(null);

    onAuthStateChanged(auth, (user) => {
        setUser(user);
    });

    return (
        <BrowserRouter>
            <Routes>    
                <Route path='/' element={<IniciarSesion/>}></Route>
                
                <Route path='/admin' element={<Admin contenido={<MainPageUsuario user={user}/>}/>}></Route>
                <Route path='/admin/recepcion' element={<Admin contenido={<AdminsRecepcion/>}/>}></Route>

                <Route path='/admin/ensala' element={<Admin contenido={<AdminEnSala tipoUser = "admin" user={user}/>}/>}></Route>
                <Route path='/admin/ensala/:id' element={<Admin contenido={<AdminEnSala tipoUser = "admin" user={user}/>}/>}></Route>
                <Route path='/admin/estudiantes' element={<Admin contenido={<AdminHTotalEst/>}/>}></Route>
                <Route path='/admin/docentes' element={<Admin contenido={<AdminDocentes solover = {false} />}/>}></Route>

                <Route path='/docente' element={<DocenteMain contenido={<MainPageUsuario user={user} />}/>}></Route>
                <Route path='/docente/materias' element={<DocenteMain contenido={<DocenteMisMaterias user={user} />}/>}></Route>
                <Route path='/docente/perfil' element={<DocenteMain contenido={<PerfilDocente user={user} />}/>}></Route>

                <Route path='*' element={<ErrorPagina/>}></Route>
                <Route path='/buscarlibros' element={<BuscarLibros/>}></Route>
                <Route path='/estudiante/' element={<EstudianteMain/>}></Route>
                <Route path='/estudiante/:id' element={<EstudianteInfo/>}></Route>
                <Route path='/politicas/' element={<Politicas/>}></Route>
                
                <Route path='/recepcion' element={<Recepcion contenido={<RecepcionMain user = {user}/>}/>}></Route>
                <Route path='/recepcion/ensala' element={<Recepcion contenido={<AdminEnSala tipoUser = "recepcion" user={user}/>}/>}></Route>
                <Route path='/recepcion/ensala/:id' element={<Recepcion contenido={<AdminEnSala  tipoUser = "recepcion" user={user}/>}/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}

/*
<Route path='/admin/materias' element={<Admin contenido={<DocenteMisMaterias user={user} />}/>}></Route>
                <Route path='/admin/perfil' element={<Admin contenido={<PerfilDocente user={user} />}/>}></Route>
*/

//<Route path='/admin/recepcion' element={<Admin contenido={<AdminsRecepcion/>}/>}></Route>

//<Route path='/docente/estudiantes' element={<DocenteMain contenido={<DocenteMisEst user={user} />}/>}></Route>

/*
<Route path='/docente' element={<Docente/>}></Route>
                <Route path='/docente/:id' element={<Docente/>}></Route>
*/

//<Route path='/admin/:id' element={<Admin/>}></Route>

/*<Route path='/docente' element={<Docente/>}></Route>
                <Route path='/docente/:id' element={<Docente/>}></Route>*/