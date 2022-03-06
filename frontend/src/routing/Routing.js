import React from 'react'
import Home from '../views/Home';
import Kredietaanvragen from '../klantViews/KredietAanvragen';


import {
    BrowserRouter,
    Route,
    Link,
    Routes
} from "react-router-dom";


export default function Routing() {

    return (
        <BrowserRouter>
            
            <Routes>
                <Route path={"/"} element={<Home />} />
                <Route path={"/list"} element={<Kredietaanvragen />} />
            </Routes>
        </BrowserRouter>
    )
}