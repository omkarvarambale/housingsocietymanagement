import React, { useState, useEffect } from 'react';
import '../Homepage.css'; // You can create a separate CSS file for styling
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Axios from "axios";

function AddAdvertise() {
  var navi = useNavigate();
  
  var login = window.sessionStorage.getItem("login") == "true";
  var logid = window.sessionStorage.getItem("logid");
  var fname = window.sessionStorage.getItem("fname");
  var lname = window.sessionStorage.getItem("lname");
  var admin = window.sessionStorage.getItem("role") == 1;
  
  useEffect(()=>{
    if(!login){
        navi("/");
    }
  } , []);
  
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


  var [advData, setAdvData] = useState({
    "description":"","image":"","date":""
  });
  var AdvDataChange = (x) => {
    advData[x.target.name] = x.target.value;
    setAdvData({ ...advData });
  }

  var [uploadFile, setUploadFile] = useState("");
  var [cloudinaryImage, setCloudinaryImage] = useState("")

  const handleUpload = (e) => {
    debugger;
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
      setCloudinaryImage(response.data.secure_url);
      console.log(cloudinaryImage);

      advData.image = response.data.secure_url ;
      setAdvData({...advData});
      add();
    })
    .catch((error) => {
      setCloudinaryImage("H3");
      console.log(error);
    });
  };

  var add = () => {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:50052/api/Advertise");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            navi("/advertise");
        }
    }
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(advData));
  }

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

    <div class="container mt-5">
    <h2>Upload Advertisement</h2>
        <div class="form-group">
            <label for="image">Upload Image</label>
            <input type="file" class="form-control-file" onChange={(e)=>setUploadFile(e.target.files[0])} name="image"/>
        </div>
        <div class="form-group">
            <label for="description">Description</label>
            <textarea class="form-control" name="description" rows="3" onChange={AdvDataChange} placeholder="Enter description"></textarea>
        </div>
        <div class="form-group">
            <label for="date">Date</label>
            <input type="date" class="form-control" onChange={AdvDataChange} name="date"/>
        </div>
        <br/>
        <button class="btn btn-primary" onClick={handleUpload}>Upload</button>
    </div>
    <br/>
    
    {/* <div className="society-info">
        <div>
            <input type='file' onChange={(e)=>setUploadFile(e.target.files[0])}></input>
            <button onClick={handleUpload}>upload</button>
        </div>
        <div>
            <input description data></input>
        </div>
        <div style={{backgroundColor:"red"}}><h1></h1></div>

    </div> */}
    
    <footer className="footer">
    </footer>
  </div>
);
  }
  
  export default AddAdvertise;