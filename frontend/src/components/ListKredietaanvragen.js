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

function preventDefault(event) {
  event.preventDefault();
}

export default function ListKredietaanvragen() {
  return (
    

    <Container maxWidth="lg" style={{ position: 'relative', marginTop:20}}>
      <Grid container spacing={2}>
  <Grid item xs={12}>
  <ButtonGroup style={{float: 'right', marginRight: 15}} variant="contained" aria-label="outlined primary button group">
    
      <Button style={{align: borderRight}}>create new </Button>
     
    </ButtonGroup>  </Grid>
  <Grid item xs={12}>
    
 
        <React.Fragment>
     
     <Table size="small">
       <TableHead>
         <TableRow>
           <TableCell>id</TableCell>
           <TableCell>Name</TableCell>
           <TableCell>eigen vermogen</TableCell>
           <TableCell>looptijd</TableCell>
           <TableCell align="right">status</TableCell>
           <TableCell align="right">klant id</TableCell>
           <TableCell align="right">settings</TableCell>


         </TableRow>
       </TableHead>
       <TableBody>
         {rows.map((row) => (
           <TableRow key={row.id}>
             <TableCell>{row.date}</TableCell>
             <TableCell>{row.name}</TableCell>
             <TableCell>{row.shipTo}</TableCell>
             <TableCell>{row.paymentMethod}</TableCell>
             <TableCell align="right">nog in te vullenb</TableCell>
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