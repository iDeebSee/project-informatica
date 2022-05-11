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


function preventDefault(event) {
  event.preventDefault();
}

export default function ListKredietaanvragen() {
  const childRef = React.useRef();
  const searchRef = React.useRef();
  const [krediet, setKredieten] = React.useState([]);




  let user = AuthService.getCurrentUser();


  function handleChange(event) {
    if(event != "" || event != null){
      KredietAanvraagService.getByName(event).then((response) => {
      setKredieten(response.data)
       // console.log("response", response.data)
    })
    }
  }


  React.useEffect(() => {
    if (user.role !== "ADMINISTRATOR" || user.role !== "KANTOOR" || user.role !== "KREDIETBEOORDELAAR") {
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

    if (user.role === "ADMINISTRATOR" || user.role === "KANTOOR" || user.role === "KREDIETBEOORDELAAR") {
     
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


  // React.useEffect(() => {

  //   console.log("child kredieten", searchRef.current.getKredieten())
  //   //setKredieten(searchRef.current.childKredieten)

  // }, [])




  function deleteKA(id) {
    kredietaanvraagService.delete(id).then((response) => {
      console.log("delete", response.data)
      //window.location.reload();
    }).then(error => {
      if (error.response && error.response.status === 401) {
        EventBus.dispatch("logout");
      }
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
                placeholder="Zoek kredieten"
                inputProps={{ 'aria-label': 'Zoek kredieten' }}
                onChange={e => handleChange(e.target.value)}
            />
            <Icon type="" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
            </Icon>


        </Paper> : <></>}
          <ButtonGroup
            style={{ float: "right", marginRight: 15 }}
            variant="contained"
            aria-label="outlined primary button group"
          >
            <Button style={{ align: borderRight }} onClick={() => childRef.current.handleOpen()}>
              maak
            </Button>
            <Popup ref={childRef} ></Popup>
          </ButtonGroup>
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
                    <TableCell align="right">
                      <ButtonGroup
                        variant="contained"
                        aria-label="outlined primary button group"
                      >
                        {/* we moeten vanuit hier de detailAanvraagpagina openen, zit momenteel in een modal  */}
                        <Button onClick={() => window.open("/detail/" + row.id, "_self")}>details </Button>

                        <Button onClick={() => childRef.current.handleOpen()} >bewerken </Button>
                        <Popup ref={childRef} ></Popup>
                        <Button onClick={() => deleteKA(row.id)}>verwijderen </Button>
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
