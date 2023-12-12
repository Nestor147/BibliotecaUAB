import { Alert, AlertTitle } from '@mui/material'
import React from 'react'

export default function MainPageUsuario(props) {
    return (
        <div>
            {props.user ?
                <Alert sx={{ m: 2 }} severity="info">
                    <AlertTitle>Bienvenido </AlertTitle>
                    {props.user.displayName} — <strong>{props.user.email}</strong>
                </Alert>
                : null}
        </div>
    )
}
