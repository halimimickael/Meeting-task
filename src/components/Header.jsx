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
    <AppBar 
      position="static" 
      sx={{ 
        backgroundColor: 'white' ,
        borderBottomLeftRadius: '14px',
        borderBottomRightRadius: '14px',
      }}
    >
      <Toolbar 
        sx={{ 
          backgroundColor: '#ff8e34',
          borderBottomLeftRadius: '14px',
          borderBottomRightRadius: '14px',
       }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Calendar
        </Typography>
          <Button
            sx={{
              color: 'white',
              border: '2px solid white',
              borderRadius: '8px',
              '&:hover': {
                backgroundColor: 'white',
                borderColor: '#ff8e34',
                color: '#ff8e34',
              },
              padding: '8px 16px',
              width: '105px',
              height: '33px',
            }}
            onClick={admin ? handleLogout : handleOpenModal} 
          >
            <Typography variant="h6" sx={{ color: 'inherit' }}>
              {admin ? "Logout" : "Admin"}
            </Typography>
          </Button>
      </Toolbar>
      <ModalLogIn open={isModalOpen} handleCloseModal={handleCloseModal} />
    </AppBar>
  );
}
