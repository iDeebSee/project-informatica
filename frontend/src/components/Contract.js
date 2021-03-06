import React from 'react'
// import Base64toBlob from 'Base64toBlob'
import ContractService from '../services/contract-service'
import KredietAanvraagService from '../services/kredietaanvraag-service';
import PDFViewer from 'pdf-viewer-reactjs'
import { useParams } from 'react-router-dom';
import { jsPDF } from "jspdf";
import Button from "@mui/material/Button";
import Input from '@mui/material/Input';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import SignCanvas from './SignCanvas';
import AuthService from '../services/auth-service'
import FormControl from '@mui/material/FormControl';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function Contract(props) {
    const [contract, setContract] = React.useState([]);
    const [krediet, setKrediet] = React.useState([]);
    const [ratios, setRatios] = React.useState([]);
    const [liquiditeit, setLiquiditeit] = React.useState([]);
    const [solvabiliteit, setSolvabiliteit] = React.useState([]);
    const [rendabiliteit, setRendabiliteit] = React.useState([]);
    const [bestand, setBestand] = React.useState();
    let blob = null;
    let url = null;
    const { id } = useParams();

    React.useEffect(() => {
        AuthService.getLoggedUser().then((response) => {
            console.log("logged in user from backend: ", response.data.principal)
        });
    })

    const currentUser = AuthService.getCurrentUser();


    React.useEffect(() => {
        KredietAanvraagService.get(id).then((response) => {
            setKrediet(response.data);

        })
    }, [])

    React.useEffect(() => {

        ContractService.get(id).then((response) => {
            setContract(response.data);
            console.log("contract", response.data);
        })
    }, [])

    React.useEffect(() => {
        KredietAanvraagService.getRatios(id).then((response) => {
            setLiquiditeit(numberWithSep(response.data.liquiditeit));
            setSolvabiliteit(numberWithSep(response.data.solvabiliteit));
            setRendabiliteit(numberWithSep(response.data.rendabiliteit));
            // console.log("ratios", numberWithSep(result));
            setRatios(response.data);
        })
    }, [])

    const numberWithSep = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }


    function dataURItoBlob(dataURI) {
        console.log("dataURI", decodeURIComponent(dataURI));
        const byteString = window.atob(decodeURIComponent(dataURI));
        console.log("bytestring", byteString);
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const int8Array = new Uint8Array(arrayBuffer);
        for (let i = 0; i < byteString.length; i++) {
            int8Array[i] = byteString.charCodeAt(i);
        }

        const blob = new Blob([int8Array], { type: 'application/pdf' });
        return blob;

    }

    function openPDF() {
        blob = dataURItoBlob(contract.bestand);
        url = URL.createObjectURL(blob);
        window.open(url, '_blank');
    }

    function uploadFile() {
        console.log(bestand);
        if (bestand != null) {
            ContractService.uploadFile(id, bestand).then((response) => {
                console.log(response)
            });
            //window.location.reload();
        } else {
            console.log("geen bestand")
        }

    }


    return (

        <Box >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Item><h1>{krediet.feedback}</h1></Item>
                </Grid>

                <Grid item xs={4}>
                    <Item style={{ fontWeight: "bold" }}>Liquiditeit: {liquiditeit}</Item>
                </Grid>
                <Grid item xs={4}>
                    <Item style={{ fontWeight: "bold" }}>Rendabiliteit: {rendabiliteit}</Item>
                </Grid>
                <Grid item xs={4}>
                    <Item style={{ fontWeight: "bold" }}>Solvabiliteit: {solvabiliteit}</Item>
                </Grid>

                <Grid item xs={12} >
                    {currentUser.role === "KLANT" && krediet.status === "GOEDGEKEURD" && contract.gehandtekend === false ?
                        <Item style={{ margin: "auto", width: "fit-content" }}>
                            <SignCanvas id={krediet.id}></SignCanvas>
                        </Item>
                        : <></>}
                </Grid>
                <Grid item xs={1} style={{ marginTop: "30px" }}>

                    {krediet.status === "GOEDGEKEURD" ? <Paper style={{ textAlign: "center", marginLeft: "10px" }}><Button onClick={openPDF}>Druk af</Button> </Paper> : <></>}

                </Grid>

            </Grid>


        </Box >


    )

}