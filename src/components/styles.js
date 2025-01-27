export const textFieldStyles = (margin) => ({
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
    margin: margin,
  });
  
  export const ModalTitle = {
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
  
  export const modalStyle = (isMobile) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: isMobile ? '270px' : '600px',
    maxWidth: '95%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '14px',
  });

export const baseButtonStyles = {
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

export  const SubmitButton = {
    ...baseButtonStyles,
    bgcolor: '#ff8e34',
    color: 'white',
  };

export  const CancelButton = {
    ...baseButtonStyles,
    bgcolor: 'white',
    color: 'red',
    border: '2px solid red',
  };
  