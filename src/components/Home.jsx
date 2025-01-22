import React from 'react'
import Calendar from './Calendar'
import ListOfHours from './ListOfHours'
import { Box, useMediaQuery, useTheme } from '@mui/material'

export default function Home() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); 
  return (
    <Box display="flex" flexDirection={isMobile ? 'column' : 'row'}>
        <Calendar />
        <ListOfHours />
    </Box>
  )
}
