import React from 'react';
import '../Homepage.css'; // You can create a separate CSS file for styling
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function ForgotPassword() {
  
  var navi = useNavigate();
  var login = window.sessionStorage.getItem("login") == "true";
  var logid = window.sessionStorage.getItem("logid");
  var fname = window.sessionStorage.getItem("fname");
  var lname = window.sessionStorage.getItem("lname");
    
  let memcontent;
  let logincontent=<button style={{color:"red"}} onClick={gotologin}>Login</button>;
  let logoutcontent;
  let signupcontent=<button onClick={gotosignup}>Signup</button>;
  if (login) {
    memcontent =<button onClick={gotomem}>All Member</button>;
    logincontent="";
    logoutcontent=<button onClick={gotologout}>Logout</button>;
    signupcontent="";
  }

  useEffect(()=>{
    if(login){
        navi("/");
    }
  } , []);
  
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
  //const [generatedOtp, setGeneratedOtp] = useState(0);

  const handleSendEmail = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:50052/api/email/sendemail', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    
    xhr.onload = function () {
      if (xhr.status === 200) {
        //debugger
        //const receivedOtp = parseInt(xhr.responseText); 
        //setGeneratedOtp(receivedOtp); 
        sessionStorage.setItem('generatedOtp', xhr.responseText); 
        sessionStorage.setItem('email', recipientEmail); 
        setResponseMessage('OTP sent successfully.');
      } else {
        setResponseMessage('Error: ' + xhr.statusText);
      }
    };
    xhr.onerror = function () {
      setResponseMessage('Network error occurred');
    };
    //omkaradagale4883@gmail.com

    // sandeshajamane29@gmail.com
    xhr.send(JSON.stringify(recipientEmail));
  };





return (
  <div className="homepage-container">
    <header className="header">
      <nav className="nav-links">
        <button onClick={gotohome}>Home</button>
        <button onClick={gotoadv}>Advertise</button>
        <button onClick={gotogal}>Gallery</button>
        <button onClick={gotomang}>Management People</button>
        <button onClick={gotocont}>Contact Us</button>
        {logincontent}
        {signupcontent}
      </nav>
    </header>

    <center>
      <br/>
    <div className="Forgot">
      <h3>Forgot Password</h3><br/>
      <label>Recipient Email: </label>
      <input
        type="text"
        value={recipientEmail}
        onChange={e => setRecipientEmail(e.target.value)}
      />
      <button onClick={handleSendEmail}>Send OTP</button>
      <p>{responseMessage}</p>
     
      <div className="text-center" style={{ marginTop: "15px" }}>
        <Link to="/verifypassword" className="btn btn-primary my-2" style={{ color: "white" }}>
          Enter OTP
        </Link>
      </div>
    </div>
    </center>

  </div>
);
}
  
export default ForgotPassword;



  // const [recipientEmail, setRecipientEmail] = useState('');
  // const [responseMessage, setResponseMessage] = useState('');
  // const [generatedOtp, setGeneratedOtp] = useState(0);

  // const handleSendEmail = () => {
  //   const xhr = new XMLHttpRequest();
  //   xhr.open('POST', 'http://localhost:51722/api/email/sendemail', true);
  //   xhr.setRequestHeader('Content-Type', 'application/json');
    
  //   xhr.onload = function () {
  //     if (xhr.status === 200) {
  //       debugger
  //       //const receivedOtp = parseInt(xhr.responseText); 
  //       //setGeneratedOtp(receivedOtp); 
  //       sessionStorage.setItem('generatedOtp', xhr.responseText); 
  //       setResponseMessage('OTP sent successfully.');
  //     } else {
  //       setResponseMessage('Error: ' + xhr.statusText);
  //     }
  //   };
  //   xhr.onerror = function () {
  //     setResponseMessage('Network error occurred');
  //   };
  //   //omkaradagale4883@gmail.com

  //   // sandeshajamane29@gmail.com
  //   xhr.send(JSON.stringify(recipientEmail));
  // };
