import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export const TimeSlot = ({ time, isReserved, onClick }) => (
  <Grid item>
    <Box
      sx={{
        width: '290px',
        p: 2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: `1px solid ${isReserved ? 'red' : '#ddd'}`,
        borderRadius: '8px',
        backgroundColor: isReserved ? 'rgba(255, 0, 0, 0.1)' : 'transparent',
        cursor: 'pointer',
      }}
      onClick={() => onClick(time)}
    >
      <AccessTimeIcon sx={{ color: '#ff8e34', fontSize: 26 }} />
      <Typography variant="body1" align="center" fontSize={26}>
        {time}
      </Typography>
    </Box>
  </Grid>
);