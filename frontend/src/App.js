import './App.css';
import * as React from 'react';
import Routing from './routing/Routing';
import Navbar from './components/Navbar';


export default function App() {

  return (
    <div>
      <Navbar></Navbar>
      <Routing></Routing>
    </div>
  );
};

