import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Modal, Box, Typography, TextField, Button, useTheme, useMediaQuery } from '@mui/material';
import { AppContext } from '../context/context';
import { modalStyle, ModalTitle, textFieldStyles } from './styles';

export default function ModalHoursWork({ open, handleCloseModal, selectedWorkHours, onSubmit }) {
  const { selectDate } = useContext(AppContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); 
  
  const initializeFormValues = useCallback(() => ({
    date: selectDate.toLocaleDateString('fr-FR').split('/').reverse().join('-'),
    hourStart: '00:00',
    hourFinish: '23:30',
  }), [selectDate]); 
  
  const [formValues, setFormValues] = useState(initializeFormValues);

  useEffect(() => {
    if (!open) {
      setFormValues(initializeFormValues());
    }
  }, [initializeFormValues, open, selectDate]);

  useEffect(() => {
    if (selectedWorkHours) {
      setFormValues({
        date: selectedWorkHours.date,
        hourStart: selectedWorkHours.hourStart,
        hourFinish: selectedWorkHours.hourFinish,
      });
    }
  }, [selectedWorkHours]);

  const handleChange = useCallback((e) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [e.target.name]: e.target.value,
    }));
  }, []);
  
  return (
    <Modal open={open} onClose={handleCloseModal}>
      <Box
        sx={modalStyle(isMobile)}
      >
        <Typography variant="h6" gutterBottom sx={ModalTitle}>
          {selectedWorkHours ? 'Edit' : 'Add'} Working Hours
        </Typography>
        <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '26px', padding: '26px' }}>
          <TextField
            fullWidth
            label="Date"
            type="date"
            name="date"
            value={formValues.date}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            sx={textFieldStyles}
          />
          <TextField
            fullWidth
            label="Start Time"
            type="time"
            name="hourStart"
            value={formValues.hourStart}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            sx={textFieldStyles}
          />
          <TextField
            fullWidth
            label="End Time"
            type="time"
            name="hourFinish"
            value={formValues.hourFinish}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            sx={textFieldStyles}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ backgroundColor: '#ff8e34',  mt: 2 }}
          >
            {selectedWorkHours ? 'Update' : 'Add'} Hours
          </Button>
        </form>
      </Box>
    </Modal>
  );
}
