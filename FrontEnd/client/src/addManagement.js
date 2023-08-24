import React from 'react';
import './Homepage.css'; // You can create a separate CSS file for styling
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "axios";

function AddManagement(){
    
    var navi = useNavigate();

    var login = window.sessionStorage.getItem("login") == "true";
    var logid = window.sessionStorage.getItem("logid");
    var fname = window.sessionStorage.getItem("fname");
    var lname = window.sessionStorage.getItem("lname");
    var admin = window.sessionStorage.getItem("role") == 1;

    useEffect(()=>{
        if(!login || !admin){
            navi("/");
        }
    } , []);

    function goToManagement() {
        navi("/management");
    }

    var [managementData, setManagementData] = useState({
        "name": "",  "email": "", "img": "", "phoneno": "",
        "position": "", "userId": logid
    });

    var managementDataChange = (x) => {
        managementData[x.target.name] = x.target.value;
        setManagementData({ ...managementData });
    }

    const handleFileChange = (event) => {
        // debugger;
         managementData[event.target.name] = event.target.files[0].name;
         setManagementData({ ...managementData }); 
       };

    var add=()=>{
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:50052/api/Management");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                //var data = JSON.parse(xhr.responseText) ;
                goToManagement();
            }
        }
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(managementData));
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


    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const updateImage = (newImagePath) => {
        const updatedUserData = { ...managementData, img: newImagePath };
        setManagementData(updatedUserData);
    };

    var [uploadFile, setUploadFile] = useState("");
    const handleUpload = (e) => {
        setTimeout(() => {setIsButtonDisabled(false);}, 5000);
        e.preventDefault();
        const formData = new FormData ();
        formData.append("file", uploadFile);
        formData.append("upload_preset", "HousingSocietyManagement");

        Axios.post("https://api.cloudinary.com/v1_1/dvsmrv64h/image/upload",formData
        )
        .then((response) => {
        console.log(response);
        console.log(response.data.secure_url);
        updateImage(response.data.secure_url);
        })
        .catch((error) => {
        console.log(error);
        });
    };


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
        
        <div className="society-info">
        <div className="col-md-8 offset-md-2" style={{textAlign:"justify" , marginTop : 5+"px"}}>
        <div>
            <center><h3>Add Management Member</h3></center>
            <br></br>
            <center>
        <table>
        <tr>
            <td> Name :</td>
            <td><input name="name" type="text" placeholder="name" value={managementData.name} onChange={managementDataChange} /></td>
            <br></br>
        </tr>
        <tr>
            <td>Email :</td>
            <td><input name="email" type="text" placeholder="email" value={managementData.email} onChange={managementDataChange} /></td>
            <br></br>
        </tr>
        <tr>
            <td>phoneNo :</td>
            <td><input name="phoneno" type="text" placeholder="phoneno" value={managementData.Phoneno} onChange={managementDataChange} /></td>
            <br></br>
        </tr>
       
        <tr>
            <td>Position :</td>
            <td><input name="position" type="text" placeholder="position" value={managementData.position} onChange={managementDataChange} /></td>
            <br></br>
        </tr>
        <tr>
            <td>Image :</td>
            <td><input name="img" type="file" placeholder="image path" onChange={(e)=>setUploadFile(e.target.files[0])} /></td>
            <button className="btn btn-primary" onClick={handleUpload}>save img</button>
            <br></br>
        </tr>
        {/* <tr>
            <td>userId :</td>
            <td><input name="userId" type="text" placeholder="userID" value={managementData.userId} onChange={managementDataChange} /></td>
            <br></br>
        </tr> */}
       
        <tr>
            <td style={{ textAlign: "center" }} colSpan={2}>
                <button className="btn btn-success" disabled={isButtonDisabled} onClick={add}> Add Management</button>

            </td>
        </tr>
    </table>
    </center>

</div>
</div>
</div>
<footer className="footer">
        {/* Footer content goes here */}
      </footer>
    </div>
)

}
export default AddManagement;