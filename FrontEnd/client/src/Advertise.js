import React from 'react';
import './Homepage.css'; // You can create a separate CSS file for styling
import { Link, Route, Routes, useNavigate } from "react-router-dom";

function HomePage1() {
    var navi = useNavigate();
    function logoclicked(){
        window.location.reload();
    }
    function gotohome(){ navi("/"); }
    function gotoadv(){ debugger; navi("/advertise"); }
    function gotogal(){ navi("/gallery"); }
    function gotocont(){ navi("/contactus"); }
    function gotologin() {navi("/user/login"); }


  return (
    <div className="homepage-container">
      <header className="header">
        <nav className="nav-links">
          <button onClick={gotohome}>Home</button>
          <button style={{color:"red"}} onClick={gotoadv}>Advertise</button>
          <button onClick={gotogal}>Gallery</button>
          <button onClick={gotocont}>Contact Us</button>
          <button onClick={gotologin}>Login</button>
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
