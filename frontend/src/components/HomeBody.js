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
            <Link style={{ top: 10, position: 'relative', left: 20, textDecoration: "none", fontWeight: "bold", textAlign: "center", fontFamily: "roboto, verdana", fontSize: "20pt" }} to="/list" >
              <Paper class="paperHome" style={{ top: 10, height: 150, position: 'relative', left: 20, width: 300, lineHeight: "130px", backgroundImage: "linear-gradient(#8080805c, white, #8080800a)", boxShadow: "#80808061 1px 1px 20px" }} variant="outlined" square> Kredietaanvragen</Paper>
            </Link>
            : <></>}


          {currUser.role.toString() === "ADMINISTRATOR" ?
            <Link style={{ top: 10, position: 'relative', left: 20, textDecoration: "none", fontWeight: "bold", textAlign: "center", fontFamily: "roboto, verdana", fontSize: "20pt" }} to="/UserList">
              <Paper class="paperHome" style={{ top: 10, height: 150, position: 'relative', left: 20, width: 300, lineHeight: "130px", backgroundImage: "linear-gradient(#8080805c, white, #8080800a)", boxShadow: "#80808061 1px 1px 20px" }} variant="outlined" square> Gebruikers</Paper>

            </Link> : <></>}

            {currUser.role.toString() === "COMDIRECTIE" ?
        

            <Link style={{ top: 10, position: 'relative', left: 20, textDecoration: "none", fontWeight: "bold", textAlign: "center", fontFamily: "roboto, verdana", fontSize: "20pt" }} to="/sectorenlist">
              <Paper class="paperHome" style={{ top: 10, height: 150, position: 'relative', left: 20, width: 300, lineHeight: "130px", backgroundImage: "linear-gradient(#8080805c, white, #8080800a)", boxShadow: "#80808061 1px 1px 20px" }} variant="outlined" square > sectoren</Paper>
            </Link>

        : <></>}

        </Item>
      </Grid>
      
      {currUser.role.toString() === "KREDIETBEOORDELAAR" ?
        <Grid item xs={3}>
          <Item>
            <Link style={{ top: 10, position: 'relative', left: 20, textDecoration: "none", fontWeight: "bold", textAlign: "center", fontFamily: "roboto, verdana", fontSize: "20pt" }} to="/ondernemingen">
              <Paper class="paperHome" style={{ top: 10, height: 150, position: 'relative', left: 20, width: 300, lineHeight: "130px", backgroundImage: "linear-gradient(#8080805c, white, #8080800a)", boxShadow: "#80808061 1px 1px 20px" }} variant="outlined" square >Ondernemingen</Paper>
            </Link>
            {/* <Paper style={{ top: 20, height: 150, position: 'relative', left: 20, width: 300 }} variant="outlined" square /> */}

          </Item>
        </Grid>
        : <></>}
    </Grid>
  );
};

