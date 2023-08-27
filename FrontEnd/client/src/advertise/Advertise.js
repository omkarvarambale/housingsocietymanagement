import React, { useEffect, useState } from 'react';
import '../Homepage.css'; // You can create a separate CSS file for styling
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Dropdown from '../home/Dropdown.js';


function HomePage1() {

  var [adv, setAdv] = useState([]);


  var navi = useNavigate();

  var login = window.sessionStorage.getItem("login") == "true";
  var logid = window.sessionStorage.getItem("logid");
  var fname = window.sessionStorage.getItem("fname");
  var lname = window.sessionStorage.getItem("lname");

  let memcontent;
  let logincontent = <button onClick={gotologin}>Login</button>;
  let logincontent2;
  let logoutcontent;
  let signupcontent=<button onClick={gotosignup}>Signup</button>;
  if (login) {
    memcontent = <button onClick={gotomem}>All Member</button>;
    logincontent = "";
    logoutcontent = <button onClick={gotologout}>Logout</button>;
    logincontent2 = <button style={{margin:"10px"}} className='btn btn-info' onClick={gotoaddadv}>Add Advertise</button>;
    signupcontent="";
  }

  function gotohome() { navi("/"); }
  function gotoadv() { navi("/advertise"); }
  function gotoaddadv() { navi("/advertise/add"); }
  function gotogal() { navi("/gallery"); }
  function gotocont() { navi("/contactus"); }
  function gotologin() { navi("/user/login"); }
  function gotomem() { navi("/user/members") }
  function gotomang() { navi("/management"); }
  function gotologout() { navi("/user/logout"); }
  function gotosignup(){ navi("/user/add");}

  useEffect(() => {

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:50052/api/Advertise");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var data = JSON.parse(xhr.responseText);
        debugger;
        setAdv([...data]);
      }
    }
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();

  }, []);

  function convertDateFormat(inputDate){
    var inputDate1 =inputDate.split("T",2)[0]
    const parts = inputDate1.split('-');
    if (parts.length === 3) {
      const [year, month, day] = parts;
      const outputDate = `${day}-${month}-${year}`;
      return outputDate;
    } else {
      return 'Invalid date format';
    }
  };


  return (
    <div className="homepage-container">
      <header className="header">
        <nav className="nav-links">
          <button onClick={gotohome}>Home</button>
          <button style={{ color: "red" }} onClick={gotoadv}>Advertise</button>
          {memcontent}
          <button onClick={gotogal}>Gallery</button>
          <button onClick={gotomang}>Management People</button>
          <button onClick={gotocont}>Contact Us</button>
          {logincontent}
          {signupcontent}
          { login ? (<Dropdown />):(<></>)}
        </nav>
      </header>
      <br/>
      <center><h2>Advertise</h2></center>
      {logincontent2}
      <div className="society-info">
        {adv.map(u => (
              <div key={u.Id} style={{width:"340px", border:"2px solid black",padding:"10px",margin:"10px" ,overflow:"auto", display:"inline-block"}}>
              <img style={{width:"320px"}} src={u.image} alt="img"></img>
              <br/>
              <p style={{textAlign:"justify"}}>{u.description}</p>
              <p>Date:{convertDateFormat(u.date)}</p>
              </div>
        ))}

      </div>

    </div>
  );
};

export default HomePage1;