import React, { useState, useEffect, useContext } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import { AppContext } from '../context/context';

const ModalCalendar = ({ open, handleCloseModal, item }) => {
  const { selectDate, admin, reservedSlots, setReservedSlots } = useContext(AppContext);

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
    width: 600,
    maxWidth: '95%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '14px',
    p: 4,
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
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

    setReservedSlots((prevReservedSlots) => [
      ...prevReservedSlots,
      {
        date: formData.date,
        time: formData.time,
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
      },
    ]);

    handleModalClose();
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

  return (
    <Modal
      open={open}
      onClose={handleModalClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={modalStyle}>
        <Typography id="modal-title" variant="h6" component="h2" mb={2}>
          Slot details
        </Typography>
        {admin ? (
          <Box mt={2}>
            <Typography variant="body1">
              <strong>Date :</strong> {formData.date}
            </Typography>
            <Typography variant="body1" mt={1}>
              <strong>Hour :</strong> {formData.time}
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
          <Box component="form" onSubmit={handleSubmit} mt={3}>
            <Typography variant="body1">
              <strong>Date :</strong> {formData.date}
            </Typography>
            <Typography variant="body1" mt={1}>
              <strong>Hour :</strong> {formData.time}
            </Typography>
            <TextField
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              required
              inputProps={{ pattern: '[0-9]+' }}
            />
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              required
              type="email"
            />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
              Submit
            </Button>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default ModalCalendar;
