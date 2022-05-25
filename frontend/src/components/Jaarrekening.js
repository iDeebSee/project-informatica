import * as React from "react";

import { Container } from "@mui/material";
import AuthService from "../services/auth-service";
import KredietAanvraagService from '../services/kredietaanvraag-service';
import KBOservice from '../services/KBO-service';
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

export default function Jaarrekening() {
    const childRef = React.useRef();
    const searchRef = React.useRef();
    const [onderneming, setOnderneming] = React.useState([]);
    const vatFromUrl = window.location.pathname.split('/')[2];

    let user = AuthService.getCurrentUser();

    React.useEffect(() => {
        userService.getAll().then((response) => {
            console.log("all them users: ", response.data)
        })
    }, [])

    React.useEffect(() => {
        KBOservice.getByVat(vatFromUrl).then((response) => {
            console.log("onderneming", response.data)
            setOnderneming(response.data)
        })
    }, [])


    return (
        <div >
            <center>
                <h1>Jaarrekening</h1>
            </center>
            <Container maxWidth="lg" style={{ width: "20%", marginLeft: "auto", marginTop: 20, border: "1px solid black", fontWeight: "bold" }}>
                <p style={{ margin: "12px" }}>Naam: {onderneming.name}</p>
                <p style={{ margin: "12px" }}>VAT: {onderneming.vat}</p>
                <p style={{ margin: "12px" }}>Nacibel code: {onderneming.nacbelCode}</p>
                <p style={{ margin: "12px" }}>Eigen vermogen: €{onderneming.equity}</p>
                <p style={{ margin: "12px" }}>Activa: €{onderneming.assets}</p>
                <p style={{ margin: "12px" }}>Totaal: €{onderneming.result}</p>
                <p style={{ margin: "12px" }}>Tax: €{onderneming.tax}</p>
                <p style={{ margin: "12px" }}>Totaal na belasting: €{onderneming.resultAfterTax}</p>
                <p style={{ margin: "12px" }}>Financiele kost: €{onderneming.financialCosts}</p>
                <p style={{ margin: "12px" }}>Vlottende activa: €{onderneming.currentAssets}</p>
                <p style={{ margin: "12px" }}>Stock: €{onderneming.stock}</p>
                <p style={{ margin: "12px" }}>Vaste activa: €{onderneming.fixedAssets}</p>
                <p style={{ margin: "12px" }}>Korte termijn schuld: €{onderneming.shortTermDebt}</p>
                <p style={{ margin: "12px" }}>Lange termijn schuld: €{onderneming.longTermDebt}</p>
                <p style={{ margin: "12px" }}>Afschrijving: €{onderneming.depreciation}</p>
                <p style={{ margin: "12px" }}>Waardevermindering: €{onderneming.writeDown}</p>
            </Container>
        </div>
    );
}
