import React from 'react';
import './Homepage.css'; // You can create a separate CSS file for styling
import { Link, Route, Routes, useNavigate } from "react-router-dom";

function HomePage1() {
    var navi = useNavigate();

    var login = window.sessionStorage.getItem("login") == "true";
    var logid = window.sessionStorage.getItem("logid");
    var fname = window.sessionStorage.getItem("fname");
    var lname = window.sessionStorage.getItem("lname");
    
    let memcontent;
    let logincontent=<button onClick={gotologin}>Login</button>;
    let logoutcontent;
    if (login) {
      memcontent =<button onClick={gotomem}>All Member</button>;
      logincontent="";
      logoutcontent=<button onClick={gotologout}>Logout</button>;
    }
    


    function gotohome(){ navi("/"); }
    function gotoadv(){ debugger; navi("/advertise"); }
    function gotogal(){ navi("/gallery"); }
    function gotocont(){ navi("/contactus"); }
    function gotologin() {navi("/user/login"); }
    function gotomem(){ navi("/user/members") }
    function gotomang(){ navi("/management"); }
    function gotologout(){ navi("/user/logout"); }


  return (
    <div className="homepage-container">
      <header className="header">
        <nav className="nav-links">
          <button onClick={gotohome}>Home</button>
          <button style={{color:"red"}} onClick={gotoadv}>Advertise</button>
          {memcontent}
          <button onClick={gotogal}>Gallery</button>
          <button onClick={gotomang}>Management People</button>
          <button onClick={gotocont}>Contact Us</button>
          {logincontent}
          {logoutcontent}
        </nav>
      </header>
      
      <div className="society-info">
        Inside Advertise
      </div>
      
      <footer className="footer">
        {/* Footer content goes here */}
      </footer>
    </div>
  );
};

export default HomePage1;
