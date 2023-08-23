import React from 'react';
import './Homepage.css'; // You can create a separate CSS file for styling
import { Link, Route, Routes, useNavigate } from "react-router-dom";

function UserLogout() {
  var navi = useNavigate();
  function logoclicked(){
      window.location.reload();
  }

  var login = window.sessionStorage.getItem("login") == "true";
  var logid = window.sessionStorage.getItem("logid");
  var fname = window.sessionStorage.getItem("fname");
  var lname = window.sessionStorage.getItem("lname");

  function gotohome(){ navi("/"); }
  function gotoadv(){ navi("/advertise"); }
  function gotogal(){ navi("/gallery"); }
  function gotomang(){ navi("/management"); }
  function gotocont(){ navi("/contactus"); }
  function gotologin() {navi("/user/login"); }
  function gotomem(){ navi("/user/members") }
  function gotologout(){ navi("/user/logout"); }


  let memcontent;
  if (login) {
    memcontent =<button onClick={gotomem}>All Member</button>;
  }

  function logout(){
    window.sessionStorage.clear();
    window.sessionStorage.setItem("login", false);
    gotohome();
  }


return (
  <div className="homepage-container">
    <header className="header">
      <nav className="nav-links">
        <button onClick={gotohome}>Home</button>
        <button onClick={gotoadv}>Advertise</button>
        {memcontent}
        <button onClick={gotogal}>Gallery</button>
        <button onClick={gotomang}>Management People</button>
        <button onClick={gotocont}>Contact Us</button>
        <button style={{color:"red"}} onClick={gotologout}>Logout</button>
      </nav>
    </header>
    
    <div className="society-info">
      Inside Logout
      <br/><button className='btn btn-danger' onClick={logout}>Logout</button>
    </div>
    
    <footer className="footer">
      {/* Footer content goes here */}
    </footer>
  </div>
);
  }
  
  export default UserLogout;