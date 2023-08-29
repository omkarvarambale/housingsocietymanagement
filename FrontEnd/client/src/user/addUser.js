import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Route, Routes, useNavigate } from "react-router-dom";
import Axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


function AddUser() {

    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    var login = window.sessionStorage.getItem("login") == "true";
    var logid = window.sessionStorage.getItem("logid");
    var fname = window.sessionStorage.getItem("fname");
    var lname = window.sessionStorage.getItem("lname");
    var admin = window.sessionStorage.getItem("role") == 1;

    useEffect(()=>{
        if(login){
            navi("/");
        }
    } , []);

    var navi = useNavigate();

    function gotologin() {navi("/user/login");}
    function gotohome(){ navi("/"); }
    function gotoadv(){ navi("/advertise"); }
    function gotogal(){ navi("/gallery"); }
    function gotocont(){ navi("/contactus"); }
    function gotomang(){ navi("/management"); }
    function gotosignup(){ navi("/user/add");}

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


        if(userData.fname == ""){
            toast.error("First Name can not be empty!!!") ; return;}
        if(userData.lname == ""){
            toast.error("Last Name can not be empty!!!") ; return;}
        if(userData.email == ""){
            toast.error("Email can not be empty!!!") ; return;}
        if(userData.password == ""){
            toast.error("Password can not be empty!!!") ; return;}
        if(userData.mobileno == ""){
            toast.error("Mobile no can not be empty!!!") ; return;}
        if(userData.familymember == ""){
            toast.error("Family Member can not be empty!!!") ; return;}
        if(userData.image == ""){
            toast.error("Image can not be empty!!!") ; return;}
        




        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:50052/api/Home");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                gotologin();
            }
        }
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(userData));
    }//end of add

    var [uploadFile, setUploadFile] = useState("");
    const handleUpload = (e) => {

        if(uploadFile == ""){toast.error("Image can not be empty!!!") ; return;}
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
        setIsButtonDisabled(false)
        })
        .catch((error) => {
        console.log(error);
        });
    };

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
                    <button onClick={gotologin}>Login</button>
                    <button style={{color:"red"}} onClick={gotosignup}>Signup</button>
                </nav>
                </header>
            </div>
            <br></br>
            <center>
                <h3>Register Here</h3>

                <table className="table" style={{width:"75%"}}>
    <tbody>
        <tr>
            <td>First Name:</td>
            <td>
                <input
                    name="fname"
                    type="text"
                    placeholder="First Name"
                    value={userData.fname}
                    onChange={userDataChange}
                    className="form-control"
                />
            </td>
        </tr>
        <tr>
            <td>Last Name:</td>
            <td>
                <input
                    name="lname"
                    type="text"
                    placeholder="Last Name"
                    value={userData.lname}
                    onChange={userDataChange}
                    className="form-control"
                />
            </td>
        </tr>
        <tr>
            <td>Email:</td>
            <td>
                <input
                    name="email"
                    type="text"
                    placeholder="Email"
                    value={userData.email}
                    onChange={userDataChange}
                    className="form-control"
                />
            </td>
        </tr>
        <tr>
            <td>Password:</td>
            <td>
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={userData.password}
                    onChange={userDataChange}
                    className="form-control"
                />
            </td>
        </tr>
        <tr>
            <td>Flat No:</td>
            <td>
                <input
                    name="flatno"
                    type="text"
                    placeholder="Flat No"
                    value={userData.flatno}
                    onChange={userDataChange}
                    className="form-control"
                />
            </td>
        </tr>
        <tr>
            <td>Member:</td>
            <td>
                <input
                    name="familymember"
                    type="number"
                    placeholder="Member"
                    value={userData.familymember}
                    onChange={userDataChange}
                    className="form-control"
                />
            </td>
        </tr>
        <tr>
            <td>Mobile No:</td>
            <td>
                <input
                    name="mobileno"
                    type="text"
                    placeholder="Mobile No"
                    value={userData.mobileno}
                    onChange={userDataChange}
                    className="form-control"
                />
            </td>
        </tr>
        <tr>
            <td>Profession:</td>
            <td>
                <input
                    name="profession"
                    type="text"
                    placeholder="Profession"
                    value={userData.profession}
                    onChange={userDataChange}
                    className="form-control"
                />
            </td>
        </tr>
        <tr>
            <td>Image:</td>
            <td>
                <input
                    name="image"
                    type="file"
                    placeholder="Image Path"
                    onChange={(e) => setUploadFile(e.target.files[0])}
                    className="form-control-file"
                />
                <button className="btn btn-primary mt-2" onClick={handleUpload}>Save Image</button>
            </td>
        </tr>
        <tr>
            <td style={{ textAlign: "center" }} colSpan={2}>
                <button className="btn btn-success" disabled={isButtonDisabled} onClick={add}>Add User</button>
            </td>
        </tr>
    </tbody>
</table>

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

export default AddUser;