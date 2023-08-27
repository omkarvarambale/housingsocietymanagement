import React from 'react';
import '../Homepage.css'; // You can create a separate CSS file for styling
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import Dropdown from '../home/Dropdown.js';

function Management(){
  var [management , setManagement ] = useState([]) ;

  var login = window.sessionStorage.getItem("login") == "true";
  var logid = window.sessionStorage.getItem("logid");
  var fname = window.sessionStorage.getItem("fname");
  var lname = window.sessionStorage.getItem("lname");
  var admin = window.sessionStorage.getItem("role") == 1;
    
  useEffect(()=>{
      var xhr = new XMLHttpRequest() ;
      xhr.open("GET" , "http://localhost:50052/api/Management") ;
      xhr.onreadystatechange = function(){
          if (xhr.readyState === 4 && xhr.status === 200){
              var data = JSON.parse(xhr.responseText) ;
              setManagement([...data]) ;
          }
      }
      xhr.setRequestHeader("Content-Type", "application/json") ;
      xhr.send() ;
  } , []);

  var deleteManagment = (x)=>{
      console.log(x);
      var xhr = new XMLHttpRequest() ;
      xhr.open("DELETE" , "http://localhost:50052/api/Management/"+x) ;
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

  var updateUser = (x) =>{
    console.log(x);

  }
    var navi = useNavigate();
    function logoclicked(){
        window.location.reload();
    }
    function gotohome(){ navi("/"); }
    function gotoadv(){ debugger; navi("/advertise"); }
    function gotogal(){ navi("/gallery"); }
    function gotocont(){ navi("/contactus"); }
    function gotologin() {navi("/user/login"); }
    function gotomang(){navi("/management");}
    function gotologout(){ navi("/user/logout"); }
    function gotomem(){ navi("/user/members") }
    function gotosignup(){ navi("/user/add");}


    let memcontent;
    let logincontent=<button onClick={gotologin}>Login</button>;
    let logoutcontent;
    let admincontent1;
    let admincontent2;
    let signupcontent=<button onClick={gotosignup}>Signup</button>;
    if (login) {
      memcontent =<button onClick={gotomem}>All Member</button>;
      logincontent="";
      logoutcontent=<button onClick={gotologout}>Logout</button>;
      signupcontent="";
      if(admin){
        admincontent1=<><th>Delete</th><th>Update</th></>;
        admincontent2=<h3><button><Link to="/management/add">Add Managment Member </Link></button></h3>
      }
    }
    

    return (
        <div className="homepage-container">
      <header className="header">
        <nav className="nav-links">
           <button onClick={gotohome}>Home</button>
           <button onClick={gotoadv}>Advertise</button>
           {memcontent}
           <button onClick={gotogal}>Gallery</button>
           <button style={{color:"red"}} onClick={gotomang}>Management People</button>
           <button onClick={gotocont}>Contact Us</button>
           {logincontent}
           {signupcontent}
           { login ? (<Dropdown />):(<></>)}
         </nav>
      </header>

      <br/>
      <center><h2>Management Members</h2></center>
      <center><br/>
        {admincontent2}
      </center>

      <div className="row" style={{padding:"15px"}}>
        {management.map(m => (
          <div key={m.Id} className="col-md-4 mb-4">
            <div className="card">
              <img src={m.img} className="card-img-top" alt='img' />
              <div className="card-body">
                <h5 className="card-title">{m.name}</h5>
                <p className="card-text">Email: {m.email}</p>
                <p className="card-text">Phone No: {m.phoneNo}</p>
                <p className="card-text">Position: {m.position}</p>
                {admin ? (
                  <div>
                    <button className="btn btn-danger" onClick={() => { deleteManagment(m.Id) }}>Delete</button>
                    {/* <Link to={`/managment/updateManagment/${m.Id}`} className="btn btn-primary ml-2">Update</Link> */}
                  </div>
                ):<></>}
              </div>
            </div>
          </div>
        ))}
      </div>

      
    </div>
    );
};
export default Management;