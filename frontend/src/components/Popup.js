import { useEffect } from 'react';
import Button from '@mui/material/Button';
import * as React from "react";
import Grid from "@mui/material/Grid";
import KredietAanvraagService from "../services/kredietaanvraag-service"
import EventBus from "../common/eventBus"
import AuthService from "../services/auth-service"
import sectorService from '../services/sector-service';
import KBOService from '../services/KBO-service';
import AddIcon from "@material-ui/icons/Add";
import {Alert} from "./Alert"


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
import authService from '../services/auth-service';
import userService from '../services/user-service';

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

export const Popup = React.forwardRef((props, ref) => {

  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const [termijn, setTermijn] = React.useState(0)
  const [zelfGefinancierd, setZelfGefinancieerd] = React.useState(0)
  const [totaalbedrag, setTotaalbedrag] = React.useState(0)
  const [naam, setNaam] = React.useState("")
  const [categorie, setCategorie] = React.useState("")
  const [verantwoording, setVerantwoording] = React.useState("")
  const [file, setFile] = React.useState()

  const [userID, setUserID] = React.useState()
  const loggedUser = AuthService.getCurrentUser();

  const [disable, setDisable] = React.useState(true)
  

  




  
  

  


  const handleChange = (event) => {
    setCategorie(event.target.value)
    setDisable(false)

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

  React.useEffect(() =>{
      if(loggedUser.role != "KANTOOR"){
        console.log("dit is de id" + loggedUser.id)
        setUserID(loggedUser.id)
      }
  }, [])

  

  function handleSubmit(e) {
    
    e.preventDefault();
      KredietAanvraagService.create(
        userID,
        totaalbedrag,
        termijn,
        file,
        naam,
        verantwoording,
        zelfGefinancierd,
        categorie
  
      ).then(response => {
        if(response.status == 200){
          window.location.reload();
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
          Nieuwe kredietaanvraag indienen
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Vul hier de gegevens in voor uw kredietaanvraag. Druk op versturen
          wanneer u klaar bent.
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
              {loggedUser.role == "KANTOOR"?
                  <Grid item xs={12} md={3}>
                  <TextField
                    id="userID"
                    required="true"
                    label="userID "
                    
                    variant="outlined"
                    style={{ width: "100%" }}
                    onChange={(e) => setUserID(e.target.value)}
                    value={userID}
                  />
                </Grid>
                  : <></>}
              <Grid item xs={12} md={3}>
                <TextField
                  id="naam"
                  required="true"
                  label="Naam van de kredietaanvraag"
                  variant="outlined"
                  style={{ width: "100%" }}
                  onChange={(e) => setNaam(e.target.value)}
                  value={naam}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <CurrencyTextField
                  label="Zelf gefinancierd (€)"
                  variant="outlined"
                  value={zelfGefinancierd}
                  currencySymbol="€"
                  minimumValue="0"
                  outputFormat="string"
                  decimalCharacter=","
                  digitGroupSeparator="."
                  onChange={(event, value) => setZelfGefinancieerd(value)}
                  required="true"
                  style={{ width: "100%" }}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <CurrencyTextField
                  label="Totaalbedrag (€)"
                  variant="outlined"
                  value={totaalbedrag}
                  currencySymbol="€"
                  minimumValue="0"
                  outputFormat="string"
                  decimalCharacter=","
                  digitGroupSeparator="."
                  onChange={(event, value) => setTotaalbedrag(value)}
                  required="true"
                  style={{ width: "100%" }}
                />
              </Grid>
              <Grid item xs={12} md={3} style={{ maxWidth: "100%" }}>
                <FormControl  >
                  <InputLabel id="demo-simple-select-label">
                    Categorie
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    style={{ width: 300 }}
                    value={categorie}
                    label="Reden"
                    onChange={handleChange}
                  >
                    <MenuItem value={"GEBOUWEN"}>
                      gebouwen
                    </MenuItem>
                    <MenuItem value={"ROLLENDMATERIEEL"}>
                      rollend materieel
                    </MenuItem>
                    <MenuItem value={"KLEINMATERIEEL"}>
                      klein materieel(vb gsm)
                    </MenuItem>
                    <MenuItem value={"KANTOOR"}>
                      kantoor
                    </MenuItem>
                    <MenuItem value={"INDUSTRIELEGEBOUWEN"}>
                      industriële gebouwen
                    </MenuItem>
                    <MenuItem value={"MEUBILAIRENMACHINES"}>
                      meubilair en machines
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
              <div className="container">
                <div className="row">
                    <form>
                       
                        <div className="form-group">
                            <input type="file" 
                            // value={file}
                            multiple
                            onChange={(e) => setFile(e.target.files)}

                              />
                        </div>
                    
                    </form>
                </div>
            </div>
              </Grid>
              <Grid item xs={12} md={12} style={{ marginTop: "5%" }}>
                <Slider
                  aria-label="Looptijd"
                  getAriaValueText={valuetext}
                  valueLabelDisplay="on"
                  disabled={disable}
                  step={1}
                  marks={marks}
                  onChange={(e) => setTermijn(e.target.value)}
                  value={termijn}
                  min={(() => {
                    switch (categorie) {
                      case "GEBOUWEN":
                        return 1;
                      case "ROLLENDMATERIEEL":
                        return 1;
                      case "KLEINMATERIEEL":
                        return 1;
                      case "KANTOOR":
                        return 1;
                      case "INDUSTRIEELEGEBOUWEN":
                        return 1;
                      case "MEUBILAIRENMACHINES":
                        return 1;
                    }
                  })()}
                  max={(() => {

                    switch (categorie) {
                      case "GEBOUWEN":
                        return 33;
                      case "ROLLENDMATERIEEL":
                        return 5;
                      case "KLEINMATERIEEL":
                        return 3;
                      case "KANTOOR":
                        return 33;
                      case "INDUSTRIEELEGEBOUWEN":
                        return 20;
                      case "MEUBILAIRENMACHINES":
                        return 10;
                    }
                  })()}
                /> {console.log(Slider.getAriaValueText)}
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  multiline="true"
                  minRows={5}
                  placeholder="Typ hier de verantwoording voor uw kredietaanvraag..."
                  style={{ width: "100%" }}
                  onChange={(e) => setVerantwoording(e.target.value)}
                  value={verantwoording}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <Button variant="contained" type="submit">verstuur </Button>


                  <Alert message="alert"></Alert>
              </Grid>
            </Grid>
          </Box>
        </Typography>
      </Box>
    </Modal>

  );
})
