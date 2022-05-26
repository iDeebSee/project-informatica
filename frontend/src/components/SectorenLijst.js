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
import { CreateSector } from "./CreateSector";
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
import sectorService from "../services/sector-service";





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

export default function ListSectoren() {
  const childCreateRef = React.useRef();
  const [sectoren, setSectoren] = React.useState([]);



  React.useEffect(() => {
    sectorService.getAll().then((response) => {
      console.log("data", response.data)
      setSectoren(response.data)


    })
  }, []);

  // React.useEffect(() => {
  //     sectorService.getAll().then((response) => {

  //     })
  // }, [])

  function deleteSector(id) {
    sectorService.delete(id).then((response) => {
      console.log("delete", response.data)
      window.location.reload();
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
          <ButtonGroup
            style={{ float: "right", marginRight: 15 }}
            variant="contained"
            aria-label="outlined primary button group"
          >
            <Button style={{ align: borderRight }} onClick={() => childCreateRef.current.handleOpen()}>
              maak
            </Button>
            <CreateSector ref={childCreateRef} ></CreateSector>
          </ButtonGroup>
        </Grid>
        <Grid item xs={12}>
          <React.Fragment>
            <Table size="small" style={{ width: "60%", margin: "auto" }}>
              <TableHead>
                <TableRow>
                  <TableCell>naam</TableCell>
                  <TableCell>NACE code</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sectoren.map((row) => (

                  <TableRow key={row.id} style={row.isBlack ? { textColor: "red", backgroundColor: "gray" } : { backgroundColor: "white", color: "white" }}>
                    <TableCell>{row.naam}</TableCell>
                    <TableCell>{row.nasiCode}</TableCell>
                    <ButtonGroup
                      style={{ float: "right" }}
                      variant="contained"
                      aria-label="outlined primary button group"
                    >
                      <Button onClick={() => deleteSector(row.id)}>verwijderen </Button>
                    </ButtonGroup>

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
