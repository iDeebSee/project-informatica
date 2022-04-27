import React, { useEffect } from 'react'
import Home from '../views/Home';
import Kredietaanvragen from '../klantViews/KredietAanvragen';
import Detailaanvraag from '../klantViews/DetailAanvraag';
import Login from '../views/Login';
import AuthService from '../services/auth-service'
import PrivateRoute from './PrivateRoute'
import Profile from '../views/Profile'
import Navbar from '../components/Navbar'
import UserList from '../components/UserList'
import {
    BrowserRouter,
    Route,
    Link,
    Routes,
    useNavigate
} from "react-router-dom";
import EventBus from "../common/eventBus";
import { useJwt, decodeToken, isExpired } from "react-jwt";


export default function Routing() {

    // let navigate = useNavigate();
    const currUser = AuthService.getCurrentUser()
    let token = ""
    if (currUser) {
        token = currUser.accessToken
    }

    const isLoggedIn = AuthService.isLoggedIn()
    const myDecodedToken = decodeToken("Bearer" + token);
    const isMyTokenExpired = isExpired(token);

    function logOut() {
        AuthService.logout();
        setUser(undefined);
    }

    const [user, setUser] = React.useState()
    useEffect(() => {
        setUser(AuthService.getCurrentUser())
        EventBus.on("logout", () => {
            logOut();
        });
        return () => {
            // Anything in here is fired on component unmount.
            EventBus.remove("logout");
        }
    }, []);

    if (currUser) {
        console.log("user in routing.js: ", user);
        // console.log("issued at: ", ((myDecodedToken.iat % 60000) / 1000).toFixed(0))
        // console.log("expires: ", ((myDecodedToken.exp % 60000) / 1000).toFixed(0))
        console.log("active JWT: ", !isMyTokenExpired);
        console.log("is still logged in: ", isLoggedIn);
        console.log("time active JWT: ", ((myDecodedToken.exp - myDecodedToken.iat) / 60) + " min");
    }

    return (
        <BrowserRouter>
            <Navbar></Navbar>
            <Routes>
                <Route exact path="/" element={<PrivateRoute user={isLoggedIn}> <Home /> </PrivateRoute>} />
                <Route path={"/list"} element={<PrivateRoute user={isLoggedIn}> <Kredietaanvragen /> </PrivateRoute>} />
                <Route path={"/detail/:id"} element={<PrivateRoute user={isLoggedIn}> <Detailaanvraag /> </PrivateRoute>} />
                <Route path={"/profile"} element={<PrivateRoute user={isLoggedIn}> <Profile /> </PrivateRoute>} />
                <Route path={"/userlist"} element={<PrivateRoute user={isLoggedIn}> <UserList /> </PrivateRoute>} />

                <Route path="*" element={<p>Hier vind je niets: 404!</p>} />
                {isLoggedIn === true ? <Route path={"/login"} element={<Home />} /> : <Route path={"/login"} element={<Login />} />}
                {/* <Route path={"/login"} element={<Login />} /> */}
                {/* <AuthVerify logOut={logOut} /> */}
            </Routes>
        </BrowserRouter>
    )
}