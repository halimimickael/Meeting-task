import React, { useContext, useState } from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { Button } from '@mui/material';
import ModalLogIn from './ModalLogIn';
import { AppContext } from '../context/context';

export default function Header() {
  const { admin, setAdmin } = useContext(AppContext); 
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    setAdmin(false); 
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Calendar
        </Typography>
        {admin ? (
          <Button
            sx={{
              backgroundColor: 'white',
              color: 'primary.main',
              border: '2px solid white',
              borderRadius: '8px',
              '&:hover': {
                backgroundColor: 'primary.dark',
                borderColor: 'primary.dark',
              },
              padding: '8px 16px',
            }}
            onClick={handleLogout} 
          >
            <Typography variant="h6" sx={{ color: 'inherit' }}>
              Logout
            </Typography>
          </Button>
        ) : (
          <Button
            sx={{
              backgroundColor: 'white',
              color: 'primary.main',
              border: '2px solid white',
              borderRadius: '8px',
              '&:hover': {
                backgroundColor: 'primary.dark',
                borderColor: 'primary.dark',
              },
              padding: '8px 16px',
            }}
            onClick={handleOpenModal} 
          >
            <Typography variant="h6" sx={{ color: 'inherit' }}>
              Admin
            </Typography>
          </Button>
        )}
      </Toolbar>
      <ModalLogIn open={isModalOpen} handleCloseModal={handleCloseModal} />
    </AppBar>
  );
}
