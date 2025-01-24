import React, { useContext, useState } from 'react';
import { Modal, Box, Button, TextField, Snackbar } from '@mui/material';
import { AppContext } from '../context/context';

const ModalLogIn = ({ open, handleCloseModal }) => {
  const { setAdmin } = useContext(AppContext);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

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
      console.log(result.admin)

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
        <Box sx={modalStyle}>
          <Box component="form" onSubmit={handleSubmit} mt={3}>
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Mot de passe"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
              Soumettre
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
