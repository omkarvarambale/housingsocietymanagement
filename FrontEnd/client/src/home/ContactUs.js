import React from 'react';
import '../Homepage.css'; // You can create a separate CSS file for styling
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Dropdown from '../home/Dropdown.js';
import { useState, useEffect } from "react";

import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


function ContactUs() {
  var navi = useNavigate();
  var login = window.sessionStorage.getItem("login") == "true";
  var logid = window.sessionStorage.getItem("logid");
  var fname = window.sessionStorage.getItem("fname");
  var lname = window.sessionStorage.getItem("lname");
    
  let memcontent;
  let logincontent=<button onClick={gotologin}>Login</button>;
  let logoutcontent;
  let signupcontent=<button onClick={gotosignup}>Signup</button>;
  if (login) {
    memcontent =<button onClick={gotomem}>All Member</button>;
    logincontent="";
    logoutcontent=<button onClick={gotologout}>Logout</button>;
    signupcontent="";
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

  const [recipientEmail, setRecipientEmail] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  var [emailData, setEmailData] = useState({
    "name":"","email":"","message":""});

  var emailDataChange = (x) => {
    emailData[x.target.name] = x.target.value;
    setEmailData({ ...emailData });
  }

  const handleSendEmail = () => {

    if(emailData.name == ""){
      toast.error("Name can not be empty!!!") ; return;}
    if(emailData.email == ""){
      toast.error("Email Id can not be empty!!!") ; return;}
    if(emailData.message == ""){
      toast.error("Message body can not be empty!!!") ; return;}

    debugger;
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:50052/ContactUs', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    
    xhr.onload = function () {
      if (xhr.status === 200) {
        //debugger
        const receivedOtp = parseInt(xhr.responseText); 
        console.log(receivedOtp);
        //setGeneratedOtp(receivedOtp); 
        //sessionStorage.setItem('generatedOtp', xhr.responseText); 
        //sessionStorage.setItem('email', recipientEmail); 
        setResponseMessage('We received your enquiry');
      } else {
        setResponseMessage('Error: ' + xhr.statusText);
      }
    };
    xhr.onerror = function () {
      setResponseMessage('Network error occurred');
    };
    xhr.send(JSON.stringify(emailData));
  };


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
        {signupcontent}
        { login ? (<Dropdown />):(<></>)}
      </nav>
    </header>
    
    <div className="society-info">
    <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <h2>Contact Us</h2>
      
          <div class="form-group">
            <label for="name">Name</label><br/>
            <input type="text" class="form-control" name="name" onChange={emailDataChange} placeholder="Enter your name"/>
          </div>
          <br/>
          <div class="form-group">
            <label for="email">Email address</label><br/>
            <input type="email" class="form-control" name="email" onChange={emailDataChange} placeholder="Enter email"/>
          </div>
          <br/>
          <div class="form-group">
            <label for="message">Message</label><br/>
            <textarea class="form-control" name="message" rows="4" onChange={emailDataChange} placeholder="Enter your message"></textarea>
          </div>
          <div>{responseMessage}</div>
          <br/>
          <button class="btn btn-primary" onClick={handleSendEmail}>Submit</button>
       
      </div>
    </div>
  </div>
  
    </div>


    <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />




  </div>
);
  }
  
  export default ContactUs;