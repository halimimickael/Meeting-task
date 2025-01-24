import React, { useContext, useState, useCallback } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ModalCalendar from './ModalCalendar';
import { AppContext } from '../context/context';

export default function ListOfHours() {
  const { selectDate, reservedSlots, admin } = useContext(AppContext);
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const hours = Array.from({ length: (21 - 0 + 1) * 2 }, (_, index) => {
    const hour = Math.floor(index / 2); 
    const minute = index % 2 === 0 ? '00' : '30'; 
    return `${hour}:${minute}`;
  });

  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes();
  const currentTimeInMinutes = currentHour * 60 + currentMinute;

  const handleOpenModal = (time) => {
    const isReserved = reservedSlots.some(
      (slot) => slot.date === selectDate.toLocaleDateString('fr-FR') && slot.time === time
    );

    if (!admin && isReserved) {
      alert('This slot is already reserved');
      return;
    }

    setSelectedDateTime((prevDate) => ({
      ...prevDate,
      time,
    }));
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedDateTime(null);
    setIsModalOpen(false);
  };

  const filterAvailableHours = useCallback(() => {
    const isToday = selectDate.toLocaleDateString('fr-FR') === new Date().toLocaleDateString('fr-FR');
  
    return hours.filter((time) => {
      const [hour, minute] = time.split(':').map(Number);
      const timeInMinutes = hour * 60 + minute;
  
      if (isToday && currentTimeInMinutes > timeInMinutes) {
        return false;
      }

      if (admin) {
        return reservedSlots.some(
          (slot) => slot.date === selectDate.toLocaleDateString('fr-FR') && slot.time === time
        );
      }
  
      return true;
    });
  }, [hours, currentTimeInMinutes, reservedSlots, admin, selectDate]);
  const availableHours = filterAvailableHours();

  return (
    <>
      {availableHours.length === 0 ? (
        <Typography variant="h6" align="center" color="textSecondary">
          Tu n'as pas de rendez-vous a la date sélectionnée.
        </Typography>
      ) : (
        <Grid container marginLeft={5} marginTop={1} spacing={2}>
          {availableHours.map((time, index) => {
            const isReserved = reservedSlots.some(
              (slot) => slot.date === selectDate.toLocaleDateString('fr-FR') && slot.time === time
            );

            return (
              <Grid item key={index} lg={2} sm={3} xs={6}>
                <Box
                  sx={{
                    width: '100px',
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 1,
                    border: `1px solid ${isReserved ? 'red' : '#ddd'}`,
                    borderRadius: '8px',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                    },
                    cursor: 'pointer',
                    backgroundColor: isReserved ? 'rgba(255, 0, 0, 0.1)' : 'transparent',
                  }}
                  onClick={() => handleOpenModal(time)}
                >
                  <AccessTimeIcon sx={{ color: '#ff8e34'}} />
                  <Typography variant="body1" align="center">
                    {time}
                  </Typography>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      )}

      <ModalCalendar
        open={isModalOpen}
        handleCloseModal={handleCloseModal}
        item={selectedDateTime}
      />
    </>
  );
}
