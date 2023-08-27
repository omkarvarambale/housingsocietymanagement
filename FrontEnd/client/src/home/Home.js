import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Dropdown from './Dropdown.js';


function Home() {

    var navi = useNavigate();
   
    var login = window.sessionStorage.getItem("login") == "true";
    var logid = window.sessionStorage.getItem("logid");
    var fname = window.sessionStorage.getItem("fname");
    var lname = window.sessionStorage.getItem("lname");
    var admin = window.sessionStorage.getItem("role") == 1;

    function gotohome(){ navi("/"); }
    function gotoadv(){ debugger; navi("/advertise"); }
    function gotogal(){ navi("/gallery"); }
    function gotomang(){ navi("/management"); }
    function gotocont(){ navi("/contactus"); }
    function gotologin() {navi("/user/login"); }
    function gotomem(){ navi("/user/members") }
    function gotologout(){ navi("/user/logout"); }


    let memcontent;
    let logincontent=<button onClick={gotologin}>Login</button>;
    let admincontent1;
    let admincontent2;
    let logoutcontent;
    if (login) {
      memcontent =<button onClick={gotomem}>All Member</button>;
      logincontent="";
      logoutcontent=<button onClick={gotologout}>Logout</button>;
      if(admin){
        admincontent1=<><th>Delete</th><th>Update</th></>;
        admincontent2=<button><Link to="/user/add">Add User </Link></button>
      }
    }


    function goToLogin() {
        navi("/user/login");
    }

    const hardcodedPath = "/photos/";

    var [user , setUser ] = useState([]) ;
    var [userData, setUserData] = useState({
      "fname": "", "lname": "", "email": "", "password": "",
      "flatno": "", "familymember": "", "mobileno": "",
      "profession": "", "image": ""
    });
    
    useEffect(()=>{

        if(!login){
            navi("/user/login");
        }
      else{

        var xhr = new XMLHttpRequest() ;
        xhr.open("GET" , "http://localhost:50052/api/Home") ;
        xhr.onreadystatechange = function(){
            if (xhr.readyState === 4 && xhr.status === 200){
                var data = JSON.parse(xhr.responseText) ;
                setUser([...data]) ;
            }
        }
        xhr.setRequestHeader("Content-Type", "application/json") ;
        xhr.send() ;
        
      }
      
    } , []);


    var deleteUser = (x)=>{
        console.log(x);
        var xhr = new XMLHttpRequest() ;
        xhr.open("DELETE" , "http://localhost:50052/api/Home/"+x) ;
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
      //<h3><button><Link to="/user/add">Add User </Link></button></h3>
    }
    function display(x){
      debugger;
      if(logid==x)
        return "inline";
      else return "none";
    }




    

  return (
    <div className="homepage-container">
      <header className="header">
        <nav className="nav-links">
          <button onClick={gotohome}>Home</button>
          <button onClick={gotoadv}>Advertise</button>
          <button style={{color:"red"}} onClick={gotomem}>All Member</button>
          <button onClick={gotogal}>Gallery</button>
          <button onClick={gotomang}>Management People</button>
          <button onClick={gotocont}>Contact Us</button>
          {logincontent}
          { login ? (<Dropdown />):(<></>)}
        </nav>
      </header>
    <center>
    <div>
      <br/>
      <h3>Member List</h3><br/>
      <h3></h3>
      <table style={{width:"75%"}} className="table table-striped">
        <thead>
          <tr>
            <th>Image</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Flat No</th>
            <th>Family Member</th>
            <th>mobile no</th>
            <th>Profession</th>
            {admincontent1}
          </tr>
        </thead>
        <tbody>
          {user.map(u => (
            <tr key={u.Id}>
              <td><div><img style={{width:30+"px"}} src={u.image} alt="no Image" /></div></td>
              <td>{u.fname}</td>
              <td>{u.lname}</td>
              <td>{u.email}</td>
              <td>{u.flatno}</td>
              <td>{u.familymember}</td>
              <td>{u.mobileno}</td>
              <td>{u.profession}</td>
              {admin ? (<>
                        <td><button onClick={()=>{deleteUser(u.Id)}} >Delete</button></td>
                        <td><Link to={`/user/update/${u.Id}`}>Update</Link></td></>
                    ) : (<></>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </center>
    </div>
  );
}

export default Home;