import React from 'react';
import { Grid } from '@mui/material';

export const CustomScrollableGrid = ({ children }) => (
  <Grid
    container
    margin={0}
    gap={3}
    height={'fit-content'}
    sx={{
      justifyContent: 'center',
      maxHeight: '420px',
      overflowY: 'auto',
      paddingBottom: '35px'
    }}
    style={{
      scrollbarWidth: 'thin',
      scrollbarColor: '#ff8e34 #f0f0f0',
      width: '100%',
    }}
  >
    <style>
      {`
        div::-webkit-scrollbar {
            width: 24px;
        }
        div::-webkit-scrollbar-track {
            background: #f0f0f0;
            border-radius: 10px;
        }
        div::-webkit-scrollbar-thumb {
            background-color: #ff8e34;
            border-radius: 10px;
        }
        div::-webkit-scrollbar-thumb:hover {
            background-color: #e5772a;
        }
      `}
    </style>
    {children}
  </Grid>
);