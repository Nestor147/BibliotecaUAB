import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import DialogCrearMateria from './DialogCrearMateria';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Fab } from '@mui/material';
import DialogEliminar from './DialogEliminar';

import { onValue, ref, set } from 'firebase/database';
import { databaseMiApp, firestoreMiApp } from '../services/firebase-config';
import UT from './UT';
import { addDoc, collection, deleteDoc, doc, onSnapshot, query, setDoc, where } from 'firebase/firestore';
import DocenteDetalleMateria from './DocenteDetalleMateria';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function DocenteMisMaterias(props) {

  const [listaMat, setListaMat] = React.useState([]);
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    escucharEventoMaterias();
  }, [])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const addListaMat = (objeto) => {
    //setListaMat(["Intro", "Elementos", "Arquitectura", "Naaaa"]);

    //if (materia) {
    //if (!listaMat.includes(materia)) {
    //setListaMat(listaAnt => {
    //let listaNueva = [...listaMat, materia];
    addListaMatFirDB(objeto);
    //setListaMatBD(listaNueva);
    //return listaNueva;
    //})
    //}
    //}
  }

  const escucharEventoMaterias = () => {

    /*onValue(ref(databaseMiApp, 'docentes/' + UT.getidCorreo(props.user.email) + "/materias"), (snapshot) => {
      let listaNueva = [];

      snapshot.forEach((childSnapshot) => {
        //const childKey = childSnapshot.key;
        const childData = childSnapshot.val();
        listaNueva.push(childData);
        // ...
      });

      setListaMat(listaNueva);

    }, {
      onlyOnce: false
    });*/

    const q = query(collection(firestoreMiApp, UT.docenteSemestreActual), where("iddocente", "==", UT.getidCorreo(props.user.email)));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const lista = [];
      querySnapshot.forEach((doc) => {
        let dato = doc.data();
        if (dato) {
          lista.push(dato);
        }
      });
      console.log(".............................docccc", lista);
      setListaMat(lista);
      //console.log("Current cities in CA: ", cities.join(", "));
    });

  }

  const setListaMatBD = (lista) => {
    set(ref(databaseMiApp, 'docentes/' + UT.getidCorreo(props.user.email) + "/materias"), lista)
      .then(() => {
        // Data saved successfully!
      })
      .catch((error) => {
        // The write failed...
      });

    //const cityRef = doc(firestoreMiApp, 'grupos');
    //setDoc(cityRef, { capital: true }, { merge: true });
  }

  const addListaMatFirDB = async (objeto) => {
    //const docRef = gruposref.doc();
    //let id = docRef.id;
    //const dbRef = firestoreMiApp.collection(UT.docenteSemestreActual);
    //let id = dbRef.id;
    //objeto.idmateria = id;
    const gruposref = collection(firestoreMiApp, UT.docenteSemestreActual);
    const docref = await addDoc(gruposref, objeto);
    //await setDoc(gruposref, )
    //await setDoc(doc(firestoreMiApp, UT.docenteSemestreActual, id), objeto);
    let idmateria = docref.id;

    objeto.idmateria = idmateria;
    await setDoc(doc(firestoreMiApp, UT.docenteSemestreActual, idmateria), objeto);
    return docref.id;
  }

  const removeListaMat = async(objeto) => {

    //const gruposref = collection(firestoreMiApp, UT.docenteSemestreActual);
    //const docref = await addDoc(gruposref, objeto);
    //await setDoc(gruposref, )
    //await setDoc(doc(firestoreMiApp, UT.docenteSemestreActual, id), objeto);
    //let idmateria = docref.id;

    //objeto.idmateria = idmateria;
    await deleteDoc(doc(firestoreMiApp, UT.docenteSemestreActual, objeto.idmateria));
    //return docref.id;

    /*if (materia) {
      if (listaMat.includes(materia)) {
        //setListaMat(listaAnterior => {
        let listaNueva = listaMat.filter(e => e !== materia);
        setListaMatBD(listaNueva);
        //return listaNueva;
        //})
      }
    }*/
  }

  return (

    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <DialogCrearMateria addListaMat={addListaMat} iduser={UT.getidCorreo(props.user.email)} nombreuser={props.user.displayName} />
      <Box
        sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: 'divider' }}
        >
          {
            listaMat.map((value, index) => (
              <Tab label={value.nombre} {...a11yProps(index)} />
            ))
          }
        </Tabs>

        {
          listaMat.map((v, index) => (
            <TabPanel value={value} index={index}>
              <DocenteDetalleMateria datos = {v}/>
              <DialogEliminar eliminar={removeListaMat} itemid={v} titulo="¿Esta seguro de eliminar la materia?" texto={"Esta acción no se puede deshacer, se eliminará la materia: " + v.nombre} />
            </TabPanel>
          ))
        }
      </Box>
    </Box>
  );
}
//{JSON.stringify(v)}

//<DialogEliminar eliminar={removeListaMat} itemid={index} titulo="¿Esta seguro de eliminar la materia?" texto={"Esta acción no se puede deshacer, se eliminará la materia: " + v.nombre} />