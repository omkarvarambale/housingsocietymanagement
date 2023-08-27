import React from 'react';
import './Homepage.css'; // You can create a separate CSS file for styling
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import SocietyRules from './SocietyRules/SocietyRules.jsx';
import Dropdown from './home/Dropdown.js';

const HomePage1 = () => {
    var navi = useNavigate();

    var login = window.sessionStorage.getItem("login") == "true";
    var logid = window.sessionStorage.getItem("logid");
    var fname = window.sessionStorage.getItem("fname");
    var lname = window.sessionStorage.getItem("lname");
    var isAdmin = window.sessionStorage.getItem("role")==1;

    let memcontent;
    let logincontent=<button onClick={gotologin}>Login</button>;
    let logoutcontent;
    let signupcontent=<button onClick={gotosignup}>Signup</button>;
    if (login) {
      memcontent =<button onClick={gotomem}>All Member</button>;
      logincontent="";
      logoutcontent=<button onClick={gotologout}>Logout</button>;
      signupcontent ="";
    }

    function gotohome(){ navi("/"); }
    function gotoadv(){ navi("/advertise"); }
    function gotogal(){ navi("/gallery"); }
    function gotomang(){ navi("/management"); }
    function gotocont(){ navi("/contactus"); }
    function gotologin() {navi("/user/login"); }
    function gotomem(){ navi("/user/members") }
    function gotologout(){ navi("/user/logout"); }
    function gotosignup(){ navi("/user/add");}

  return (
    <div className="homepage-container">
      <header className="header">
        <nav className="nav-links">
          <button style={{color:"red"}} onClick={gotohome}>Home</button>
          <button onClick={gotoadv}>Advertise</button>
          {memcontent}
          <button onClick={gotogal}>Gallery</button>
          <button onClick={gotomang}>Management People</button>
          <button onClick={gotocont}>Contact Us</button>
          {logincontent}
          {signupcontent}
          { login ? (<Dropdown />):(<></>)}
        </nav>
      </header>
      
      <div className="society-info">
        <h3>WelCome {fname} {lname}</h3>
        <br></br>
        <center>
        <p style={{fontSize:"18px", width:"75%", textAlign:"justify"}}>"Welcome to the epitome of modern living – 'Siddhivinayak Housing Society.'
          Nestled in the heart of [Location], our society is a harmonious blend of comfort, convenience, and community.
          With a vision to provide a tranquil and vibrant living experience,
          we invite you to explore a world where contemporary architecture meets serene surroundings.
          Join us in redefining what it means to come home – where every corner resonates with the spirit of togetherness and every amenity is tailored to elevate your lifestyle.
          Discover the perfect haven for you and your family at Siddhivinayak Housing Society, where living is not just a routine, but an extraordinary journey."</p>
        </center>
      </div>
      <br/>
      <SocietyRules />
      
    </div>
  );
};

export default HomePage1;
