import * as React from 'react';
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";
import kredietaanvraagService from "../services/kredietaanvraag-service";
import EventBus from "../common/eventBus"
import { useParams } from 'react-router-dom';
import UserService from "../services/user-service"




export default function Detailaanvraag() {

    const [image, setImage] = React.useState()
    const [krediet, setKredieten] = React.useState([])
    const [user, setUser] = React.useState([])
    const [userID, setUserID] = React.useState([])


    const { id } = useParams();



    function printDocument() {
        const input = document.getElementById('divToPrint');
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                pdf.addImage(imgData, 'PNG', 0, 0);
                // pdf.output('dataurlnewwindow');
                pdf.save("download.pdf");
            });
    }






    React.useEffect(() => {

        kredietaanvraagService.get(id).then((response) => {
            console.log("data", response.data)
            setKredieten(response.data)
            setUserID(response.data.klantid)

        }).then(error => {
            if (error.response && error.response.status === 401) {
                EventBus.dispatch("logout");
            }
        })

    }, [])

    React.useEffect(() => {
        UserService.getUser(userID).then((response) => {
            setUser(response.data)
            console.log(response.data)
        })
    })

    const input = document.getElementById('divToPrint');
    html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        setImage(imgData)
    })
    //console.log(krediet)

    return (
        <div >
            <Grid container spacing={0} style={{ top: 20, height: 500, position: 'relative', left: 0 }}>
                <Grid item id="divToPrint" style={{
                    display: "inline-flex", width: '180mm',
                    //minHeight: '297mm',
                    padding: 10, fontSize: "10pt"
                }} xs={12} md={6}>
                    <Grid item xs={4}  >
                        <Box sx={{ maxWidth: 200, bgcolor: 'Background.paper' }}>

                            <List>
                                <ListItem disablePadding>
                                    <ListItemText primary="Persoonsgegevens" />
                                </ListItem>
                            </List>
                            <Divider />
                            <List>
                                <ListItem >
                                    <ListItemText primary={`E-mail: ${krediet.email}`} />
                                </ListItem>
                                <ListItem >
                                    <ListItemText primary={`Voornaam: ${user.firstName}`} />
                                </ListItem>
                                <ListItem >
                                    <ListItemText primary={`Naam: ${krediet.lastName}`} />
                                </ListItem>

                            </List>
                        </Box>
                    </Grid>
                    <Grid item xs={4} >
                        <Box sx={{ maxWidth: 200, bgcolor: 'background.paper' }}>
                            <List>
                                <ListItem disablePadding>

                                    <ListItemText primary="fnancieel" />
                                </ListItem>
                            </List>
                            <Divider />
                            <List>
                                <ListItem >
                                    <ListItemText primary={`Naam: ${krediet.naam}`} />
                                </ListItem>
                                <ListItem >
                                    <ListItemText primary={`Zelf gefinancierd: €${krediet.eigenVermogen}`} />
                                </ListItem>
                                <ListItem >
                                    <ListItemText primary={`Totaal bedrag: €${krediet.lening}`} />
                                </ListItem>
                                <ListItem >
                                    <ListItemText primary={`Status: ${krediet.status ? krediet.status : "null"}`} />
                                </ListItem>
                                <ListItem >
                                    <ListItemText primary={`Categorie: ${krediet.categorie}`} />
                                </ListItem>
                                <ListItem >
                                    <ListItemText primary={`Looptijd: ${krediet.looptijd}`} />
                                </ListItem>
                                <ListItem >
                                    <ListItemText primary={`Verantwoording: ${krediet.verantwoording}`} />
                                </ListItem>
                            </List>
                        </Box>
                    </Grid>

                </Grid>
                <Grid item xs={12} md={6}>

                    <img src={image} style={{ width: "700px", border: "1px solid grey" }} />

                </Grid>
                <Grid item xs={12} md={6}>
                    <ButtonGroup variant="contained" aria-label="outlined primary button group" style={{ position: 'relative' }}>
                        <Button variant="contained">contract uploaden</Button>
                        <Button variant="contained">contract tekenen</Button>
                        <Button variant="contained">contract bekijken</Button>
                        <Button onClick={printDocument}>Druk af</Button>
                    </ButtonGroup>
                </Grid>

            </Grid>




        </div>

    );
};

