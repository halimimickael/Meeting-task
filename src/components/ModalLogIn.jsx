import React, { useContext, useState } from 'react';
import { Modal, Box, Button, TextField, Snackbar, Typography, useMediaQuery, useTheme } from '@mui/material';
import { AppContext } from '../context/context';
import { modalStyle, ModalTitle, SubmitButton, textFieldStyles } from './styles';

const ModalLogIn = ({ open, handleCloseModal }) => {
  const { setAdmin } = useContext(AppContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); 
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setAdmin(result.admin);
        handleCloseModal();
        resetForm();
      } else {
        setError(true);
        console.log(result.msg || 'Erreur lors de la connexion. Veuillez réessayer.');
      }
    } catch (err) {
      console.error('Erreur:', err);
      setError(true);
      setErrorMessage('Erreur de réseau. Veuillez réessayer.');
    }
  };

  const handleModalClose = () => {
    resetForm();
    handleCloseModal();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCloseError = () => {
    setError(false);
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleModalClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={modalStyle(isMobile)}>
          <Box sx={ModalTitle}>
            <Typography id="modal-title" variant="h5" component="h2" sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              LOG IN
            </Typography>
          </Box>
          <Box component="form" onSubmit={handleSubmit} p={3} display={'flex'} flexDirection={'column'} alignItems={'center'}>
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
              sx={textFieldStyles(2)}
            />
            <TextField
              label="Mot de passe"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              required
              sx={textFieldStyles(2)}
              />
            <Button type="submit" variant="contained" sx={SubmitButton}>
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>

      <Snackbar
        open={error}
        autoHideDuration={6000}
        message={errorMessage}
        onClose={handleCloseError}
        severity="error"
      />
    </>
  );
};

export default ModalLogIn;
