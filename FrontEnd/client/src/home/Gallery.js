import React from 'react';
import { useState, useEffect } from "react";
import '../Homepage.css'; // You can create a separate CSS file for styling
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { Button } from 'bootstrap';
import Axios from "axios";

function Gallery() {
  var navi = useNavigate();

  var logid = window.sessionStorage.getItem("logid");
  var fname = window.sessionStorage.getItem("fname");
  var lname = window.sessionStorage.getItem("lname");
  var isAdmin = window.sessionStorage.getItem("role")==1;
  var login = window.sessionStorage.getItem("login") == "true";

  var [galleryImages , setGalleryImages ] = useState([]) ;
  useEffect(()=>{
    var xhr = new XMLHttpRequest() ;
    xhr.open("GET" , "http://localhost:50052/api/Gallery") ;
    xhr.onreadystatechange = function(){
        if (xhr.readyState === 4 && xhr.status === 200){
            var data = JSON.parse(xhr.responseText) ;
            setGalleryImages([...data]) ;
        }
    }
    xhr.setRequestHeader("Content-Type", "application/json") ;
    xhr.send() ;
  } , []);




  function gotohome(){ navi("/"); }
  function gotoadv(){ navi("/advertise"); }
  function gotogal(){ navi("/gallery"); }
  function gotomang(){ navi("/management"); }
  function gotocont(){ navi("/contactus"); }
  function gotologin() {navi("/user/login"); }
  function gotomem(){ navi("/user/members") }
  function gotologout(){ navi("/user/logout"); }


  var [galleryData, setGalleryData] = useState({ "userId": logid , "image": "" });
  var [uploadFile, setUploadFile] = useState("");
  
  const handleUpload = (e) => {
    e.preventDefault();
    const formData = new FormData ();
    formData.append("file", uploadFile);
    formData.append("upload_preset", "HousingSocietyManagement");
    
    Axios.post("https://api.cloudinary.com/v1_1/dvsmrv64h/image/upload",formData
    )
    .then((response) => {
    console.log(response);
    console.log(response.data.secure_url);
    // updateImage(response.data.secure_url);
    galleryData.image = response.data.secure_url ;
    setGalleryData({...galleryData});
    add();
    })
    .catch((error) => {
    console.log(error);
    });
  };

  let memcontent;
  let logincontent=<button onClick={gotologin}>Login</button>;
  let logoutcontent;
  let addgal;
  if (login) {
    memcontent =<button onClick={gotomem}>All Member</button>;
    logincontent="";
    logoutcontent=<button onClick={gotologout}>Logout</button>;
    addgal=<div>
          <input name="image" type="file" required placeholder="image" onChange={(e)=>setUploadFile(e.target.files[0])} />
          <button className="btn btn-primary" onClick={handleUpload}>save img</button>
          </div>;
  }

  var add = () => {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:50052/api/Gallery");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          window.location.reload();
        }
    }
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(galleryData));
  }

  function handleDeleteImage(x){
    var xhr = new XMLHttpRequest() ;
        xhr.open("DELETE" , "http://localhost:50052/api/Gallery/"+x) ;
                xhr.onreadystatechange = function(){
                    if (xhr.readyState === 4 && xhr.status === 200){
                        var data = JSON.parse(xhr.responseText) ;
                        console.log(data);
                        window.location.reload() ;     
                    }
                }
                xhr.setRequestHeader("Content-Type", "application/json") ;
                xhr.send() ;
  }

return (
  <div className="homepage-container">
    <header className="header">
      <nav className="nav-links">
        <button onClick={gotohome}>Home</button>
        <button onClick={gotoadv}>Advertise</button>
        {memcontent}
        <button style={{color:"red"}} onClick={gotogal}>Gallery</button>
        <button onClick={gotomang}>Management People</button>
        <button onClick={gotocont}>Contact Us</button>
        {logincontent}
        {logoutcontent}
      </nav>
    </header>
    <center><br/><h3>Society Photos</h3><br/></center>
    <div class="row">
      {galleryImages.map(u => (
              <div key={u.Id} class="col-lg-4 col-md-12 mb-4 mb-lg-0">
                { (isAdmin || (logid == u.userId)) ? (
                <button className='btn btn-danger' onClick={() => handleDeleteImage(u.Id)}>Delete</button>
                ):(<></>)}
              <img class="w-100 shadow-1-strong rounded mb-4" src={u.image} alt="img"></img>
              </div>
        ))}
    </div>
    {addgal}
  </div>
);
  }
  
  export default Gallery;