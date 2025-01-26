import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import { useContext } from 'react'; // Si vous utilisez un contexte
import { AppContext } from '../context/context';

const ModalHoursWork = ({ open, handleCloseModal, selectedWorkHours, onSubmit, selectedDate }) => {
  const [hourStart, setHourStart] = useState('00:00');
  const [hourFinish, setHourFinish] = useState('23:30');
  const [date, setDate] = useState('');
  const { selectDate } = useContext(AppContext);

  console.log(selectDate)
  

  // Fonction pour réinitialiser le formulaire lors de la fermeture du modal
  const handleCancelModal = () => {
    setHourStart('00:00');
    setHourFinish('23:30');
    setDate(selectDate);
    handleCloseModal();
  };

  useEffect(() => {
    if (open) {
      // Lors de l'ouverture du modal, utiliser la selectedDate du contexte si elle est présente
      const formattedDate = selectedDate
        ? new Date(selectedDate).toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0];

      setDate(formattedDate);

      if (selectedWorkHours) {
        setHourStart(selectedWorkHours.hourStart);
        setHourFinish(selectedWorkHours.hourFinish);
      } else {
        setHourStart('00:00');
        setHourFinish('23:30');
      }
    }
  }, [open, selectedWorkHours, selectedDate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ date, hourStart, hourFinish });
  };

  return (
    <Modal open={open} onClose={handleCancelModal}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h6" gutterBottom>
          {selectedWorkHours ? 'Edit Work Hours' : 'Add Work Hours'}
        </Typography>

        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <TextField
            name="date"
            label="Date"
            type="date"
            fullWidth
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            defaultValue={selectDate}
            onChange={(e) => setDate(e.target.value)}
            sx={{ marginBottom: 2 }}
          />

          <TextField
            name="hourStart"
            label="Start Hour"
            type="time"
            fullWidth
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            value={hourStart}
            onChange={(e) => setHourStart(e.target.value)}
            sx={{ marginBottom: 2 }}
          />

          <TextField
            name="hourFinish"
            label="End Hour"
            type="time"
            fullWidth
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            value={hourFinish}
            onChange={(e) => setHourFinish(e.target.value)}
            sx={{ marginBottom: 2 }}
          />

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              onClick={handleCancelModal}
              variant="outlined"
              color="error"
              sx={{ width: '48%' }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ width: '48%' }}
            >
              Save
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default ModalHoursWork;
