import { useEffect } from 'react';
import Button from '@mui/material/Button';
import * as React from "react";
import Grid from "@mui/material/Grid";
import KredietAanvraagService from "../services/kredietaanvraag-service"
import EventBus from "../common/eventBus"
import AuthService from "../services/auth-service"
import {
  Modal,
  Typography,
  Box,
  TextField,
  Slider,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TextareaAutosize,
} from "@mui/material";
import CurrencyTextField from '@unicef/material-ui-currency-textfield'

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  height: "80%",
  overflow: "scroll",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const CreateSector = React.forwardRef((props, ref) => {

  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  
  const [naam, setNaam] = React.useState("")
  



  const handleChange = (event) => {
  

  };


  React.useImperativeHandle(ref, () => ({
    handleOpen() {
      setOpen(true);

    }
  }));

  function valuetext(value) {
    if (value == 1) return `${value} maand`;
    else if (value == 12) return `${value} Jaar`;
    else return `${value} maanden`;

  }

  function handleSubmit(e) {
    e.preventDefault();
    //sectorservice.create...
    
    
  }

  /*  function ratiosOK() {
     //API data uitlezen en checken of boven een bepaalde minimumwaarde liggen
     //get btwnummer
     if (.solvabiliteit >= ... && .rentabiliteit >= ... && .liquiditeit >= ...){
       resultaat = true;
     }
     else {
       resultaat = false;
     }
     return resultaat
   } */

  /*  function kredietCheck() {
     //if (user.isBlacklisted() == false && user.ratiosOk() == true) {
       
       resultaat = "kredietaanvraag goedgekeurd"
     //}
     //else {
       //kredietAanvraag.delete()
       antwoord = "kredietaanvraag wordt geweigerd"
       reden = " wegens ..." //nog reden concatineren
       resultaat = antwoord + reden
     //}
     return resultaat;
   } */

  const marks = [
    {
      value: "min",
      label: "Jaar",
    }
  ];

  return (

    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          sector
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          maak hier een nieuwe sector aan
          <Box
            onSubmit={handleSubmit}

            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <Grid container spacing={2} style={{ width: "95%" }}>
              
              <Grid item xs={4} md={4}>
                <TextField
                  placeholder="naam"
                  onChange={(e) => setNaam(e.target.value)}
                  value={naam}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <Button variant="contained" type="submit">verstuur </Button>



              </Grid>
            </Grid>
          </Box>
        </Typography>
      </Box>
    </Modal>

  );
})
