import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";


function Home() {

    var navi = useNavigate();
   
    var login = window.sessionStorage.getItem("login") == "true";
    var logid = window.sessionStorage.getItem("logid");
    var fname = window.sessionStorage.getItem("fname");
    var lname = window.sessionStorage.getItem("lname");

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
    let logoutcontent;
    if (login) {
      memcontent =<button onClick={gotomem}>All Member</button>;
      logincontent="";
      logoutcontent=<button onClick={gotologout}>Logout</button>;
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
          {logoutcontent}
        </nav>
      </header>

    <div>
      <h3>User List</h3>
      <h4>{fname} {lname}</h4>
      <table className="table table-striped">
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
            <th></th>
          </tr>
        </thead>
        <tbody>
          {user.map(u => (
            <tr key={u.Id}>
              <td><div><img style={{width:30+"px"}} src={hardcodedPath+u.image.split("\\")[2]} alt="no Image" /></div></td>
              <td>{u.fname}</td>
              <td>{u.lname}</td>
              <td>{u.email}</td>
              <td>{u.flatno}</td>
              <td>{u.familymember}</td>
              <td>{u.mobileno}</td>
              <td>{u.profession}</td>
              <td><Link style={{display:display(u.Id)}} to={`/user/update/${u.Id}`}>Update</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}

export default Home;



// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min';
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import { useEffect, useState } from "react";
// import { Link, Route, Routes, useNavigate } from "react-router-dom";
// import AddUser from './addUser';


// function Home() {

//     var navi = useNavigate();

//     function goToLogin() {
//         navi("/user/login");
//     }

//     const hardcodedPath = "/photos/";

//     var [user , setUser ] = useState([]) ;
//     var [userData, setUserData] = useState({
//       "fname": "", "lname": "", "email": "", "password": "",
//       "flatno": "", "familymember": "", "mobileno": "",
//       "profession": "", "image": ""
//   });
    
//     useEffect(()=>{

//       const storedDataJSON = sessionStorage.getItem('myLoggedInUser');
//       if (storedDataJSON) {
//         setUserData(JSON.parse(storedDataJSON));
//       }
//       else{
//         goToLogin();
//       }
      
//         var xhr = new XMLHttpRequest() ;
//         xhr.open("GET" , "http://localhost:50052/api/Home") ;
//         xhr.onreadystatechange = function(){
//             if (xhr.readyState === 4 && xhr.status === 200){
//                 var data = JSON.parse(xhr.responseText) ;
//                 debugger;
//                 setUser([...data]) ;
//             }
//         }
//         xhr.setRequestHeader("Content-Type", "application/json") ;
//         xhr.send() ;
//     } , []);

//     var deleteUser = (x)=>{
//         console.log(x);
//         var xhr = new XMLHttpRequest() ;
//         xhr.open("DELETE" , "http://localhost:50052/api/Home/"+x) ;
//                 xhr.onreadystatechange = function(){
//                     if (xhr.readyState === 4 && xhr.status === 200){
//                         var data = JSON.parse(xhr.responseText) ;
//                         console.log(data);
//                         window.location.reload() ;     
//                     }
//                 }
//                 xhr.setRequestHeader("Content-Type", "application/json") ;
//                 xhr.send() ;
//     }

//     var updateUser = (x) =>{
//       console.log(x);

//     }

//   return (
//     <div className="col-md-8 offset-md-2" style={{textAlign:"justify" , marginTop : 5+"px"}}>

//     <div>
//       <h2>User List</h2>
//       <h3><button><Link to="/user/add">Add User </Link></button></h3>
//       <table className="table table-striped">
//         <thead>
//           <tr>
//             <th>Image</th>
//             <th>First Name</th>
//             <th>Last Name</th>
//             <th>Email</th>
//             <th>Flat No</th>
//             <th>Family Member</th>
//             <th>mobile no</th>
//             <th>Profession</th>
//             <th>Delete</th>
//             <th>Update</th>
//           </tr>
//         </thead>
//         <tbody>
//           {user.map(u => (
//             <tr key={u.Id}>
//               <td><div><img style={{width:30+"px"}} src={hardcodedPath+u.image.split("\\")[2]} alt="no Image" /></div></td>
//               <td>{u.fname}</td>
//               <td>{u.lname}</td>
//               <td>{u.email}</td>
//               <td>{u.flatno}</td>
//               <td>{u.familymember}</td>
//               <td>{u.mobileno}</td>
//               <td>{u.profession}</td>
//               <td><button onClick={()=>{deleteUser(u.Id)}} >Delete</button></td>
//               <td><Link to={`/user/update/${u.Id}`}>Update</Link></td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//     </div>
//   );
// }

// export default Home;