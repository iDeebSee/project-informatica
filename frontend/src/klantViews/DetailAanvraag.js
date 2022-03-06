import * as React from 'react';
import FeedbackDocumentPDF from '../components/FeedbackDocumentPDF';
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import {
  Modal,
  Typography,
  Box,
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


export default function Detailaanvraag() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const DetailpagePopup = (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Nieuwe kredietaanvraag indienen
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Vul hier de gegevens in voor uw kredietaanvraag. Druk op versturen
                        wanneer u klaar bent.
                        <Box
                            component="form"
                            sx={{
                                "& > :not(style)": { m: 1, width: "25ch" },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <Grid container spacing={2} style={{ width: "95%" }}>
                                hier komen de detailgegevens van een aanvraag.
                                <Grid item xs={6} md={12}>
                                    item 1 van de gegevens enz...
                                </Grid>
                                <Grid item xs={6} md={4}>
                                    <Button variant="contained">contract bekijken</Button>
                                </Grid>
                                <Grid item xs={6} md={4}>
                                    <Button variant="contained">contract tekenen</Button>
                                </Grid>
                                <Grid item xs={6} md={4}>
                                    <Button variant="contained">contract uploaden</Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Typography>
                </Box>
            </Modal>
        </div>
    )
    return (
        <div>
            {/* hier komt ook nog een component voor het weergeven van het pdf feedbackdocument */}
            <FeedbackDocumentPDF />
        </div>
    );
};

