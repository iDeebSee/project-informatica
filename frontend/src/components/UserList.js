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
import { PopupUserAanmaken } from "./PopupUserAanmaken";
import { PopupUserEditen } from "./PopupUserEditen";
import UserService from "../services/user-service";
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
import userService from "../services/user-service";
import roleService from "../services/role-service";





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

export default function UserList() {
  const uchildRef = React.useRef();
  const childrefEdit = React.useRef();

  const [users, setUsers] = React.useState([]);
  const [roles, setRoles] = React.useState([]);





  React.useEffect(() => {

    UserService.getAll().then((response) => {
      console.log("data", response.data)
      setUsers(response.data)
    }).then(error => {
      if (error.response && error.response.status === 401) {
        EventBus.dispatch("logout");
      }
    })



  }, [])


  // function deleteKA(id) {
  //   userService.delete(id).then((response) => {
  //     console.log("delete", response.data)
  //     window.location.reload();
  //   }).then(error => {
  //     if (error.response && error.response.status === 401) {
  //       EventBus.dispatch("logout");
  //     }
  //   })

  // }



  return (
    <Container maxWidth="lg" style={{ position: "relative", marginTop: 20 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <ButtonGroup
            style={{ float: "right", marginRight: 15 }}
            variant="contained"
            aria-label="outlined primary button group"
          >
            <Button style={{ align: borderRight }} onClick={() => uchildRef.current.handleOpen()}>
              maak gebruiker
            </Button>
            <PopupUserAanmaken ref={uchildRef} ></PopupUserAanmaken>
          </ButtonGroup>
        </Grid>
        <Grid item xs={12}>
          <React.Fragment>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>naam</TableCell>
                  <TableCell>voornaam </TableCell>
                  <TableCell>e-mail</TableCell>
                  <TableCell>status</TableCell>


                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.lastName}</TableCell>
                    <TableCell>{row.firstName}</TableCell>
                    <TableCell> {row.email}</TableCell>

                    <TableCell> {row.enabled ? "Actief" : "Non-Actief"} </TableCell>



                    <TableCell align="right">
                      <ButtonGroup
                        variant="contained"
                        aria-label="outlined primary button group"
                      >
                        {/* we moeten vanuit hier de detailAanvraagpagina openen, zit momenteel in een modal  */}

                        <Button onClick={() => childrefEdit.current.handleOpen(row)} >bewerken </Button>
                        <PopupUserEditen ref={childrefEdit} ></PopupUserEditen>

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
