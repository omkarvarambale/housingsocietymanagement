import { useState } from "react";
import { Link } from "react-router-dom";
import { Route, Routes, useNavigate } from "react-router-dom";


function AddUser() {


    var navi = useNavigate();

    function goToHomePage() {
        navi("/");
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


    var add = () => {

        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:50052/api/Home");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                //var data = JSON.parse(xhr.responseText) ;
                goToHomePage();
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
                        <td>First Name :</td>
                        <td><input name="fname" type="text" placeholder="First Name" value={userData.fname} onChange={userDataChange} /></td>
                        <br></br>
                    </tr>
                    <tr>
                        <td>Last Name :</td>
                        <td><input name="lname" type="text" placeholder="Last Name" value={userData.lname} onChange={userDataChange} /></td>
                        <br></br>
                    </tr>
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
                        <td>Flat No :</td>
                        <td><input name="flatno" type="text" placeholder="Flat no" value={userData.flatno} onChange={userDataChange} /></td>
                        <br></br>
                    </tr>
                    <tr>
                        <td>Member :</td>
                        <td><input name="familymember" type="number" placeholder="Member" value={userData.familymember} onChange={userDataChange} /></td>
                        <br></br>
                    </tr>
                    <tr>
                        <td>Mobile No :</td>
                        <td><input name="mobileno" type="text" placeholder="Mobile no" value={userData.mobileno} onChange={userDataChange} /></td>
                        <br></br>
                    </tr>
                    <tr>
                        <td>Profession :</td>
                        <td><input name="profession" type="text" placeholder="profession" value={userData.profession} onChange={userDataChange} /></td>
                        <br></br>
                    </tr>
                    <tr>
                        <td>Image :</td>
                        <td><input name="image" type="text" placeholder="image path" value={userData.image} onChange={userDataChange} /></td>
                        <br></br>
                    </tr>


                    <tr>
                        <td style={{ textAlign: "center" }} colSpan={2}>
                            <button className="btn btn-success" onClick={add}> Add User</button>

                        </td>
                    </tr>
                </table>
            </center>

        </div>
    )

}

export default AddUser;