import React from 'react'
import Calendar from './Calendar'
import ListOfHours from './ListOfHours'
import { Box } from '@mui/material'

export default function Home() {
  return (
    <Box display={'flex'} marginTop={1}>
        <Calendar />
        <ListOfHours />
    </Box>
  )
}
