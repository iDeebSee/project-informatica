import Button from '@mui/material/Button';
import * as React from "react";
import Grid from "@mui/material/Grid";
import RoleService from '../services/role-service';
import EventBus from "../common/eventBus"

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
import roleService from '../services/role-service';
import AuthService from '../services/auth-service';
import authService from '../services/auth-service';
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

export const PopupUserAanmaken = React.forwardRef((props, ref) => {

  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const [roles, setRoles] = React.useState([]);
  const [naam, setNaam] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [role, setRole] = React.useState("");
  const [wachtwoord, setWachtwoord] = React.useState("");
  const [voornaam, setVoornaam] = React.useState("");


 




  const handleChange = (event) => {
    setRole(event.target.value)

  };


  React.useImperativeHandle(ref, () => ({
    handleOpen() {
      setOpen(true);

    }
  }));

  React.useEffect(()=>{

    roleService.getAll().then(res=>{
        setRoles(res.data)
        console.log(res.data)
    })

  },[])

  function valuetext(value) {
    if (value == 1) return `${value} maand`;
    else if (value == 12) return `${value} Jaar`;
    else return `${value} maanden`;

  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(email,wachtwoord,voornaam,naam,role)

    authService.register(email,wachtwoord,voornaam,naam,role).then(response => {
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
          maak een nieuwe gebruiker aan
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Vul hier de gegevens in voor de gebruiker.
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
                  id="voornaam"
                  required="true"
                  label="voornaam"
                  variant="outlined"
                  style={{ width: "100%" }}
                  onChange={(e) => setVoornaam(e.target.value)}
                  value={voornaam}
                 
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  id="achternaam"
                  required="true"
                  label="achternaam"
                  variant="outlined"
                  style={{ width: "100%" }}
                  onChange={(e) => setNaam(e.target.value)}
                  value={naam}

                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  id="email"
                  required="true"
                  label="email"
                  variant="outlined"
                  style={{ width: "100%" }}
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                 
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  id="<wachtwoord>"
                  required="true"
                  label="wachtwoord"
                  variant="outlined"
                  style={{ width: "100%" }}
                  onChange={(e) => setWachtwoord(e.target.value)}
                  value={wachtwoord}
                 
                />
              </Grid>
              <Grid item xs={12} md={3} style={{ maxWidth: "100%" }}>
                <FormControl  >
                  <InputLabel id="demo-simple-select-label">
                    Rollen
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    style={{ width: 300 }}
                    value={role}
                    label="Rol"
                    onChange={handleChange}
                  >
                      { roles.map((rol)=>(
                          <MenuItem value={rol.role}>
                          {rol.role}
                        </MenuItem>

                      ))}
                    
                    
                    
                  </Select>
                </FormControl>
              </Grid>

                
              
              <Grid item xs={12} md={12}>
                <Button variant="contained" type="submit">verstuur </Button>


              </Grid>
            </Grid>
          </Box>
        </Typography>
      </Box>
    </Modal>

  )});

