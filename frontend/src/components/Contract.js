import React from 'react'
// import Base64toBlob from 'Base64toBlob'
import ContractService from '../services/contract-service'
import KredietAanvraagService from '../services/kredietaanvraag-service';
import PDFViewer from 'pdf-viewer-reactjs'
import { useParams } from 'react-router-dom';
import { jsPDF } from "jspdf";
import Button from "@mui/material/Button";

export default function Contract(props) {
    const [contract, setContract] = React.useState([]);
    const [krediet, setKrediet] = React.useState([]);
    let blob = null;
    let url = null;
    const { id } = useParams();

    React.useEffect(() => {
    
        ContractService.create(id).then((response) => {
            console.log("create response ", response);
            window.location.reload();
        })
      
    }, [])

    React.useEffect(() => {
        KredietAanvraagService.get(id).then((response) => {
            setKrediet(response.data);
        })
    }, [])

    React.useEffect(() => {

        ContractService.get(id).then((response) => {
            setContract(response.data);
        })
    }, [])



    function dataURItoBlob(dataURI) {
        const byteString = window.atob(decodeURIComponent(dataURI));
        console.log("bytestring", byteString);
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const int8Array = new Uint8Array(arrayBuffer);
        for (let i = 0; i < byteString.length; i++) {
            int8Array[i] = byteString.charCodeAt(i);
        }
        // try {
        //     var file = new File([int8Array], {type:"application/pdf"});
        // } catch(e) {
        //     // when File constructor is not supported
        //     file = new Blob([int8Array], {type:"application/pdf"});
        // }
        const blob = new Blob([int8Array], { type: 'application/pdf' });
        return blob;
        //return file;
    }

    function openPDF() {
        blob = dataURItoBlob(contract.bestand);
        url = URL.createObjectURL(blob);
        window.open(url, '_blank');
    }


    return (
        <div style={{ marginTop: "25px" }}>
            {/* {contract.map((cont) => ( */}
            <div>
                {/* <PDFViewer

                        document={{
                            base64: cont.bestand,
                        }}
                    /> */}
                <p>{krediet.feedback}</p>
                {krediet.status === "GOEDGEKEURD" ?
                    <Button onClick={openPDF}>Druk af</Button> : <></>}

            </div>
            {/* ))} */}
        </div>

    )

}