import * as React from "react";
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
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Icon from '@mui/material/Icon';
import SearchIcon from '@mui/icons-material/Search';
import KredietAanvraagService from '../services/kredietaanvraag-service';
import KBOservice from '../services/KBO-service';
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

export default function ListOndernemingen() {
    const childRef = React.useRef();
    const searchRef = React.useRef();
    const [ondernemingen, setOndernemingen] = React.useState([]);

    let user = AuthService.getCurrentUser();

    React.useEffect(() => {
        userService.getAll().then((response) => {
            console.log("all them users: ", response.data)
        })
    }, [])




    function handleChange(event) {
        if (event != "" || event != null) {
            KBOservice.searchByNameOrVat(event).then((response) => {
                setOndernemingen(response.data)
                console.log("response", response.data)
            })
        }
    }


    React.useEffect(() => {
        KBOservice.getAll().then((response) => {
            setOndernemingen(response.data)
        })
    }, [])


    return (
        <Container maxWidth="lg" style={{ position: "relative", marginTop: 20 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    {user.role === "KREDIETBEOORDELAAR" ? <Paper
                        component="form"
                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                    >

                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Zoek onderneming"
                            inputProps={{ 'aria-label': 'Zoek onderneming' }}
                            onChange={e => handleChange(e.target.value)}
                        />
                        <Icon type="" sx={{ p: '10px' }} aria-label="search">
                            <SearchIcon />
                        </Icon>


                    </Paper> : <></>}

                </Grid>
                <Grid item xs={12}>
                    <React.Fragment>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Naam</TableCell>
                                    <TableCell>VAT</TableCell>
                                    <TableCell>Activa</TableCell>
                                    <TableCell>Vlottende Activa</TableCell>
                                    <TableCell>Nacibel</TableCell>


                                    <TableCell align="right"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                {ondernemingen.map((row) => (
                                    <TableRow key={row.id}>

                                        <TableCell>{row.id}</TableCell>
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell>{row.vat}</TableCell>
                                        <TableCell>€ {row.assets}</TableCell>
                                        <TableCell>€ {row.currentAssets}</TableCell>
                                        <TableCell>{row.nacbelCode}</TableCell>


                                        <TableCell align="right">
                                            <ButtonGroup
                                                variant="contained"
                                                aria-label="outlined primary button group"
                                            >
                                                {/* we moeten vanuit hier de detailAanvraagpagina openen, zit momenteel in een modal  */}
                                                <Button onClick={() => window.open("/ondernemingen/" + row.vat, "_self")}>Jaarrekening </Button>
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
