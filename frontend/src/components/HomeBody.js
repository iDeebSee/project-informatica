import * as React from 'react';


import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Item from '@mui/material/Grid';
import { BrowserRouter, Link } from 'react-router-dom';
import authService from '../services/auth-service';


export default function HomeBody() {


  return (


      </Link>
      </Item>
      <Item>
      <Link to="/UserList">
      <Paper  style={{top: 10,height:150, position: 'relative',left: 20,width: 300}} variant="outlined" square> users</Paper> 

      </Link>


    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

      <Grid item xs={3}>
        <Item>
          <Link to="/list">
            <Paper style={{ top: 10, height: 150, position: 'relative', left: 20, width: 300 }} variant="outlined" square> KredietAanvragen</Paper>

          </Link>


          <Paper style={{ top: 20, height: 150, position: 'relative', left: 20, width: 300 }} variant="outlined" square />

        </Item>
      </Grid>
      <Grid item xs={3}>
        <Item>
          <Paper style={{ top: 10, height: 150, position: 'relative', left: 20, width: 300 }} variant="outlined" square />

          <Paper style={{ top: 20, height: 150, position: 'relative', left: 20, width: 300 }} variant="outlined" square />

        </Item>

      </Grid>

      <Grid item xs={3}>
        <Item><Paper style={{ top: 10, height: 150, position: 'relative', left: 20, width: 300 }} variant="outlined" square />

          <Paper style={{ top: 20, height: 150, position: 'relative', left: 20, width: 300 }} variant="outlined" square />

        </Item>
      </Grid>

      <Grid item xs={3}>
        <Item><Paper style={{ top: 10, height: 150, position: 'relative', left: 20, width: 300 }} variant="outlined" square />
          <Paper style={{ top: 20, height: 150, position: 'relative', left: 20, width: 300 }} variant="outlined" square />

        </Item>

      </Grid>
    </Grid>
  );
};

