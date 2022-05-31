import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AuthService from "../services/auth-service";
import { Alert } from '../components/Alert'
import { useNavigate } from "react-router-dom";


const theme = createTheme();

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Dit veld is verplicht!
      </div>
    );
  }
};

export default function Login(props) {

  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [message, setMessage] = React.useState("")
  const [messageType, setMessageType] = React.useState("")
  const [error, setError] = React.useState("")



  let navigate = useNavigate();

  const alertRef = React.useRef();

  const handleSubmit = (event) => {

    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    // setEmail(data.get("email"))
    // setPassword(data.get("password"))
    console.log(data.get("email"))
    console.log(data.get("password"))

    // console.log({
    //   email: data.get('email'),
    //   password: data.get('password'),
    // });


    AuthService.login(email, password).then(
      () => {
        navigate("/");
        window.location.reload();
      },
      error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        if (error.response.status === 401) {
          setError(401)
          setMessageType("error");
          // setMessage("De combinatie van email en wachtwoord is fout!");
        } else if (error.response.status === 400) {
          setError(400)
          setMessageType("error");
          // setMessage("Velden moeten ingevuld worden!");
        } else {
          setMessage(error.message);
        }
        console.log("error message: ", resMessage);
      }
    );
  };

  React.useEffect(() => {
    if (error === 401) {
      setMessageType("error");
      setMessage("De combinatie van email en wachtwoord is fout!");

    } else if (error === 400) {
      setMessageType("error");
      setMessage("Velden moeten ingevuld worden!");
    } else if ((error >= 200 && error <= 300)) {
      setMessageType("success");
      setMessage("U bent successvol aangemeld!")
    }
    // } else if (error === "" || error == null) {
    //   setMessageType("");

    // }
    else {
      setMessageType("error")
      setMessage("Iets ging mis, probeer opnieuw!")
    }
  }, [error])

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>

          </Avatar>
          <Typography component="h1" variant="h5">
            Aanmelden
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Adres"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={e => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Wachtwoord"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={e => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Onthoud mij"
            />

            <Alert ref={alertRef} type={messageType} message={message}></Alert>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => alertRef.current.handleClick()}
            >
              Aanmelden
            </Button>

            
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}