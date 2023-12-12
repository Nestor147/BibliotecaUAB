import { Box, Card, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

export default function PerfilDocenteMaterias(props) {

    const [materias, setMaterias] = useState([]); 

    useEffect(()=>{
        recuperarDatos();
    },[props.user])

    const recuperarDatos = () =>{
        let lista = [];



        if(props.user.materias){
            lista = Object.values(props.user.materias);
        }

        //console.log(lista, "......................ssss")

        setMaterias(lista);
    }

    return (
        <Box
            sx={{m:1, p:2, width: '100%', height: 400, maxWidth: 360, bgcolor: 'background.paper' }}
        >
            <Typography>Materias</Typography>

            <List
                        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                        aria-label="contacts"
                    >
                        {
                            materias.map((v, i)=>(
                                    <ListItem disablePadding key={i}>
                                        <ListItemButton>
                                            <ListItemIcon>
                                                <FiberManualRecordIcon />
                                            </ListItemIcon>
                                            <ListItemText primary={v}/>
                                        </ListItemButton>
                                    </ListItem>
                                ))
                        }
                    </List>
        </Box>
    )
}


/**
 props.user.materias.map((value, index) => {
                                return (
                                    <ListItem disablePadding key={index}>
                                        <ListItemButton>
                                            <ListItemIcon>
                                                <FiberManualRecordIcon />
                                            </ListItemIcon>
                                            <ListItemText primary={value}/>
                                        </ListItemButton>
                                    </ListItem>
                                )
                            }) 
 
 */