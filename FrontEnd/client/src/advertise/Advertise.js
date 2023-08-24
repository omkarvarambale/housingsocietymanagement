import React, { useEffect, useState } from 'react';
import '../Homepage.css'; // You can create a separate CSS file for styling
import { Link, Route, Routes, useNavigate } from "react-router-dom";


function HomePage1() {

  var [adv, setAdv] = useState([]);


  var navi = useNavigate();

  var login = window.sessionStorage.getItem("login") == "true";
  var logid = window.sessionStorage.getItem("logid");
  var fname = window.sessionStorage.getItem("fname");
  var lname = window.sessionStorage.getItem("lname");

  let memcontent;
  let logincontent = <button onClick={gotologin}>Login</button>;
  let logoutcontent;
  if (login) {
    memcontent = <button onClick={gotomem}>All Member</button>;
    logincontent = "";
    logoutcontent = <button onClick={gotologout}>Logout</button>;
  }

  function gotohome() { navi("/"); }
  function gotoadv() { debugger; navi("/advertise"); }
  function gotogal() { navi("/gallery"); }
  function gotocont() { navi("/contactus"); }
  function gotologin() { navi("/user/login"); }
  function gotomem() { navi("/user/members") }
  function gotomang() { navi("/management"); }
  function gotologout() { navi("/user/logout"); }

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
          {logoutcontent}
        </nav>
      </header>

      <div className="society-info">
        {adv.map(u => (
              <div key={u.Id} style={{width:"340px", border:"2px solid black",padding:"10px",margin:"10px" ,overflow:"auto", display:"inline-block"}}>
              <img style={{width:"320px"}} src='/photos/adv2.jpg' alt={u.image}></img>
              <br/>
              <p style={{textAlign:"justify"}}>{u.description}</p>
              <p>Date:{convertDateFormat(u.date)}</p>
              </div>
        ))}

      </div>

      <footer className="footer">
        {/* Footer content goes here */}
      </footer>
    </div>
  );
};

export default HomePage1;


{/* <div style={{width:"350px",height:"500px", border:"2px solid black",padding:"10px",margin:"10px" ,overflow:"auto", display:"inline-block"}}>
          <img style={{width:"320px"}} src='/photos/adv2.jpg'></img>
          <br/>
          <p style={{textAlign:"justify"}}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit libero quisquam ipsa atque non illum? Voluptatem est
    aliquid nemo alias eos debitis. Vero quidem consequatur voluptates placeat illum nihil qui.
    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit libero quisquam ipsa atque non illum? Voluptatem est
    aliquid nemo alias eos debitis. Vero quidem consequatur voluptates placeat illum nihil qui
    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit libero quisquam ipsa atque non illum? Voluptatem est
    aliquid nemo alias eos debitis. Vero quidem consequatur voluptates placeat illum nihil qui
    </p>
          <p>date</p>
        </div>
        <div style={{width:"350px",height:"500px", border:"2px solid black",padding:"10px",margin:"10px" ,overflow:"auto", display:"inline-block"}}>
          <img style={{width:"320px"}} src='/photos/adv2.jpg'></img>
          <br/>
          <p style={{textAlign:"justify"}}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit libero quisquam ipsa atque non illum? Voluptatem est
    aliquid nemo alias eos debitis. Vero quidem consequatur voluptates placeat illum nihil qui.
    </p>
          <p>date</p>
        </div>
        <div style={{width:"350px",height:"500px", border:"2px solid black",padding:"10px",margin:"10px" ,overflow:"auto", display:"inline-block"}}>
          <img style={{width:"320px"}} src='/photos/adv2.jpg'></img>
          <br/>
          <p style={{textAlign:"justify"}}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit libero quisquam ipsa atque non illum? Voluptatem est
    aliquid nemo alias eos debitis. Vero quidem consequatur voluptates placeat illum nihil qui.
    </p>
          <p>date</p>
        </div> */}