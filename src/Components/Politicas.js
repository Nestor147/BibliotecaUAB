import { Box, Card } from '@mui/material'
import React from 'react'
import MenuDinSimple from './MenuDinSimple'
import PoliticaCont from './PoliticaCont'

export default function Politicas() {
  return (
    <Box>
            <MenuDinSimple titulo={"Políticas"} />
            <Card sx={{p:3}}>
                <PoliticaCont/>
            </Card>
        </Box>
  )
}
