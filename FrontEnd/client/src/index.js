import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App';
//import Home from './Home';
import { BrowserRouter } from 'react-router-dom';
import Lander from './lander';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
   <Lander />
   </BrowserRouter>);