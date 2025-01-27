import React, { useContext, useState } from 'react';
import { TimeSlot } from './TimeSlot';
import { WorkHoursDisplay } from './WorkHoursDisplay';
import { CustomScrollableGrid } from './CustomScrollableGrid';
import ModalCalendar from './ModalCalendar';
import ModalHoursWork from './ModalHoursWork';
import { AppContext } from '../context/context';
import { useHoursWork } from '../hooks/useHoursWork';
import { filterAvailableHours } from '../utils/hoursUtils';
import { Box, Typography, useTheme } from '@mui/material';

export default function ListOfHours() {
  const theme = useTheme();
  const { selectDate, admin, reservedSlots } = useContext(AppContext);
  const { hoursWork, updateHoursWork } = useHoursWork();
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWorkHours, setSelectedWorkHours] = useState(null);
  const [isWorkHoursEditModalOpen, setIsWorkHoursEditModalOpen] = useState(false);

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

  const handleEditWorkHours = (workHours) => {
    setSelectedWorkHours(workHours);
    setIsWorkHoursEditModalOpen(true);
  };

  const handleAddHours = () => {
    setSelectedWorkHours(null);
    setIsWorkHoursEditModalOpen(true);
  };

  const handleWorkHoursSubmit = async (e) => {
    e.preventDefault();
    const { date, hourStart, hourFinish } = e.target.elements;
    
    const success = await updateHoursWork(
      {
        date: date.value,
        hourStart: hourStart.value,
        hourFinish: hourFinish.value,
      },
      selectedWorkHours
    );

    if (success) {
      setIsWorkHoursEditModalOpen(false);
    }
  };

  const workHoursForDate = hoursWork.filter(workHours =>
    new Date(workHours.date).toLocaleDateString('fr-FR') === selectDate.toLocaleDateString('fr-FR')
  );

  const availableHours = filterAvailableHours(selectDate, hoursWork, reservedSlots, admin);

  return (
      <Box
        sx={{
          border: '2px solid rgb(7, 48, 39)',
          borderRadius: '14px',
          width: '70%',
          margin: '55px auto',
          [theme.breakpoints.down('lg')]: {
            width: '50%',
            margin: '20px auto', 
          },
          [theme.breakpoints.down('sm')]: {
            width: '95%', 
            margin: '8px auto',
          },
        }}
      >      
      <Box 
        sx={{
          position: 'relative',
          top: '-16px',
          right: '-64px',
          width:'312px',
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
            width:'230px',
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
          {admin ? 'Appointments for the day' : 'Choose a free appointment '}
        </Typography>
      </Box>
      <CustomScrollableGrid>
        {admin && (
          <WorkHoursDisplay
            workHours={workHoursForDate}
            onEdit={handleEditWorkHours}
            onAdd={handleAddHours}
          />
        )}

        {admin && availableHours.length === 0 ? (
          <Typography variant="h5">You have no appointments booked for this date.</Typography>
        ) : (
          availableHours.map((time, index) => (
            <TimeSlot
              key={index}
              time={time}
              isReserved={reservedSlots.some(
                (slot) => slot.date === selectDate.toLocaleDateString('fr-FR') && slot.time === time
              )}
              onClick={handleOpenModal}
            />
          ))
        )}
      </CustomScrollableGrid>

      <ModalHoursWork
        open={isWorkHoursEditModalOpen}
        handleCloseModal={() => setIsWorkHoursEditModalOpen(false)}
        selectedWorkHours={selectedWorkHours}
        onSubmit={handleWorkHoursSubmit}
      />

      <ModalCalendar
        open={isModalOpen}
        handleCloseModal={() => setIsModalOpen(false)}
        item={selectedDateTime}
      />
    </Box>
  );
}