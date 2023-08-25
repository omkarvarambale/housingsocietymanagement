import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Route, Routes, useNavigate } from "react-router-dom";
import Axios from "axios";



function AddUser() {

    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

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

    const handleButtonClick = () => {
        // Disable the button immediately
        // Enable the button after 5 seconds
        setTimeout(() => {
          setIsButtonDisabled(false);
        }, 5000);
      };

    var navi = useNavigate();

    function goToUserMember() {
        navi("/user/members");
    }

    var [userData, setUserData] = useState({
        "fname": "", "lname": "", "email": "", "password": "",
        "flatno": "", "familymember": "", "mobileno": "",
        "profession": "", "image": ""
    });

    var userDataChange = (x) => {
        userData[x.target.name] = x.target.value;
        setUserData({ ...userData });
    }

    const updateImage = (newImagePath) => {
        const updatedUserData = { ...userData, image: newImagePath };
        setUserData(updatedUserData);
    };

    var add = () => {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:50052/api/Home");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                goToUserMember();
            }
        }
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(userData));
    }//end of add

    var [uploadFile, setUploadFile] = useState("");
    debugger;
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
        <div>
            <br></br>
            <center>

                <table>
                    <tbody>
                    <tr>
                        <td>First Name :</td>
                        <td><input name="fname" type="text" placeholder="First Name" value={userData.fname} onChange={userDataChange} /></td>
                       
                    </tr>
                    <tr>
                        <td>Last Name :</td>
                        <td><input name="lname" type="text" placeholder="Last Name" value={userData.lname} onChange={userDataChange} /></td>
                        
                    </tr>
                    <tr>
                        <td>Email :</td>
                        <td><input name="email" type="text" placeholder="email" value={userData.email} onChange={userDataChange} /></td>
                        
                    </tr>
                    <tr>
                        <td>password :</td>
                        <td><input name="password" type="text" placeholder="password" value={userData.password} onChange={userDataChange} /></td>
                      
                    </tr>
                    <tr>
                        <td>Flat No :</td>
                        <td><input name="flatno" type="text" placeholder="Flat no" value={userData.flatno} onChange={userDataChange} /></td>
                        
                    </tr>
                    <tr>
                        <td>Member :</td>
                        <td><input name="familymember" type="number" placeholder="Member" value={userData.familymember} onChange={userDataChange} /></td>
                        
                    </tr>
                    <tr>
                        <td>Mobile No :</td>
                        <td><input name="mobileno" type="text" placeholder="Mobile no" value={userData.mobileno} onChange={userDataChange} /></td>
                    </tr>
                    <tr>
                        <td>Profession :</td>
                        <td><input name="profession" type="text" placeholder="profession" value={userData.profession} onChange={userDataChange} /></td>
                    </tr>
                    <tr>
                        <td>Image :</td>
                        <td><input name="image" type="file" placeholder="image path" onChange={(e)=>setUploadFile(e.target.files[0])} />
                        <button className="btn btn-primary" onClick={handleUpload}>save img</button>
                        </td>
                    </tr>

                    <tr>
                        <td style={{ textAlign: "center" }} colSpan={2}>
                            <button className="btn btn-success" disabled={isButtonDisabled} onClick={add}> Add User</button>

                        </td>
                    </tr>
                </tbody>
                </table>
            </center>
        </div>
    )

}

export default AddUser;



// import React, { useState } from 'react';

// function App() {
//   const [selectedFileName, setSelectedFileName] = useState('');

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
    
//     if (file) {
//       const fullPath = file.name; // This might be something like "C:\fakepath\u1.avif"
//       const fileName = fullPath.split('\\').pop(); // Get the last part after splitting by backslash
//       setSelectedFileName(fileName);
//     }
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleFileChange} />
//       {selectedFileName && <p>Selected file name: {selectedFileName}</p>}
//     </div>
//   );
// }

// export default App;
