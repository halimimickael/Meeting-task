import React, { useContext, useState, useCallback, useEffect } from 'react';
import { Grid, Typography, Box, Button } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EditIcon from '@mui/icons-material/Edit';
import ModalCalendar from './ModalCalendar';
import ModalHoursWork from './ModalHoursWork';
import { AppContext } from '../context/context';

export default function ListOfHours() {
  const { selectDate, admin, reservedSlots } = useContext(AppContext);
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoursWork, setHoursWork] = useState([]);
  const [selectedWorkHours, setSelectedWorkHours] = useState(null);
  const [isWorkHoursEditModalOpen, setIsWorkHoursEditModalOpen] = useState(false);

  const defaultStartTime = '00:00';
  const defaultEndTime = '23:30';

  const fetchHoursWork = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:3001/hoursWork');
      if (!response.ok) {
        throw new Error('Failed to fetch work hours');
      }
      const data = await response.json();
      setHoursWork(data);
    } catch (error) {
      console.error('Error fetching work hours:', error);
    }
  }, []);

  useEffect(() => {
    fetchHoursWork();
  }, [fetchHoursWork]);

  const hours = Array.from({ length: (24 - 0 + 1) * 2 }, (_, index) => {
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
    
    let dayStart = defaultStartTime;
    let dayEnd = defaultEndTime;
    
    const matchingHours = hoursWork.find(
      (workHours) => new Date(workHours.date).toLocaleDateString('fr-FR') === selectDate.toLocaleDateString('fr-FR')
    );
    
    if (matchingHours) {
      dayStart = matchingHours.hourStart;
      dayEnd = matchingHours.hourFinish;
    }
    
    const [startHour, startMinute] = dayStart.split(':').map(Number);
    const [endHour, endMinute] = dayEnd.split(':').map(Number);
    
    const startTimeInMinutes = startHour * 60 + startMinute;
    const endTimeInMinutes = endHour * 60 + endMinute;
    
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
      
      return timeInMinutes >= startTimeInMinutes && timeInMinutes <= endTimeInMinutes;
    });
  }, [hours, currentTimeInMinutes, selectDate, hoursWork, reservedSlots, admin]);

  const availableHours = filterAvailableHours();

  const handleEditWorkHours = (workHours) => {
    setSelectedWorkHours(workHours);
    setIsWorkHoursEditModalOpen(true);
  };

  const handleWorkHoursSubmit = async (e) => {
    e.preventDefault();
    const { date, hourStart, hourFinish } = e.target.elements;

    try {
      const payload = {
        date: date.value,
        hourStart: hourStart.value,
        hourFinish: hourFinish.value
      };

      const url = selectedWorkHours 
        ? `http://localhost:3001/hoursWork/${selectedWorkHours._id}` 
        : 'http://localhost:3001/hoursWork';

      const method = selectedWorkHours ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update work hours');
      }

      fetchHoursWork();
      setIsWorkHoursEditModalOpen(false);
    } catch (error) {
      console.error('Error updating work hours:', error);
      alert(error.message);
    }
  };

  return (
    <>
      <Grid container marginLeft={5} marginTop={1} spacing={2}>
        {admin && (
          <>
            {hoursWork.map((workHours, index) => {
              if (new Date(workHours.date).toLocaleDateString('fr-FR') === selectDate.toLocaleDateString('fr-FR')) {
                return (
                  <Grid item key={index} lg={12} container alignItems="center" justifyContent="center">
                    <Typography variant="h6" align="center" style={{ marginRight: '10px' }}>
                      Heures de travail : {workHours.hourStart} - {workHours.hourFinish}
                    </Typography>
                    <Button 
                      variant="outlined" 
                      startIcon={<EditIcon />}
                      onClick={() => handleEditWorkHours(workHours)}
                    >
                      Edit
                    </Button>
                  </Grid>
                );
              }
              return null;
            })}

            {!hoursWork.some(
              (workHours) => new Date(workHours.date).toLocaleDateString('fr-FR') === selectDate.toLocaleDateString('fr-FR')
            ) && (
              <Grid item lg={12} container alignItems="center" justifyContent="center">
                <Typography variant="h6" align="center" style={{ marginRight: '10px' }}>
                  Heures de travail : {defaultStartTime} - {defaultEndTime}
                </Typography>
                <Button 
                  variant="outlined" 
                  startIcon={<EditIcon />}
                  onClick={() => {
                    setSelectedWorkHours(null);
                    setIsWorkHoursEditModalOpen(true);
                  }}
                >
                  Add Hours
                </Button>
              </Grid>
            )}
          </>
        )}

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
                <AccessTimeIcon sx={{ color: '#ff8e34' }} />
                <Typography variant="body1" align="center">
                  {time}
                </Typography>
              </Box>
            </Grid>
          );
        })}
      </Grid>

      <ModalHoursWork
        open={isWorkHoursEditModalOpen}
        handleCloseModal={() => setIsWorkHoursEditModalOpen(false)}
        selectedWorkHours={selectedWorkHours}
        onSubmit={handleWorkHoursSubmit}
      />

      <ModalCalendar
        open={isModalOpen}
        handleCloseModal={handleCloseModal}
        item={selectedDateTime}
      />
    </>
  );
}
