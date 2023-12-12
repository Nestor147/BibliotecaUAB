import { Avatar, Badge, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, styled, Typography } from '@mui/material'
import { deepOrange } from '@mui/material/colors';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { databaseMiApp } from '../services/firebase-config';
import { ref, update } from 'firebase/database';
import DialogConfirmarElim from './DialogConfirmarElim';

export default function ItemEnLinea(props) {

    //const [dialogOpen, setDialogOpen] = useState(false);

    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            backgroundColor: '#44b700',
            color: '#44b700',
            boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
            '&::after': {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                animation: 'ripple 1.2s infinite ease-in-out',
                border: '1px solid currentColor',
                content: '""',
            },
        },
        '@keyframes ripple': {
            '0%': {
                transform: 'scale(.8)',
                opacity: 1,
            },
            '100%': {
                transform: 'scale(2.4)',
                opacity: 0,
            },
        },
    }));

    const stringAvatar = (valor) => {
        let res = "";
        let datos = valor.split(" ");
        if (datos.length > 1) {
            res = datos[0].charAt(0).toUpperCase()+datos[1].charAt(0).toUpperCase();
        }else{
            res = valor.substring(0,2).toUpperCase();
        }

        return res;
    }

    /*const clickUser = ()=>{
        props.setUserSel(props.user)
    }
    const eliminarUserSel = (user)=>{
        if(props.userSel.codigo===user.codigo){
            //props.setUserSel(null);
        }
    }*/

    return (
        <List dense={true} key={props.ident} sx={{ width: '100%', bgcolor: 'background.paper'}}>
            <ListItem alignItems="flex-start" secondaryAction={
                    <DialogConfirmarElim superUser = {props.superUser}  user = {props.user}/>
                  }>
                <ListItemButton key={props.ident} component={Link} to={'/'+props.tipoUser+'/ensala/'+props.ident}>
                    <ListItemAvatar>

                        <StyledBadge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant="dot"
                        >
                            <Avatar sx={{ bgcolor: deepOrange[500] }}>{stringAvatar(props.user.nombre)}</Avatar>
                        </StyledBadge>

                    </ListItemAvatar>
                    <ListItemText
                        primary={props.user.nombre}
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    {props.user.fecha}
                                </Typography>
                                {" - " +props.user.horaentrada}
                            </React.Fragment>
                        }
                    />
                </ListItemButton>
            </ListItem>
            <Divider variant="inset" component="li" />
        </List>
    )
}