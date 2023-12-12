import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import React from 'react'
import DoneIcon from '@mui/icons-material/Done';

export default function ListaSimpleString(props) {
  return (
    <Box>

      <Typography variant="h6" color="inherit" component="div" sx={{ flexGrow: 1 }}>
        {props.titulo}
      </Typography>

      {props.lista ?
        <List>
          {
            props.lista.map((v, index) => (
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <DoneIcon />
                  </ListItemIcon>
                  <ListItemText primary={v} />
                </ListItemButton>
              </ListItem>
            ))
          }
        </List>
        : null}
    </Box>
  )
}
