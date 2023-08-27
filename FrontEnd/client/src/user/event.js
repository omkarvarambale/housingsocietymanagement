import React from 'react';
import '../Homepage.css'; // You can create a separate CSS file for styling
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Dropdown from '../home/Dropdown.js';
import { useState, useEffect } from "react";

function Event() {
    var navi = useNavigate();
    var login = window.sessionStorage.getItem("login") == "true";
    var logid = window.sessionStorage.getItem("logid");
    var fname = window.sessionStorage.getItem("fname");
    var lname = window.sessionStorage.getItem("lname");
    var isAdmin = window.sessionStorage.getItem("role")==1;

    let memcontent;
    let logincontent = <button onClick={gotologin}>Login</button>;
    let admincontent;
    let signupcontent = <button onClick={gotosignup}>Signup</button>;
    if (login) {
        memcontent = <button onClick={gotomem}>All Member</button>;
        logincontent = "";
        signupcontent = "";
        if(isAdmin) admincontent = <button className='btn btn-primary' onClick={gotoaddevent}>Add Event</button>
    }

    var [events , setEvents ] = useState([]) ;

    useEffect(() => {
        if(!login) navi("/");
            var xhr = new XMLHttpRequest();
            xhr.open("GET", "http://localhost:50052/api/Event");
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    var data = JSON.parse(xhr.responseText);
                    setEvents([...data]);
                }
            }
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send();
    }, []);

    function gotohome() { navi("/"); }
    function gotoadv() { navi("/advertise"); }
    function gotogal() { navi("/gallery"); }
    function gotomang() { navi("/management"); }
    function gotocont() { navi("/contactus"); }
    function gotologin() { navi("/user/login"); }
    function gotomem() { navi("/user/members") }
    function gotologout() { navi("/user/logout"); }
    function gotosignup() { navi("/user/add"); }
    function gotoaddevent() { navi("/event/add"); }

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

    function handleDeleteImage(x){
        var xhr = new XMLHttpRequest() ;
            xhr.open("DELETE" , "http://localhost:50052/api/Event/"+x) ;
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
                    <button onClick={gotomem}>All Member</button>
                    <button onClick={gotogal}>Gallery</button>
                    <button onClick={gotomang}>Management People</button>
                    <button onClick={gotocont}>Contact Us</button>
                    {login ? (<Dropdown />) : (<></>)}
                </nav>
            </header>

            <br/>
      <center><h2>Events</h2></center>
      {admincontent}
      <div className="society-info">
        {events.map(u => (
              <div key={u.Id} style={{width:"340px", border:"2px solid black",padding:"10px",margin:"10px" ,overflow:"auto", display:"inline-block"}}>
              <img style={{width:"320px"}} src={u.eventimage} alt="img"></img>
              <br/>
              <h4>{u.eventname}</h4>
              <p style={{textAlign:"justify"}}>{u.description}</p>
              <p style={{textAlign:"justify"}}>{u.place}</p>
              <p>Date:{convertDateFormat(u.eventdate)}</p>
              <p style={{textAlign:"justify"}}>Time : {u.eventtime}</p>
              { isAdmin ? (
                <button className='btn btn-danger' onClick={() => handleDeleteImage(u.Id)}>Delete</button>
                ):(<></>)}
              </div>
        ))}

      </div>

            


        </div>
    );
}

export default Event;


//<p>Date:{convertDateFormat(u.eventdate)}</p>
