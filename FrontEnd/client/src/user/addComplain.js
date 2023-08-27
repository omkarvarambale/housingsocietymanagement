import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Route, Routes, useNavigate } from "react-router-dom";
import Axios from "axios";



function AddComplain() {

    var login = window.sessionStorage.getItem("login") == "true";
    var logid = window.sessionStorage.getItem("logid");
    var fname = window.sessionStorage.getItem("fname");
    var lname = window.sessionStorage.getItem("lname");
    var admin = window.sessionStorage.getItem("role") == 1;

    useEffect(()=>{
        if(!login){
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
    function gotocomplain(){ navi("/complain"); }

    var [complainData, setComplainData] = useState({
        "subject":"", "detail":"" , "userId": logid
    });

    var complainDataChange = (x) => {
        complainData[x.target.name] = x.target.value;
        setComplainData({ ...complainData });
    }

    var add = () => {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:50052/api/Complain");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                gotocomplain();
            }
        }
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(complainData));
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
                    <button onClick={gotologin}>Login</button>
                    <button onClick={gotosignup}>Signup</button>
                </nav>
                </header>
            </div>
            <br></br>
            <center>
                <h3>Add Complain Here</h3>

                <table className="table" style={{width:"75%"}}>
    <tbody>
        <tr>
            <td>Complain Name:</td>
            <td>
                <input
                    name="subject"
                    type="text"
                    placeholder="Subject"
                    value={complainData.subject}
                    onChange={complainDataChange}
                    className="form-control"
                />
            </td>
        </tr>
        <tr>
            <td>Details:</td>
            <td>
                <input
                    name="detail"
                    type="text"
                    placeholder="details"
                    value={complainData.detail}
                    onChange={complainDataChange}
                    className="form-control"
                />
            </td>
        </tr>
        <tr>
            <td style={{ textAlign: "center" }} colSpan={2}>
                <button className="btn btn-success" onClick={add}>Add Complain</button>
            </td>
        </tr>
    </tbody>
</table>


                
            </center>
        </div>
    )

}

export default AddComplain;