import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Container } from '@mui/material';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { borderRight } from '@mui/system';
import { Modal, Typography, Box, TextField, Slider, Paper } from '@mui/material'



// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(
    0,
    '16 Mar, 2019',
    'Elvis Presley',
    'Tupelo, MS',
    'VISA ⠀•••• 3719',
    312.44,
  ),
  createData(
    1,
    '16 Mar, 2019',
    'Paul McCartney',
    'London, UK',
    'VISA ⠀•••• 2574',
    866.99,
  ),
  createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
  createData(
    3,
    '16 Mar, 2019',
    'Michael Jackson',
    'Gary, IN',
    'AMEX ⠀•••• 2000',
    654.39,
  ),
  createData(
    4,
    '15 Mar, 2019',
    'Bruce Springsteen',
    'Long Branch, NJ',
    'VISA ⠀•••• 5919',
    212.79,
  ),
];

const marks = [
  {
    value: 1,
    label: '1 maand',
  },
  {
    value: 12,
    label: '1 jaar',
  },
];

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1200,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function valuetext(value) {
  if (value == 1)
    return `${value} maand`;
  else if (value == 12)
    return `${value} Jaar`;
  else
    return `${value} maanden`;
}


function preventDefault(event) {
  event.preventDefault();
}

export default function ListKredietaanvragen() {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const Popup = (

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
            hier komt de body voor het aanvragen van kredieten
            <Box
              component="form"
              sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
              }}
              noValidate
              autoComplete="off"
            >
              <Grid container spacing={2} style={{width: "100%"}}>
                <Grid item xs={6} md={4}>
                  <TextField id="outlined-basic" label="Verantwoording" variant="outlined" />
                </Grid>
                 {/* nog combobox van maken  */}
                <Grid item xs={6} md={4}>
                  <TextField id="filled-basic" label="Zelf gefinancierd (€)" variant="outlined" />
                </Grid>
                <Grid item xs={6} md={4}>
                  <TextField id="standard-basic" label="Totaalbedrag (€)" variant="outlined" />
                </Grid>
                <Grid item xs={6} md={8}>
                  <Slider
                    aria-label="Looptijd"
                    defaultValue={6}
                    getAriaValueText={valuetext}
                    valueLabelDisplay="on"
                    step={1}
                    marks={marks}
                    min={1}
                    max={12}
                  />
                </Grid>
              </Grid>
            </Box>
          </Typography>
        </Box>
      </Modal>
    </div>
  )

  return (
    <Container maxWidth="lg" style={{ position: 'relative', marginTop: 20 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <ButtonGroup style={{ float: 'right', marginRight: 15 }} variant="contained" aria-label="outlined primary button group">
            <Button style={{ align: borderRight }} onClick={handleOpen}>create new</Button>
            {Popup}
          </ButtonGroup>  </Grid>
        <Grid item xs={12}>
          <React.Fragment>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>id</TableCell>
                  <TableCell>Verantwoording</TableCell>
                  <TableCell>Zelf gefinancierd</TableCell>
                  <TableCell>Totaal</TableCell>
                  <TableCell>looptijd</TableCell>
                  <TableCell align="right">status</TableCell>
                  <TableCell align="right">klant id</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.shipTo}€</TableCell>
                    <TableCell>{row.shipTo}€</TableCell>
                    <TableCell>{row.paymentMethod}</TableCell>
                    <TableCell align="right">nog in te vullen</TableCell>
                    <TableCell align="right">nog in te vullen</TableCell>
                    <TableCell align="right">
                      <ButtonGroup variant="contained" aria-label="outlined primary button group">
                        <Button>edit </Button>
                        <Button>delete </Button>
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