import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import Dropdown from '../home/Dropdown.js';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const UpdateUser = () => {

    var login = window.sessionStorage.getItem("login") == "true";
    var logid = window.sessionStorage.getItem("logid");
    var navi = useNavigate();

    function goToHomePage() {
        navi("/");
    }

    const { userId } = useParams();

    var [userData, setUserData ] = useState({"fname":"","lname":"","email":"","password":"",
                                        "flatno":"","familymember":"","mobileno":"",
                                        "profession":"","image":""}
    );

    var userDataChange  = (x)=>{
        userData[x.target.name] = x.target.value;
        setUserData({...userData}) ;
    }

    useEffect(()=>{
        if(!login) navi("/");

        var xhr = new XMLHttpRequest() ;
        xhr.open("GET" , "http://localhost:50052/api/Home/"+userId) ;
        xhr.onreadystatechange = function(){
            if (xhr.readyState === 4 && xhr.status === 200){
                var data = JSON.parse(xhr.responseText) ;
                setUserData({...data}) ;
            }
        }
        xhr.setRequestHeader("Content-Type", "application/json") ;
        xhr.send() ;
    } , []);

    var saveUser =()=>{

        if(userData.fname == ""){
            toast.error("First Name can not be empty!!!") ; return;}
        if(userData.lname == ""){
            toast.error("Last Name can not be empty!!!") ; return;}
        if(userData.mobileno == ""){
            toast.error("Mobile no can not be empty!!!") ; return;}
        if(userData.familymember == ""){
            toast.error("Family Member can not be empty!!!") ; return;}

        var xhr = new XMLHttpRequest() ;
        xhr.open("PUT" , "http://localhost:50052/api/Home/"+userId) ;
        xhr.onreadystatechange = function(){
            if (xhr.readyState === 4 && xhr.status === 200){
                var data = JSON.parse(xhr.responseText) ;
                console.log(data);
                goToHomePage();
            }
        }
        xhr.setRequestHeader("Content-Type", "application/json") ;
        xhr.send(JSON.stringify(userData)) ;
    }

    let memcontent;
    let logincontent=<button onClick={gotologin}>Login</button>;
    let logoutcontent;
    let signupcontent=<button onClick={gotosignup}>Signup</button>;
    if (login) {
    memcontent =<button onClick={gotomem}>All Member</button>;
    logincontent="";
    logoutcontent=<button onClick={gotologout}>Logout</button>;
    signupcontent="";
    }
    function gotohome(){ navi("/"); }
    function gotoadv(){ navi("/advertise"); }
    function gotogal(){ navi("/gallery"); }
    function gotomang(){ navi("/management"); }
    function gotocont(){ navi("/contactus"); }
    function gotologin() {navi("/user/login"); }
    function gotomem(){ navi("/user/members") }
    function gotologout(){ navi("/user/logout"); }
    function gotosignup(){ navi("/user/add");}



  return (
    <div>
        <header className="header">
      <nav className="nav-links">
        <button onClick={gotohome}>Home</button>
        <button onClick={gotoadv}>Advertise</button>
        {memcontent}
        <button onClick={gotogal}>Gallery</button>
        <button onClick={gotomang}>Management People</button>
        <button onClick={gotocont}>Contact Us</button>
        {logincontent}
        {signupcontent}
        { login ? (<Dropdown />):(<></>)}
      </nav>
    </header>
            <br></br>
            <center>
            <h2>Update Profile</h2>

            <div className="container">
    <div className="row justify-content-center">
        <div className="col-md-6">
            <table className="table">
                <tbody>
                    <tr>
                        <td>First Name:</td>
                        <td>
                            <input
                                className="form-control"
                                name="fname"
                                type="text"
                                placeholder="First Name"
                                value={userData.fname}
                                onChange={userDataChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Last Name:</td>
                        <td>
                            <input
                                className="form-control"
                                name="lname"
                                type="text"
                                placeholder="Last Name"
                                value={userData.lname}
                                onChange={userDataChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Email:</td>
                        <td>
                            <input
                                className="form-control"
                                name="email"
                                readOnly
                                type="text"
                                placeholder="Email"
                                value={userData.email}
                                onChange={userDataChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Flat No:</td>
                        <td>
                            <input
                                className="form-control"
                                name="flatno"
                                type="text"
                                placeholder="Flat No"
                                value={userData.flatno}
                                onChange={userDataChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Member:</td>
                        <td>
                            <input
                                className="form-control"
                                name="familymember"
                                type="number"
                                placeholder="Member"
                                value={userData.familymember}
                                onChange={userDataChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Mobile No:</td>
                        <td>
                            <input
                                className="form-control"
                                name="mobileno"
                                type="text"
                                placeholder="Mobile No"
                                value={userData.mobileno}
                                onChange={userDataChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Profession:</td>
                        <td>
                            <input
                                className="form-control"
                                name="profession"
                                type="text"
                                placeholder="Profession"
                                value={userData.profession}
                                onChange={userDataChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2} style={{ textAlign: "center" }}>
                            <button className="btn btn-success" onClick={saveUser}>
                                Save User
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>



            </center>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />


            
        </div>
  );
};

export default UpdateUser;


// <table>
// <tr>
//     <td>First Name :</td>
//     <td><input name="fname" type="text" placeholder="First Name" value={userData.fname} onChange={userDataChange} /></td>
//     <br></br>
// </tr>
// <tr>
//     <td>Last Name :</td>
//     <td><input name="lname" type="text" placeholder="Last Name" value={userData.lname} onChange={userDataChange} /></td>
//     <br></br>
// </tr>
// <tr>
//     <td>Email :</td>
//     <td><input name="email" readOnly type="text" placeholder="email" value={userData.email} onChange={userDataChange} /></td>
//     <br></br>
// </tr>
// <tr>
//     <td>Flat No :</td>
//     <td><input name="flatno" type="text" placeholder="Flat no" value={userData.flatno} onChange={userDataChange}/></td>
//     <br></br>
// </tr>
// <tr>
//     <td>Member :</td>
//     <td><input name="familymember" type="number" placeholder="Member" value={userData.familymember} onChange={userDataChange}/></td>
//     <br></br>
// </tr>
// <tr>
//     <td>Mobile No :</td>
//     <td><input name="mobileno" type="text" placeholder="Mobile no" value={userData.mobileno} onChange={userDataChange}/></td>
//     <br></br>
// </tr>
// <tr>
//     <td>Profession :</td>
//     <td><input name="profession" type="text" placeholder="profession" value={userData.profession} onChange={userDataChange}/></td>
//     <br></br>
// </tr>
// <tr>
//     <td style={{textAlign:"center"}} colSpan={2}>
//     <button className="btn btn-success" onClick={saveUser} > Save User</button>
//     </td>
// </tr>
// </table>