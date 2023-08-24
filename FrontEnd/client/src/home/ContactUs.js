import React from 'react';
import '../Homepage.css'; // You can create a separate CSS file for styling
import { Link, Route, Routes, useNavigate } from "react-router-dom";

function ContactUs() {
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
        <button onClick={gotohome}>Home</button>
        <button onClick={gotoadv}>Advertise</button>
        {memcontent}
        <button onClick={gotogal}>Gallery</button>
        <button onClick={gotomang}>Management People</button>
        <button style={{color:"red"}} onClick={gotocont}>Contact Us</button>
        {logincontent}
        {logoutcontent}
      </nav>
    </header>
    
    <div className="society-info">
    <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <h2>Contact Us</h2>
        <form>
          <div class="form-group">
            <label for="name">Name</label><br/>
            <input type="text" class="form-control" id="name" placeholder="Enter your name"/>
          </div>
          <br/>
          <div class="form-group">
            <label for="email">Email address</label><br/>
            <input type="email" class="form-control" id="email" placeholder="Enter email"/>
          </div>
          <br/>
          <div class="form-group">
            <label for="message">Message</label><br/>
            <textarea class="form-control" id="message" rows="4" placeholder="Enter your message"></textarea>
          </div>
          <br/>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  </div>
    
    </div>
  </div>
);
  }
  
  export default ContactUs;