import React, { useState } from 'react';
import './Homepage.css'; // You can create a separate CSS file for styling
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Axios from "axios";

function AddAdvertise() {
  var navi = useNavigate();
  function logoclicked(){
      window.location.reload();
  }

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


  var [uploadFile, setUploadFile] = useState("");
  var [cloudinaryImage, setCloudinaryImage] = useState("")

  const handleUpload = (e) => {
    setCloudinaryImage("H1");
    e.preventDefault();
    const formData = new FormData ();
    formData.append("file", uploadFile);
    formData.append("upload_preset", "HousingSocietyManagement");

    Axios.post(
     "https://api.cloudinary.com/v1_1/dvsmrv64h/image/upload",
     formData
   )
    .then((response) => {
      console.log(response);
      console.log(cloudinaryImage);
      setCloudinaryImage(response.data.secure_url);
      //setCloudinaryImage("H2");
      console.log(cloudinaryImage);
    })
    .catch((error) => {
      setCloudinaryImage("H3");
      console.log(error);
    });
  };

  function prints(){
    console.log(cloudinaryImage);
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
        <button style={{color:"red"}} onClick={gotocont}>Contact Us</button>
        {logincontent}
        {logoutcontent}


      </nav>
    </header>
    
    <div className="society-info">
        <div>
            <input type='file' onChange={(e)=>setUploadFile(e.target.files[0])}></input>
            <button onClick={handleUpload}>upload</button>
        </div>
        <div>
          <button onClick={prints}>clll</button>
        </div>
        <div style={{backgroundColor:"red"}}><h1></h1></div>

    </div>
    
    <footer className="footer">
        <img src='response.data.secure_url' alt='noimg'></img>
        <img src='https://res.cloudinary.com/dvsmrv64h/image/upload/v1692809503/blzrid7rs6noyxyyktqx.avif' alt='noimg'></img>
        
    </footer>
  </div>
);
  }
  
  export default AddAdvertise;