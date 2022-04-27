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
import { SignModal } from "../components/SignModal"
import CanvasDraw from "react-canvas-draw";
import AuthService from '../services/auth-service';




export default function Detailaanvraag() {

    const [image, setImage] = React.useState()
    const [sign, setSign] = React.useState("")
    const [signImage, setSignImage] = React.useState("")
    const [krediet, setKredieten] = React.useState([])
    const [user, setUser] = React.useState([])
    const date = new Date().toLocaleDateString()

    const { id } = useParams();
    const signRef = React.useRef();
    let userID = AuthService.getCurrentUser().id;


    React.useEffect(() => {

        // html2canvas(("savedDrawing" + "_uID:" + userID).toString()).then((canvas) => {
        //     const imgData = canvas.toDataURL('image/png');
        //     setSign(imgData)
        // })
        setSign(("savedDrawing" + "_uID:" + userID).toString())
        setSignImage(localStorage.getItem(("signImage" + userID+window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1)).toString()))
        
    }, [])


    

    function printDocument() {
        const input = document.getElementById('divToPrint');
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                // pdf.addPage(null, 'l')
                pdf.addImage(imgData, 'PNG', 55, -130, 0, 0, null, null, -90);
                // pdf.output('dataurlnewwindow');
                pdf.save("download.pdf");
            });
    }


    function showDocument() {
        // console.log(image)
        // window.open(`data:image/png;base64${image}`, "target: _blank")
        // var img = new Image();
        // img.src = "data:image/jpg;base64," + image.d;

        var w = window.open("");
        // w.document.write(image.outerHTML);
        w.document.write('<iframe src="' + image + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>');

    }


    React.useEffect(() => {

        kredietaanvraagService.get(id).then((response) => {
            console.log("data", response.data)
            setKredieten(response.data)
            UserService.getUser(response.data.klantID).then((response) => {
                setUser(response.data)
            })
        })
            .then(error => {
                if (error.response && error.response.status === 401) {
                    EventBus.dispatch("logout");
                }
            })

    }, [])



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
                    display: "inline-flex", width: '297mm', //was 180mm
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
                                    <ListItemText primary={`E-mail: ${user.email}`} />
                                </ListItem>
                                <ListItem >
                                    <ListItemText primary={`Voornaam: ${user.firstName}`} />
                                </ListItem>
                                <ListItem >
                                    <ListItemText primary={`Naam: ${user.lastName}`} />
                                </ListItem>

                            </List>
                        </Box>
                    </Grid>
                    <Grid item xs={4} >
                        <Box sx={{ maxWidth: 200, bgcolor: 'background.paper' }}>
                            <List>
                                <ListItem disablePadding>

                                    <ListItemText primary="Financieel" />
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
                    <Grid item xs={4} >
                        <Box sx={{ maxWidth: 200, bgcolor: 'background.paper' }}>
                            <List>
                                <ListItem disablePadding>
                                    <ListItemText primary="Handtekening" />
                                </ListItem>
                            </List>
                            <Divider />
                            <List>
                                <ListItem >
                                    <img src={signImage} style={{ width: "200px", height: "150px", border: "1px solid grey" }} />
                                    {/* <CanvasDraw
                        
                                        disabled
                                        hideGrid
                                        saveData={localStorage.getItem(sign)}
                                    /> */}
                                </ListItem>
                                <ListItem >
                                    {signImage!=null ? 
                                    <ListItemText primary={date} /> : <></> }
                                </ListItem>
                            </List>
                        </Box>
                    </Grid>

                </Grid>
                <Grid item xs={12} md={6}>

                    <img src={image} style={{ width: "700px", border: "1px solid grey" }} />

                </Grid>
                <Grid item xs={12} md={6} style={{ margin: '30px auto 5px auto' }}>
                    <ButtonGroup variant="contained" aria-label="outlined primary button group" style={{ position: 'relative' }}>
                        <Button variant="contained">contract uploaden</Button>
                        <Button variant="contained" onClick={() => signRef.current.handleOpen()}>contract tekenen</Button>
                        <SignModal ref={signRef}></SignModal>
                        <Button onClick={showDocument} variant="contained">contract bekijken</Button>
                        <Button onClick={printDocument}>Druk af</Button>
                    </ButtonGroup>
                </Grid>
            </Grid>




        </div>

    );
};

