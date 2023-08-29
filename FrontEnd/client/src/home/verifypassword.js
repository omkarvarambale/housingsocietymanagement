import React from 'react';
import '../Homepage.css'; // You can create a separate CSS file for styling
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

function VerifyPassword() {

  var [errorMsg, setErrorMsg] = useState("");
  var [btncnt , setbtncnt] = useState("none");

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


  //const { email } = useParams();
  const [enteredOtp, setEnteredOtp] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [setdisplay, setSetDisplay] = useState('none');
  //const [generatedOtp, setGeneratedOtp] = useState(sessionStorage.getItem('generatedOtp')); // Get OTP from sessionStorage

  const handleVerifyOtp = () => {
    var id = window.sessionStorage.getItem("generatedOtp");
    //const actualOtp = parseInt(generatedOtp); // Convert stored OTP to integer
    const enteredOtpValue = parseInt(enteredOtp); // Convert entered OTP to integer
    // window.localStorage.setItem('generatedOtp', receivedOtp); 
    debugger

    if (enteredOtp == id) {
      console.log(id);
      console.log("entered otp: "+enteredOtp)
      setResponseMessage('OTP verified. You can reset your password now.');

      setTimeout(() => { setSetDisplay("block");}, 2000);

    } else {
      setResponseMessage('Incorrect OTP. Please try again.');
    }
  };

  var email = sessionStorage.getItem('email'); 

  function gotologin() {navi("/user/login"); }
  var [userData, setUserData] = useState({
    "email": email, "password": ""});
    

  function updatePassword(){

    // userData.email = email ;
    // setUserData({...userData});


    console.log("hiii");
   debugger;
    var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:50052/repass");
        xhr.onreadystatechange = function () {
          debugger
            if (xhr.readyState === 4 && xhr.status === 200) {
                //var data = JSON.parse(xhr.responseText) ;
                window.sessionStorage.clear();
                setErrorMsg("Password Updated successfully");
                setTimeout(() => {setbtncnt("block")}, 2000);
            }
            if (xhr.status === 400) {
              setErrorMsg("Email not found in our Database Plz resend the otp");
              //var data = JSON.parse(xhr.responseText) ;
              window.sessionStorage.clear();
              setTimeout(() => {setbtncnt("block")}, 2000);
            }
        }
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(userData));
  }



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
    <div className="ResetPassword">
      <h1>Reset Password</h1>
      <p>Reset password for: {email}</p>

      <label>Enter OTP: </label>
      <input
        type="text"
        value={enteredOtp}
        onChange={e => setEnteredOtp(e.target.value)}
      />
      <button onClick={handleVerifyOtp}>Verify OTP</button>
      
      <p>{responseMessage}</p>

      <br/>

      <div style={{display:setdisplay}}>
        password : 
        <input
        type="password"
        value={userData.password}
        onChange={e => {
          userData.password = e.target.value ;
          setUserData({...userData}); 
        }}
        />
        <button className='btn btn-success' onClick={updatePassword}>Update Password</button>
        
        <div><br/><h4>{errorMsg}</h4></div>  
        <br></br>
        <div style={{display:btncnt}}><button onClick={gotologin}>Goto Login</button></div>
      </div>

    </div>
    </center>

  </div>
);
}
  
export default VerifyPassword;

//style={{display:setdisplay}}

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
