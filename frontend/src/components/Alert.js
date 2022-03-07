import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const AlertBox = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const Alert = React.forwardRef((props, ref) => {
  const [open, setOpen] = React.useState(false);
  const [type, setType] = React.useState(props.type)
  //const [message, setMessage] = React.useState(props.message)
  
  React.useImperativeHandle(ref, () => ({

     handleClick() {
        setOpen(true);
      }

  }));


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <AlertBox onClose={handleClose} severity={type} sx={{ width: '100%' }}>
          {props.message}
        </AlertBox>
      </Snackbar>
      {/* <Alert severity="error">This is an error message!</Alert>
      <Alert severity="warning">This is a warning message!</Alert>
      <Alert severity="info">This is an information message!</Alert>
      <Alert severity="success">This is a success message!</Alert> */}
    </Stack>
  );
});