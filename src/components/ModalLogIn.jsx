import React, { useContext, useState } from 'react';
import { Modal, Box, Button, TextField, Snackbar } from '@mui/material';
import { AppContext } from '../context/context';

const ModalLogIn = ({ open, handleCloseModal }) => {
  const { setAdmin, SECRETCODE } = useContext(AppContext);
  const [error, setError] = useState(false);  
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    adminCode: '',
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
      adminCode: '', 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    if(formData.adminCode === SECRETCODE) {
        setAdmin(true);  
        handleCloseModal();  
        resetForm();
    } else {
        setError(true);  
        setErrorMessage('Code incorrect. Veuillez réessayer.');
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
              label="Code Admin"
              name="adminCode"
              type="password"
              value={formData.adminCode}
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
