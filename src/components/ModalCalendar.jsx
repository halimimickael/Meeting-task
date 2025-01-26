import React, { useState, useEffect, useContext } from 'react';
import { Modal, Box, Typography, TextField, Button, Grid } from '@mui/material';
import { AppContext } from '../context/context';
import { useTheme, useMediaQuery } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const ModalCalendar = ({ open, handleCloseModal, item }) => {
  const { selectDate, admin, reservedSlots, setReservedSlots } = useContext(AppContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); 
  console.log("reservedSlots", reservedSlots)
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

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: isMobile ? '270px' : '600px', 
    maxWidth: '95%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '14px',
  };

  const ModalTitle = {
    bgcolor: '#ff8e34',
    borderTopLeftRadius: '14px',
    borderTopRightRadius: '14px',
    color: 'white',
    height: '45px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '16px',
    fontWeight: '600',
    width: '100%',
    gap: '4px',
  };

  const baseButtonStyles = {
    width: '130px',
    height: '34px',
    borderRadius: '8px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 600,
    fontSize: '18px',
    textTransform: 'capitalize',
  };

  const SubmitButton = {
    ...baseButtonStyles,
    bgcolor: '#ff8e34',
    color: 'white',
  };

  const CancelButton = {
    ...baseButtonStyles,
    bgcolor: 'white',
    color: 'red',
    border: '2px solid red',
  };

  const textFieldStyles = {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#ff8e34', 
      },
      '&:hover fieldset': {
        borderColor: '#ff8e34', 
      },
      '&.Mui-focused fieldset': {
        borderColor: '#ff8e34', 
      },
    },
    '& .MuiInputLabel-root': {
      color: '#adadad', 
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: '#adadad', 
    },
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

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

  const handleModalClose = () => {
    setFormData({
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      date: '',
      time: '',
    });
    handleCloseModal();
  };

  const handleCancel = () => {
    handleModalClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleModalClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={modalStyle}>
        <Box>
          <Box sx={ModalTitle}>
            <Typography id="modal-title" variant="h5" component="h2" sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <AssignmentIcon />
              SLOT DETAILS
            </Typography>
          </Box>
          {admin ? (
            <Box p={2}>
              <Typography variant="body1">
                <CalendarTodayIcon sx={{ color: '#ff8e34', verticalAlign: 'middle' }}/> {formData.date}
              </Typography>
              <Typography variant="body1" mt={1}>
                <WatchLaterIcon sx={{ color: '#ff8e34', verticalAlign: 'middle' }} /> : {formData.time}
              </Typography>
              <Typography variant="body1" mt={2}>
                <strong>First Name :</strong> {formData.firstName || 'Not specified'}
              </Typography>
              <Typography variant="body1" mt={1}>
                <strong>Last Name :</strong> {formData.lastName || 'Not specified'}
              </Typography>
              <Typography variant="body1" mt={1}>
                <strong>Phone Number :</strong> {formData.phone || 'Not specified'}
              </Typography>
              <Typography variant="body1" mt={1}>
                <strong>Email :</strong> {formData.email || 'Not specified'}
              </Typography>
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
