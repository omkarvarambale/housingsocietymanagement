import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Route, Routes, useNavigate } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function UserLogin() {

    var [userData, setUserData] = useState({
        "fname": "", "lname": "", "email": "", "password": "",
        "flatno": "", "familymember": "", "mobileno": "",
        "profession": "", "image": ""
    });

    var login = window.sessionStorage.getItem("login") == "true";
    useEffect(()=>{
        if(login){
            navi("/");
        }
    } , []);
    var navi = useNavigate();

    function gotohome(){ navi("/"); }
    function gotoadv(){ navi("/advertise"); }
    function gotogal(){ navi("/gallery"); }
    function gotocont(){ navi("/contactus"); }
    function gotologin() {navi("/user/login"); }
    function gotomang(){ navi("/management"); }
    function gotosignup(){ navi("/user/add");}


    var [errorMsg, setUsermsg] = useState("");
    const showMessageWithDelay = () => {
        // Using setTimeout to update the message after 2000 milliseconds (2 seconds)
        setTimeout(() => {
          setUsermsg("");
        }, 2000);
    };
    
    var userDataChange = (x) => {
        userData[x.target.name] = x.target.value;
        setUserData({ ...userData });
    }

    var clicklogin = () => {


        if(userData.email == ""){
            toast.error("Email Id can not be empty!!!") ; return;}
        if(userData.password == ""){
            toast.error("Password can not be empty!!!") ; return;}



        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:50052/api/Login");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var data = JSON.parse(xhr.responseText) ;
                //debugger;
                if(data==null)
                {
                    console.log("inside login");
                    window.sessionStorage.setItem("login", false) ;
                    setUsermsg("Log in failed");
                    toast.error("Log in failed");
                    showMessageWithDelay();
                }
                else{
                    window.sessionStorage.setItem("login", true) ;
                    window.sessionStorage.setItem("fname",data.fname);
                    window.sessionStorage.setItem("lname",data.lname);
                    window.sessionStorage.setItem("logid",data.Id);
                    if(data.email=="admin@gmail.com") window.sessionStorage.setItem("role",1);
                    else window.sessionStorage.setItem("role",2);
                    toast.success("Login Successfull");
                    navi("/") ;
                } 
            }
        }
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(userData));
    }//end of add

    return (
        <div>

            <div className="homepage-container">
                <header className="header">
                <nav className="nav-links">
                    <button onClick={gotohome}>Home</button>
                    <button onClick={gotoadv}>Advertise</button>
                    <button onClick={gotogal}>Gallery</button>
                    <button onClick={gotomang}>Management People</button>
                    <button onClick={gotocont}>Contact Us</button>
                    <button style={{color:"red"}} onClick={gotologin}>Login</button>
                    <button onClick={gotosignup}>Signup</button>
                </nav>
                </header>
            </div>

            <br/>

            <center><h3>User Login</h3></center>

            <br></br>
            <center>
            <div style={{width:"50%"}} class="mb-3">
                <input name="email" type="text"class="form-control" placeholder="email" value={userData.email} onChange={userDataChange}/>
            </div>
            <div style={{width:"50%"}} class="mb-3">
                <input name="password" type="password" class="form-control" placeholder="password" value={userData.password} onChange={userDataChange}/>
            </div>
            <div style={{width:"50%", textAlign:"right"}} class="mb-3">
                <Link to={`/forgotpassword`}>forgot password?</Link>
            </div>
            <div style={{width:"50%"}} class="d-grid gap-2">
                <button class="btn btn-success" onClick={clicklogin}>Log In</button>
            </div>
            <br></br>
            <div style={{color:"red"}}>{errorMsg}</div>    
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
    )
}

export default UserLogin;