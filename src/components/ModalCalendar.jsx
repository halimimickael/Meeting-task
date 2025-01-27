import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Modal, Box, Typography, TextField, Button, Grid } from '@mui/material';
import { AppContext } from '../context/context';
import { useTheme, useMediaQuery } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { CancelButton, modalStyle, ModalTitle, SubmitButton, textFieldStyles } from './styles';

const ModalCalendar = ({ open, handleCloseModal, item }) => {
  const { selectDate, admin, reservedSlots, setReservedSlots } = useContext(AppContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); 

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    date: '',
    time: '',
  });

  useEffect(() => {
    if (item) {
      const selectedSlot = reservedSlots.find(
        (slot) => slot.date === selectDate.toLocaleDateString('fr-FR') && slot.time === item.time
      );

      if (selectedSlot) {
        setFormData(selectedSlot);
      } else {
        setFormData((prevData) => ({
          ...prevData,
          date: selectDate.toLocaleDateString('fr-FR') || '',
          time: item.time || '',
        }));
      }
    }
  }, [item, selectDate, reservedSlots]);


  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.phone || !formData.email) {
      alert('Please fill in all fields.');
      return;
    }
    if (!/^[0-9]+$/.test(formData.phone)) {
      alert('The phone number must contain only numbers.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    const reservationData = {
      date: formData.date,
      time: formData.time,
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone,
    };

    try {
      const response = await fetch('http://localhost:3001/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservationData),
      });

      if (response.ok) {
        const data = await response.json();
        
        setReservedSlots((prevReservedSlots) => [
          ...prevReservedSlots,
          data, 
        ]);
        
        alert('Reservation successful!');
        handleModalClose();
      } else {
        alert('Failed to submit reservation. Please try again later.');
      }
    } catch (error) {
      console.error('Error submitting reservation:', error);
      alert('There was an error. Please try again.');
    }
  };

  const handleModalClose = useCallback(() => {
    setFormData({
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      date: '',
      time: '',
    });
    handleCloseModal();
  }, [handleCloseModal]);

  const handleCancel = useCallback(() => {
    handleModalClose();
  }, [handleModalClose]);

  return (
    <Modal
      open={open}
      onClose={handleModalClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={modalStyle(isMobile)}>
        <Box>
          <Box sx={ModalTitle}>
            <Typography id="modal-title" variant="h5" component="h2" sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <AssignmentIcon />
              SLOT DETAILS
            </Typography>
          </Box>
          {admin ? (
            <Box p={3} sx={{ borderRadius: 2, boxShadow: 3, backgroundColor: '#f9f9f9' }}>
              <Box display={'flex'} gap={3}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }} display={'flex'} alignItems={'center'}>
                  <CalendarTodayIcon sx={{ color: '#ff8e34', verticalAlign: 'middle' }} /> 
                  {formData.date}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }} display={'flex'} alignItems={'center'}>
                  <WatchLaterIcon sx={{ color: '#ff8e34', verticalAlign: 'middle' }} /> 
                  {formData.time}
                </Typography>
                </Box>
            
              <Box sx={{ borderTop: '1px solid #ddd', mt: 2, pt: 2 }}>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>First Name :</strong> {formData.firstName || 'Not specified'}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Last Name :</strong> {formData.lastName || 'Not specified'}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Phone Number :</strong> {formData.phone || 'Not specified'}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Email :</strong> {formData.email || 'Not specified'}
                </Typography>
              </Box>
              <Button onClick={handleCancel} variant="contained" sx={CancelButton}>
                  Cancel
              </Button>
          </Box>
          
          ) : (
            <Box component="form" onSubmit={handleSubmit} p={2}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '26px' }}>
                <Typography variant="body1">
                  <CalendarTodayIcon sx={{ color: '#ff8e34', verticalAlign: 'middle' }}/> {formData.date}
                </Typography>
                <Typography variant="body1">
                  <WatchLaterIcon sx={{ color: '#ff8e34', verticalAlign: 'middle' }} /> {formData.time}
                </Typography>
              </Box>
              <Grid container columnSpacing={4} p={1}>
                <Grid item sm={6} xs={12}>
                  <TextField
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    required
                    sx={textFieldStyles}
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    required
                    sx={textFieldStyles}
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    label="Phone Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    required
                    inputProps={{ pattern: '[0-9]+' }}
                    sx={textFieldStyles}
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    required
                    type="email"
                    sx={textFieldStyles}
                  />
                </Grid>
              </Grid>
              <Box sx={{ display: 'flex', alignItems: 'center',justifyContent: 'center', gap: '16px', marginBottom: '16px', marginTop: '16px' }}>
                <Button onClick={handleCancel} variant="contained" sx={CancelButton}>
                  Cancel
                </Button>
                <Button type="submit" variant="contained" sx={SubmitButton}>
                  Submit
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalCalendar;
