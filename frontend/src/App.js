import './App.css';
import * as React from 'react';
import Home from './views/Home';
import Kredietaanvragen from './klantViews/KredietAanvragen';
import Detailaanvraag  from './klantViews/DetailAanvraag';
import Navbar from './components/Navbar';
import {
  BrowserRouter,
  Route,
  Link,
  Routes
} from "react-router-dom";




export default function App() {
  
  return(
    <BrowserRouter>
    <Navbar/>
    <Routes>
    <Route  path={"/"} element={<Home/>}/>
    <Route  path={"/list"} element={<Kredietaanvragen/>}/>
    <Route  path={"/detail"} element={<Detailaanvraag/>}/>
    </Routes>
    </BrowserRouter>
);
};

