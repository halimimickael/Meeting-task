import React, { useContext } from 'react'
import Calendar from './Calendar'
import ListOfHours from './ListOfHours'
import { Box, useMediaQuery, useTheme } from '@mui/material'
import AllAppointment from './AllAppointment';
import { AppContext } from '../context/context';

export default function Home() {
  const { admin } = useContext(AppContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); 
  return (
    <Box>
      <Box display="flex" flexDirection={isMobile ? 'column' : 'row'}>
          <Calendar />
          <ListOfHours />
      </Box>
      {admin && <AllAppointment />}
    </Box>
  )
}