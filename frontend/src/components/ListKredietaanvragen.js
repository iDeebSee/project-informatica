import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { borderRight } from "@mui/system";
import { Popup } from "./Popup";
import AuthService from "../services/auth-service";
import kredietaanvraagService from "../services/kredietaanvraag-service";
import EventBus from "../common/eventBus"
import { SearchBar } from "./SearchBar";
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';
import SearchIcon from '@mui/icons-material/Search';
import KredietAanvraagService from '../services/kredietaanvraag-service'
import ContractService from '../services/contract-service'
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
import userService from "../services/user-service";





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


function preventDefault(event) {
  event.preventDefault();
}

export default function ListKredietaanvragen() {
  const childRef = React.useRef();
  const searchRef = React.useRef();
  const [krediet, setKredieten] = React.useState([]);



  let user = AuthService.getCurrentUser();

  React.useEffect(() => {
    userService.getAll().then((response) => {
      console.log("all them users: ", response.data)
    })
  }, [])


  function handleChange(event) {
    if (event != "" || event != null) {
      KredietAanvraagService.getByName(event).then((response) => {
        setKredieten(response.data)
        // console.log("response", response.data)
      })
    }
  }


  React.useEffect(() => {
    if (user.role === "KLANT") {
      kredietaanvraagService.getByUserID(user.id).then((response) => {
        console.log("data", response.data)
        setKredieten(response.data)

      }).then(error => {
        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      })
    }


  }, [])


  React.useEffect(() => {

    if (user.role === "KANTOOR") {

      kredietaanvraagService.getAll().then((response) => {
        console.log("data", response.data)
        setKredieten(response.data)

      }).then(error => {
        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      })
    }

  }, [])

  React.useEffect(() => {
    if (user.role === "KREDIETBEOORDELAAR") {
      kredietaanvraagService.getByStatus("INBEHANDELING")
      .then((response) => {
        console.log("status", response.data)
        setKredieten(response.data)
    
      }).then(error => {
        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      })
    }
    return () => {
      setKredieten([]); // This worked for me
    };

  }, [])

  React.useEffect(() => {

    if (user.role === "COMPLIANCE") {

      kredietaanvraagService.getByStatus("VERDACHT").then((response) => {
        console.log("status", response.data)
        setKredieten(response.data)

      }).then(error => {
        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      })

    }

  }, [])


  function deleteKA(id) {
    kredietaanvraagService.delete(id).then((response) => {
      console.log("delete", response.data)
      window.location.reload();
    }).then(error => {
      if (error.response && error.response.status === 401) {
        EventBus.dispatch("logout");
      }
    })
  }

  function afkeuren(id) {
    kredietaanvraagService.updateStatus(id, "GEWEIGERD").then((response) => {
      console.log(response);
      window.location.reload();
    })
  }

  function goedkeuren(id) {

    kredietaanvraagService.updateStatus(id, "GOEDGEKEURD").then((response) => {
      console.log(response);
      window.location.reload();
    });
    ContractService.create(id);
  }

  function openDetail(id) {

    ContractService.create(id).then((response) => {
      console.log("create response ", response);
      //window.location.reload();
      window.open("/contract/" + id, "_self")

    })

  }

  return (
    <Container maxWidth="lg" style={{ position: "relative", marginTop: 20 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {user.role === "KANTOOR" || user.role === "ADMINISTRATOR" ? <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
          >

            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Zoek kredieten op naam of id"
              inputProps={{ 'aria-label': 'Zoek kredieten' }}
              onChange={e => handleChange(e.target.value)}
            />
            <Icon type="" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </Icon>


          </Paper> : <></>}
          {user.role === "KANTOOR" || user.role === "KLANT" ?
            <ButtonGroup
              style={{ float: "right", marginRight: 15 }}
              variant="contained"
              aria-label="outlined primary button group"
            >
              <Button style={{ align: borderRight }} onClick={() => childRef.current.handleOpen()}>
                maak
              </Button>
              <Popup ref={childRef} ></Popup>
            </ButtonGroup> : <></>
          }
        </Grid>
        <Grid item xs={12}>
          <React.Fragment>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Naam</TableCell>
                  <TableCell>Verantwoording</TableCell>
                  <TableCell>Zelf gefinancierd</TableCell>
                  <TableCell>lening</TableCell>
                  <TableCell>looptijd</TableCell>
                  <TableCell>status</TableCell>


                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>

                {krediet.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.naam}</TableCell>
                    <TableCell>{row.verantwoording}</TableCell>
                    <TableCell>€ {row.eigenVermogen}</TableCell>
                    <TableCell>€ {row.lening}</TableCell>
                    <TableCell>{row.looptijd}</TableCell>
                    <TableCell style={row.status === "INBEHANDELING" ? { color: "orange" } : row.status === "GEWEIGERD" || row.status === "VERDACHT" ? { color: "red" } : { color: "greenyellow" }}><p> {row.status === "INBEHANDELING" ? "IN BEHANDELING" : row.status}</p></TableCell>

                    <TableCell align="right">
                      <ButtonGroup
                        variant="contained"
                        aria-label="outlined primary button group"
                      >
                        {/* we moeten vanuit hier de detailAanvraagpagina openen, zit momenteel in een modal  */}
                        {user.role.toString() === "KLANT" || user.role.toString() === "KANTOOR" || user.role.toString() === "KREDIETBEOORDELAAR" || user.role.toString() === "COMPLIANCE" ?
                          <Button onClick={() => openDetail(row.id)}>details </Button> : <></>
                          //() => window.open("/contract/" + row.id, "_self")
                        }
                        {user.role.toString() === "KANTOOR" && row.status == "INBEHANDELING" ?
                          <Button onClick={() => childRef.current.handleOpen()} >bewerken </Button>
                          : <></>}
                        <Popup ref={childRef} ></Popup>
                        {(user.role.toString() === "KANTOOR" || user.role.toString() === "KLANT") && row.status == "INBEHANDELING" ?
                          <Button onClick={() => deleteKA(row.id)}>verwijderen </Button> : <></>}
                        {user.role.toString() === "KREDIETBEOORDELAAR" && row.status == "INBEHANDELING" ?
                          <Button color="error" onClick={() => afkeuren(row.id)}>Afkeuren </Button> : <></>}
                        {user.role.toString() === "KREDIETBEOORDELAAR" && row.status == "INBEHANDELING" ?
                          <Button color="success" onClick={() => goedkeuren(row.id)}>Goedkeuren </Button> : <></>}
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </React.Fragment>
        </Grid>
      </Grid>
    </Container>
  );
}
