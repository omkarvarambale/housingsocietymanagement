import React from 'react';
import './Homepage.css'; // You can create a separate CSS file for styling
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";

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

    let memcontent;
    let logincontent=<button onClick={gotologin}>Login</button>;
    let logoutcontent;
    let admincontent1;
    let admincontent2;
    if (login) {
      memcontent =<button onClick={gotomem}>All Member</button>;
      logincontent="";
      logoutcontent=<button onClick={gotologout}>Logout</button>;
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
           {logoutcontent}
         </nav>
      </header>

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
                    <Link to={`/managment/updateManagment/${m.Id}`} className="btn btn-primary ml-2">Update</Link>
                  </div>
                ):<></>}
              </div>
            </div>
          </div>
        ))}
      </div>



      
    {/* <div className="society-info">
    <div className="col-md-8 offset-md-2" style={{textAlign:"justify" , marginTop : 5+"px"}}>
    <center>
    <div>
      <h2>Managment List</h2>
      {admincontent2}
      <br/>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Profile</th>
            <th>Name</th>
            <th>Email</th>
            <th>mobile no</th>
            <th>Position</th>
            {admincontent1}
          </tr>
        </thead>
        <tbody>
          {management.map(m => (
            <tr key={m.Id}>
              <td><img width={"60px"} src={m.img} alt='img'></img></td>
              <td>{m.name}</td>
              <td>{m.email}</td>
              <td>{m.phoneNo}</td>
              <td>{m.position}</td>
              {admin ? (<>
                <td><button onClick={()=>{deleteManagment(m.Id)}} >Delete</button></td>
                <td><Link to={`/managment/updateManagment/${m.Id}`}>Update</Link></td>
                </>) : (<></>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </center>
    </div>
    </div> */}
      
    </div>
    );
};
export default Management;



{/* <h3><button><Link to="/management/add">Add Managment Member </Link></button></h3> */}
{/* <th>Delete</th>
<th>Update</th> */}
{/* <td><button onClick={()=>{deleteManagment(m.Id)}} >Delete</button></td>
<td><Link to={`/managment/updateManagment/${m.Id}`}>Update</Link></td> */}






// import React from 'react';
// import './Homepage.css'; // You can create a separate CSS file for styling
// import { Link, Route, Routes, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";

// function MangPeop() {
//     var navi = useNavigate();

//     var login = window.sessionStorage.getItem("login") == "true";
//     var logid = window.sessionStorage.getItem("logid");
//     var fname = window.sessionStorage.getItem("fname");
//     var lname = window.sessionStorage.getItem("lname");
    
//     let memcontent;
//     let logincontent=<button onClick={gotologin}>Login</button>;
//     let logoutcontent;
//     if (login) {
//       memcontent =<button onClick={gotomem}>All Member</button>;
//       logincontent="";
//       logoutcontent=<button onClick={gotologout}>Logout</button>;
//     }

//     function gotohome(){ navi("/"); }
//     function gotoadv(){ debugger; navi("/advertise"); }
//     function gotogal(){ navi("/gallery"); }
//     function gotocont(){ navi("/contactus"); }
//     function gotologin() {navi("/user/login"); }
//     function gotomem(){ navi("/user/members") }
//     function gotomang(){ navi("/management"); }
//     function gotologout(){ navi("/user/logout"); }

//     var [mangPeop , setMangPeop ] = useState([]) ;

//     useEffect(()=>{
//       var xhr = new XMLHttpRequest() ;
//       xhr.open("GET" , "http://localhost:50052/api/Management") ;
//       xhr.onreadystatechange = function(){
//           if (xhr.readyState === 4 && xhr.status === 200){
//               var data = JSON.parse(xhr.responseText) ;
//               setMangPeop([...data]) ;
//           }
//       }
//       xhr.setRequestHeader("Content-Type", "application/json") ;
//       xhr.send() ;
//     } , []);


//   return (
//     <div className="homepage-container">
//       <header className="header">
//         <nav className="nav-links">
//           <button onClick={gotohome}>Home</button>
//           <button onClick={gotoadv}>Advertise</button>
//           {memcontent}
//           <button onClick={gotogal}>Gallery</button>
//           <button style={{color:"red"}} onClick={gotomang}>Management People</button>
//           <button onClick={gotocont}>Contact Us</button>
//           {logincontent}
//           {logoutcontent}
//         </nav>
//       </header>

//       <center>
//         <div>
//           <br/>
//           <h3>Member List</h3><br/>
//           <table style={{width:"75%"}} className="table table-striped">
//             <thead>
//               <tr>
//                 <th>Image</th>
//                 <th>First Name</th>
//                 <th>Last Name</th>
//                 <th>Email</th>
//                 <th>Flat No</th>
//                 <th>Family Member</th>
//                 <th>mobile no</th>
//                 <th>Profession</th>
//               </tr>
//             </thead>
//             <tbody>
//               {mangPeop.map(u => (
//                 <tr key={u.Id}>
//                   <td><div><img style={{width:30+"px"}}  alt="no Image" /></div></td>
//                   <td>{u.fname}</td>
//                   <td>{u.lname}</td>
//                   <td>{u.email}</td>
//                   <td>{u.flatno}</td>
//                   <td>{u.familymember}</td>
//                   <td>{u.mobileno}</td>
//                   <td>{u.profession}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </center>
//     </div>
//   );
// };

// export default MangPeop;