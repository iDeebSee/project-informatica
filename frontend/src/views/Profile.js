import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import AuthService from '../services/auth-service'
import UserService from '../services/user-service'
import { Container, Button, Typography, Modal } from '@mui/material';
import { useJwt, decodeToken, isExpired } from "react-jwt";
import userService from '../services/user-service';
import { useNavigate } from "react-router-dom";
import { Alert } from '../components/Alert'


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


export default function Profile() {

    const currUser = AuthService.getCurrentUser()
    const token = currUser.accessToken
    const id = currUser.id;
    const [email, setEmail] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [password, setPassword] = useState("")
    const [hiddenPass, setHiddenPass] = useState("")
    const [role, setRole] = useState()
    const [message, setMessage] = useState("")
    const [messageType, setMessageType] = useState("")
    const myDecodedToken = decodeToken("Bearer" + token);
    const isMyTokenExpired = isExpired(token);

    const alertRef = React.useRef();

    let navigate = useNavigate();

    console.log("issued at: ", ((myDecodedToken.iat % 60000) / 1000).toFixed(0))
    console.log("expires: ", ((myDecodedToken.exp % 60000) / 1000).toFixed(0))
    console.log(isMyTokenExpired)

    useEffect(() => {
        // Update the document title using the browser API
        UserService.getUser(currUser.id).then(response => {
            if (response.data) {
                setEmail(response.data.email)
                setLastName(response.data.lastName)
                setFirstName(response.data.firstName)
                setRole(currUser.role)
                setHiddenPass(response.data.password)
            }
        });

    }, []);

    useEffect(() => {
        if (password == "" || password == null || password.length < 6) {
            setMessageType("error");
            setMessage("Wachtwoord moet minimum 6 characters lang zijn!");

        } else if (password != "" || password != null || password.length >= 6) {
            setMessageType("success");
            setMessage("Profiel succesvol bewerkt!");
        } else {
            setMessageType("error")
        }
    })

    function handleSubmit(e) {
        e.preventDefault();
        if (password.length >= 6) {

            UserService.update(id, firstName, lastName, email, password).then(response => {
                console.log("password: ", password)
                console.log("role in update: ", role)
                console.log("update with password", response.data)

            }).catch(error => {
                setMessage(error.message);
            })
        } else if (password === null || password === undefined) {
            UserService.update(id, firstName, lastName, email, password).then(response => {
                console.log("password: ", password)
                console.log("role in update: ", role)
                console.log("update with password", response.data)

            }).catch(error => {
                setMessage(error.message);
            })
        }


    }

    return (
        <Container >
            <Box component="form" sx={{ flexGrow: 1 }} style={{ padding: '1%', marginTop: '1%' }} onSubmit={handleSubmit}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <Item>
                            <TextField onChange={(e) => setFirstName(e.target.value)} id="standard-basic" variant="standard" InputLabelProps={{ shrink: true }} label="Voornaam" value={firstName} />
                        </Item>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Item>
                            <TextField onChange={(e) => setLastName(e.target.value)} id="standard-basic" variant="standard" InputLabelProps={{ shrink: true }} label="Achternaam" value={lastName} />
                        </Item>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Item>
                            <TextField onChange={(e) => setEmail(e.target.value)} id="standard-basic" variant="standard" InputLabelProps={{ shrink: true }} label="E-mail" value={email} />
                        </Item>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Item>
                            <TextField onChange={(e) => setPassword(e.target.value)} id="standard-basic" variant="standard" InputLabelProps={{ shrink: true }} label="Wachtwoord" value={password} />
                        </Item>
                    </Grid>
                    <Grid item xs={12} md={12} >
                        <Alert ref={alertRef} type={messageType} message={message}></Alert>
                        <Button style={{ float: 'right' }} type="submit" variant="contained" onClick={() => alertRef.current.handleClick()}>Update</Button>

                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}