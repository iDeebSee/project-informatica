import * as React from 'react';


import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Item from '@mui/material/Grid';
import { BrowserRouter, Link } from 'react-router-dom';
import AuthService from '../services/auth-service';
import KredietaanvraagImage from '../img/kredietaanvraag.jpg'
import UsersImage from '../img/gebruikers.jpg'
import SectorImage from '../img/sectoren.png'

export default function HomeBody() {

  let currUser = AuthService.getCurrentUser()
  React.useEffect(() => {
    AuthService.getLoggedUser().then((response) => {
      console.log("logged in user from backend: ", response.data.principal)
    });
  })
  return (

    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item xs={3}>
        <Item>


          {currUser.role.toString() === "KLANT" || currUser.role.toString() === "KANTOOR" || currUser.role.toString() === "KREDIETBEOORDELAAR" || currUser.role.toString() === "COMPLIANCE" ?
            <Link to="/list">
              <Paper style={{ top: 10, height: 150, position: 'relative', left: 20, width: 300, backgroundImage: `url(${KredietaanvraagImage})`, backgroundPosition: "center", backgroundSize: "cover", backgroundSize: "cover", fontWeigh: "bold", textAlign: "center", fontFamily: "roboto, verdana" }} variant="outlined" square> KredietAanvragen</Paper>
            </Link>
            : <></>}


          {currUser.role.toString() === "ADMINISTRATOR" ?
            <Link to="/UserList">
              <Paper style={{ top: 10, height: 150, position: 'relative', left: 20, width: 300, backgroundImage: `url(${UsersImage})`, backgroundPosition: "center", backgroundSize: "cover", backgroundSize: "cover", fontWeigh: "bold", textAlign: "center", fontFamily: "roboto, verdana" }} variant="outlined" square> users</Paper>

            </Link> : <></>}


        </Item>
      </Grid>
      {currUser.role.toString() === "COMDIRECTIE" ?
        <Grid item xs={3}>
          <Item>

            <Link to="/sectorenlist">
              <Paper style={{ top: 10, height: 150, position: 'relative', left: 20, width: 300, backgroundImage: `url(${SectorImage})`, backgroundPosition: "center", backgroundSize: "cover", fontWeigh: "bold", textAlign: "center", fontFamily: "roboto, verdana" }} variant="outlined" square > sectoren</Paper>
            </Link>

            <Paper style={{ top: 20, height: 150, position: 'relative', left: 20, width: 300 }} variant="outlined" square />

          </Item>

        </Grid>
        : <></>}
      {currUser.role.toString() === "KREDIETBEOORDELAAR" ?
        <Grid item xs={3}>
          <Item>
            <Link to="/ondernemingen">
              <Paper style={{ top: 10, height: 150, position: 'relative', left: 20, width: 300 }} variant="outlined" square >Ondernemingen</Paper>
            </Link>
            {/* <Paper style={{ top: 20, height: 150, position: 'relative', left: 20, width: 300 }} variant="outlined" square /> */}

          </Item>
        </Grid>
        : <></>}

      <Grid item xs={3}>
        <Item>

          <Paper style={{ top: 10, height: 150, position: 'relative', left: 20, width: 300 }} variant="outlined" square />
          <Paper style={{ top: 20, height: 150, position: 'relative', left: 20, width: 300 }} variant="outlined" square />

        </Item>

      </Grid>
    </Grid>
  );
};

