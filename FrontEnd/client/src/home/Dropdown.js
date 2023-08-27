// src/components/Dropdown.js
import React, { useState } from 'react';
import './Dropdown.css';
import {useNavigate, Link } from "react-router-dom";

function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  var login = window.sessionStorage.getItem("login") == "true";
  var isAdmin = window.sessionStorage.getItem("role")==1;
  var fname = window.sessionStorage.getItem("fname");
  var lname = window.sessionStorage.getItem("lname");
  var logid = window.sessionStorage.getItem("logid");
  var char = fname.charAt(0)+lname.charAt(0);

  var navi = useNavigate();
  function gotologout(){window.sessionStorage.clear();
    navi("/");}

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown-container">
      <button style={{backgroundColor:"cyan",borderRadius:"25px"}} className="dropdown-button" onClick={toggleDropdown}>
        {char}
      </button>
      {isOpen && (
        <div className="dropdown-content">
          <button className='btn btn-warning' onClick={()=>{navi(`/user/update/${logid}`)}}>Profile</button>
          <button className='btn btn-warning' onClick={()=>{navi(`/event`)}}>Event</button>
          <button className='btn btn-warning' onClick={()=>{navi(`/complain`)}}>Complain</button>
          <button className='btn btn-danger' onClick={gotologout}>Logout</button>
        </div>
      )}
    </div>
  );
}

export default Dropdown;