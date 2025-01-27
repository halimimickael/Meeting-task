import { Box, Typography, useTheme, Button } from '@mui/material';
import React, { useContext, useMemo } from 'react';
import { AppContext } from '../context/context';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { CustomScrollableGrid } from './CustomScrollableGrid';

export default function AllAppointment() {
  const theme = useTheme();
  const { reservedSlots, setReservedSlots } = useContext(AppContext);

  const sortedSlots = useMemo(() => {
    if (!reservedSlots) return [];
    
    return [...reservedSlots].sort((a, b) => {
      const [dayA, monthA, yearA] = a.date.split('/');
      const [dayB, monthB, yearB] = b.date.split('/');
      
      const dateA = new Date(yearA, monthA - 1, dayA, ...a.time.split(':'));
      const dateB = new Date(yearB, monthB - 1, dayB, ...b.time.split(':'));
      
      return dateA - dateB;
    });
  }, [reservedSlots]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/reservations/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete appointment');
      }

      setReservedSlots(prevSlots => prevSlots.filter(slot => slot._id !== id));
    } catch (error) {
      console.error('Error deleting appointment:', error);
      alert('Failed to delete appointment. Please try again.');
    }
  };

  return (
    <Box
      sx={{
        border: '2px solid rgb(7, 48, 39)',
        borderRadius: '14px',
        width: '95%',
        margin: '55px auto',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          top: '-16px',
          right: '-64px',
          width: '312px',
          background: '#ff8e34',
          color: 'rgb(255, 255, 255)',
          fontSize: '13px',
          fontWeight: 600,
          lineHeight: '24px',
          textAlign: 'center',
          padding: '2px 16px',
          borderRadius: '8px',
          textTransform: 'uppercase',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          [theme.breakpoints.down('lg')]: {
            width: '230px',
            right: '-20px',
          },
        }}
      >
        <Typography
          sx={{
            fontSize: '17px',
            fontWeight: 600,
            [theme.breakpoints.down('lg')]: {
              fontSize: '13px',
            },
          }}
        >
          All Appointments
        </Typography>
      </Box>


      <CustomScrollableGrid>
        {sortedSlots && sortedSlots.length > 0 ? (
          sortedSlots.map((slot) => (
            <Box
              key={slot._id}
              sx={{
                border: '1px solid #ccc',
                borderRadius: '12px',
                padding: '16px',
                marginBottom: '16px',
                backgroundColor: '#f9f9f9',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                width: '350px',
                [theme.breakpoints.down('lg')]: {
                    width: '270px',
                },
              }}
            >
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'flex-start'
              }}>
                <Box>
                  <Typography variant="h6" sx={{ marginBottom: '8px' }}>
                    Appointment with {slot.firstName} {slot.lastName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    📅 Date: {slot.date}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    🕒 Time: {slot.time}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    📞 Phone: {slot.phone}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    📧 Email: {slot.email}
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(slot._id)}
                  sx={{
                    minWidth: '40px',
                    height: '40px',
                    padding: '8px',
                  }}
                >
                  <DeleteForeverIcon />
                </Button>
              </Box>
            </Box>
          ))
        ) : (
          <Typography>No appointments available</Typography>
        )}
      </CustomScrollableGrid>
    </Box>
  );
}