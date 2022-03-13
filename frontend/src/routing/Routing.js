import React, { useEffect } from 'react'
import Home from '../views/Home';
import Kredietaanvragen from '../klantViews/KredietAanvragen';
import Detailaanvraag from '../klantViews/DetailAanvraag';
import Login from '../views/Login';
import AuthService from '../services/auth-service'
import PrivateRoute from './PrivateRoute'
import Profile from '../views/Profile'
import Navbar from '../components/Navbar'
import {
    BrowserRouter,
    Route,
    Link,
    Routes,
    useNavigate
} from "react-router-dom";



export default function Routing() {

    // let navigate = useNavigate();
    const isLoggedIn = AuthService.isLoggedIn()

    // useEffect(() => {
    // if (!isLoggedIn) {
    //         return navigate("/login");
    //     }
    // },[isLoggedIn]);

    const [user, setUser] = React.useState()

    useEffect(() => {
        setUser(AuthService.getCurrentUser())
    }, []);

    console.log("user in routing.js: ", user);
    return (
        <BrowserRouter>
            <Navbar></Navbar>
            <Routes>
                <Route exact path="/" element={<PrivateRoute user={isLoggedIn}> <Home /> </PrivateRoute>} />
                <Route path={"/list"} element={<PrivateRoute user={isLoggedIn}> <Kredietaanvragen /> </PrivateRoute>} />
                <Route path={"/detail"} element={<PrivateRoute user={isLoggedIn}> <Detailaanvraag /> </PrivateRoute>} />
                <Route path={"/profile"} element={<PrivateRoute user={isLoggedIn}> <Profile /> </PrivateRoute>} />
                <Route path="*" element={<p>Hier vind je niets: 404!</p>} />
                <Route path={"/login"} element={<Login />} />
            </Routes>
        </BrowserRouter>
    )
}