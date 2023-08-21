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

    function goToHomePage() {
        debugger;
        navi("/");
    }

    var temp = {
        home:"", 
        logIn:"red",
        signUp:"",
    }
    useEffect(()=>{props.setButtonState(temp)
        //debugger;
        // if(login)
        // navi("/") ;        
    } , []);


    // var [userData, setUserData] = useState({
    //     "email": "", "password": ""
    // });

    var userDataChange = (x) => {
        userData[x.target.name] = x.target.value;
        setUserData({ ...userData });
    }


    var login = () => {

        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:50052/api/Login");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var data = JSON.parse(xhr.responseText) ;
                //debugger;
                if(data==null)
                {
                    window.sessionStorage.setItem("login", false) ;
                    //handleUpdate();
                    //Reload();
                    //window.location.reload() ;
                }
                else{
                    window.sessionStorage.setItem("login", true) ;
                    //debugger;
                    window.sessionStorage.setItem("fname",data.fname);
                    window.sessionStorage.setItem("logid",data.Id);
                    window.sessionStorage.setItem("lname",data.lname);
                    navi("/") ;
                } 
                    
                //const dataJSON = JSON.stringify(userData);
                
                
            }
        }
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(userData));
        

    }//end of add

    return (
        <div>
            <br></br>
            <center>

                <table>
                    <tr>
                        <td>Email :</td>
                        <td><input name="email" type="text" placeholder="email" value={userData.email} onChange={userDataChange} /></td>
                        <br></br>
                    </tr>
                    <tr>
                        <td>password :</td>
                        <td><input name="password" type="text" placeholder="password" value={userData.password} onChange={userDataChange} /></td>
                        <br></br>
                    </tr>

                    <tr>
                        <td style={{ textAlign: "center" }} colSpan={2}>
                            <button className="btn btn-success" onClick={login}> LogIn</button>
                        </td>
                    </tr>
                </table>
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