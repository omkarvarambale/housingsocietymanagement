import React from 'react';
import './Homepage.css'; // You can create a separate CSS file for styling
import { Link, Route, Routes, useNavigate } from "react-router-dom";

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
    if (login) {
      memcontent =<button onClick={gotomem}>All Member</button>;
      logincontent="";
      logoutcontent=<button onClick={gotologout}>Logout</button>;
    }


    function logoclicked(){
        window.location.reload();
    }
    function gotohome(){ navi("/"); }
    function gotoadv(){ navi("/advertise"); }
    function gotogal(){ navi("/gallery"); }
    function gotomang(){ navi("/management"); }
    function gotocont(){ navi("/contactus"); }
    function gotologin() {navi("/user/login"); }
    function gotomem(){ navi("/user/members") }
    function gotologout(){ navi("/user/logout"); }

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
          {logoutcontent}
        </nav>
      </header>
      
      <div className="society-info">
        Inside Home
      </div>
      
      <footer className="footer">
        {/* Footer content goes here */}
      </footer>
    </div>
  );
};

export default HomePage1;
