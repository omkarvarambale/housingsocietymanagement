import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Route, Routes, useNavigate } from "react-router-dom";


function UserLogin(props) {

    var [userData, setUserData] = useState({
        "fname": "", "lname": "", "email": "", "password": "",
        "flatno": "", "familymember": "", "mobileno": "",
        "profession": "", "image": ""
    });

    var login = window.sessionStorage.getItem("login") == "true";
    var navi = useNavigate();

    function gotohome(){ navi("/"); }
    function gotoadv(){ navi("/advertise"); }
    function gotogal(){ navi("/gallery"); }
    function gotocont(){ navi("/contactus"); }
    function gotologin() {navi("/user/login"); }
    function gotomang(){ navi("/management"); }

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
                    showMessageWithDelay();
                }
                else{
                    window.sessionStorage.setItem("login", true) ;
                    window.sessionStorage.setItem("fname",data.fname);
                    window.sessionStorage.setItem("logid",data.Id);
                    window.sessionStorage.setItem("lname",data.lname);
                    if(data.email=="admin@gmail.com") window.sessionStorage.setItem("role",1);
                    else window.sessionStorage.setItem("role",2);
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
                </nav>
                </header>
            </div>



            <br></br>

            <center>
            <div style={{width:"50%"}} class="mb-3">
                <input name="email" type="text"class="form-control" placeholder="email" value={userData.email} onChange={userDataChange}/>
            </div>
            <div style={{width:"50%"}} class="mb-3">
                <input name="password" type="password" class="form-control" placeholder="password" value={userData.password} onChange={userDataChange}/>
            </div>
            <div style={{width:"50%"}} class="d-grid gap-2">
                <button class="btn btn-success" onClick={clicklogin}>Log In</button>
            </div>
            <br></br>
            <div style={{color:"red"}}>{errorMsg}</div>    
            </center>

        </div>
    )
}

export default UserLogin;










// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { Route, Routes, useNavigate } from "react-router-dom";


// function UserLogin() {

//     var [userData, setUserData] = useState({
//         "fname": "", "lname": "", "email": "", "password": "",
//         "flatno": "", "familymember": "", "mobileno": "",
//         "profession": "", "image": ""
//     });

//     var navi = useNavigate();

//     function goToHomePage() {
//         debugger;
//         navi("/");
//     }


//     // var [userData, setUserData] = useState({
//     //     "email": "", "password": ""
//     // });

//     var userDataChange = (x) => {
//         userData[x.target.name] = x.target.value;
//         setUserData({ ...userData });
//     }


//     var login = () => {

//         var xhr = new XMLHttpRequest();
//         xhr.open("POST", "http://localhost:50052/api/Login");
//         xhr.onreadystatechange = function () {
//             if (xhr.readyState === 4 && xhr.status === 200) {
//                 var data = JSON.parse(xhr.responseText) ;
//                 debugger;
//                 if(data==null)
//                 {
//                     //handleUpdate();
//                     //Reload();
//                     window.location.reload() ;
//                 } 
                    
//                 setUserData({...data}) ;
//                 //const dataJSON = JSON.stringify(userData);
                
//                 sessionStorage.setItem('myLoggedInUser', JSON.stringify(data));
//                 goToHomePage();
                
//             }
//         }
//         xhr.setRequestHeader("Content-Type", "application/json");
//         xhr.send(JSON.stringify(userData));
        

//     }//end of add

//     return (
//         <div>
//             <br></br>
//             <center>

//                 <table>
//                     <tr>
//                         <td>Email :</td>
//                         <td><input name="email" type="text" placeholder="email" value={userData.email} onChange={userDataChange} /></td>
//                         <br></br>
//                     </tr>
//                     <tr>
//                         <td>password :</td>
//                         <td><input name="password" type="text" placeholder="password" value={userData.password} onChange={userDataChange} /></td>
//                         <br></br>
//                     </tr>

//                     <tr>
//                         <td style={{ textAlign: "center" }} colSpan={2}>
//                             <button className="btn btn-success" onClick={login}> LogIn</button>
//                         </td>
//                     </tr>
//                 </table>
//             </center>

//         </div>
//     )

// }

// export default UserLogin;