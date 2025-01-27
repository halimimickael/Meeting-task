import React from 'react';
import { Grid, Typography, Button, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

export const WorkHoursDisplay = ({ workHours, onEdit, onAdd }) => (
  <Grid item xs={12} container justifyContent="center" alignItems="center" spacing={2}>
    {workHours.length > 0 ? (
      workHours.map((hours, index) => (
        <Grid item key={index} container alignItems="center" justifyContent="center">
          <Typography variant="h6" align="center" style={{ marginRight: '10px' }}>
            Working hours : {hours.hourStart} - {hours.hourFinish}
          </Typography>
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={() => onEdit(hours)}
            sx={{ backgroundColor: '#ff8e34', '&:hover': { backgroundColor: '#e5772a' } }}
          >
            Edit
          </Button>
        </Grid>
      ))
    ) : (
      <Grid item >
        <Box display={'flex'} alignItems={'center'}>
          <Typography variant="h6" align="center" style={{ marginRight: '10px' }}>
            Working hours : 00:00 - 23:30
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={onAdd}
            sx={{ backgroundColor: '#ff8e34', '&:hover': { backgroundColor: '#e5772a' } }}
          >
            Add Hours
          </Button>
        </Box>
      </Grid>
    )}
  </Grid>
);
