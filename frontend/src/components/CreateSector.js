import { useEffect } from 'react';
import Button from '@mui/material/Button';
import * as React from "react";
import Grid from "@mui/material/Grid";
import KredietAanvraagService from "../services/kredietaanvraag-service"
import EventBus from "../common/eventBus"
import sectorService from '../services/sector-service';
import AuthService from "../services/auth-service"
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
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
  width: "50%",
  height: "30%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const CreateSector = React.forwardRef((props, ref) => {

  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  
  const [naam, setNaam] = React.useState("")
 // const [isWhite, setIsWhite] = React.useState("")
  const [nasiCode, setNasiCode] = React.useState("")
  const [checked, setChecked] = React.useState(false);
  
 

  



  


  React.useImperativeHandle(ref, () => ({
    handleOpen() {
      setOpen(true);

    }
  }));
   
 
  function handleSubmit(e) {
    e.preventDefault();

    sectorService.create(naam,nasiCode,checked).then(response => {
      console.log("wat je stuurt", naam, nasiCode, checked);
        console.log(response.data)
        window.location.reload(); 
      }).then(error => {
        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      })
    
  }

  

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
                  
              <Grid item xs={4} md={4}>
                <TextField
                  placeholder="nasiCode"
                  onChange={(e) => setNasiCode(e.target.value)}
                  defaultValue={nasiCode}
                />
             </Grid>
             <Grid item xs={4} md={4}>
             <FormGroup>
             <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                >
                    <FormControlLabel control={<Checkbox defaultChecked={checked} onChange={e => setChecked(e.target.checked)}/>} label="zwarte lijst" />
                </RadioGroup>

                   </FormGroup> 
             </Grid>

              <Grid item xs={4} md={4}>
                <Button variant="contained" type="submit">verstuur </Button>
              </Grid>

            </Grid>
          </Box>
        </Typography>
      </Box>
    </Modal>

  );
})
