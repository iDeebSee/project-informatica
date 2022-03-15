import Button from '@mui/material/Button';
import * as React from "react";
import Grid from "@mui/material/Grid";
import KredietAanvraagService from "../services/kredietaanvraag-service"
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

 export const  Popup= React.forwardRef((props, ref)=> {
    
    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);
    const [termijn, setTermijn]= React.useState(0)
    const [zelfGefinancierd,setZelfGefinancieerd ]= React.useState(0)
    const [totaalbedrag, setTotaalbedrag]= React.useState(0)
    const [naam, setNaam]= React.useState("")
    const [categorie, setCategorie]= React.useState("")
    const [verantwoording, setVerantwoording]= React.useState("")
    const [file,setFile]=React.useState("")
    


    const handleChange = (event) => {
      setCategorie(event.target.value)

    };
    
    React.useImperativeHandle(ref, () => ({
         handleOpen () {
          setOpen(true);
        
        }
      }));

      function valuetext(value) {
        if (value == 1) return `${value} maand`;
        else if (value == 12) return `${value} Jaar`;
        else return `${value} maanden`;
      
      }
      
     function handleSubmit(e){
      e.preventDefault(); 
      KredietAanvraagService.create(
          totaalbedrag,
          termijn,
          naam,
          verantwoording,
          zelfGefinancierd,
          categorie
          
      ).then(response => {
        console.log(response.data)
        window.location.reload();
      })


     }

      const marks = [
        {
          value: 1,
          label: "1 maand",
        },
        {
          value: 12,
          label: "1 jaar",
        },
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
                <TextField
                  id="zelfgefinancierd"
                  required="true"
                  label="Zelf gefinancierd (€)"
                  variant="outlined"
                  style={{ width: "100%" }}µ
                  onChange={(e) => setZelfGefinancieerd(e.target.value)}

                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  id="totaalbedrag"
                  required="true"
                  label="Totaalbedrag (€)"
                  variant="outlined"
                  style={{ width: "100%" }}
                  onChange={(e) => setTotaalbedrag(e.target.value)}
                  value={totaalbedrag}
                />
              </Grid>
              <Grid item xs={12} md={3} style= {{ maxWidth: "100%" }}>
                <FormControl  >
                  <InputLabel id="demo-simple-select-label">
                    Categorie
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    style={{width : 300}}
                    value={categorie}
                    label="Reden"
                    onChange={handleChange}
                  >
                    <MenuItem value={"GEBOUWEN"}>
                    meubilair en machines
                    </MenuItem>
                    <MenuItem value={"ROLLENDMATERIEEL"}>
                    rollend materieel(vb laptop)
                    </MenuItem>
                    <MenuItem value={"KLEINMATERIEEL"}>
                    klein materieel(vb gsm)
                    </MenuItem>
                    <MenuItem value={"KANTOOR"}>
                    kantoor
                    </MenuItem>
                    <MenuItem value={"INDUSTRIEELEGEBOUWEN"}>
                    gebouwen
                    </MenuItem>
                    <MenuItem value={"MEUBELAIRENMACHINES"}>
                    industriële gebouwen
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} md={12} style={{marginTop: "5%"}}>
                <Slider
                  aria-label="Looptijd"
                  defaultValue={6}
                  getAriaValueText={valuetext}
                  valueLabelDisplay="on"
                  step={1}
                  marks={marks}
                  onChange={(e) => setTermijn(e.target.value)}
                  value={termijn}
                  // nog een if statement dat checkt welke categorie
                  // voor 
                  // meubilair en machines (tot 10j), rollend materieel(vb laptop) (tot 5j), klein materieel(vb gsm) (tot 3j)
                  // kantoor (tot 33j), gebouwen (tot 33j), industriele gebouwen (tot 20j)
                  min={1}
                  max={12}
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


              </Grid>
            </Grid>
          </Box>
        </Typography>
      </Box>
    </Modal>
  
   );
} )
