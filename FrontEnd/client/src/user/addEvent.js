import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Route, Routes, useNavigate } from "react-router-dom";
import Axios from "axios";



function AddEvent() {

    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    var login = window.sessionStorage.getItem("login") == "true";
    var logid = window.sessionStorage.getItem("logid");
    var fname = window.sessionStorage.getItem("fname");
    var lname = window.sessionStorage.getItem("lname");
    var admin = window.sessionStorage.getItem("role") == 1;

    useEffect(()=>{
        if(!admin){
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
    function gotoevent(){ navi("/event"); }

    var [eventData, setEventData] = useState({
        "eventname": "", "description": "", "place": "", "eventimage":"",
        "eventdate": "", "eventtime": "", "userId": logid
    });

    var eventDataChange = (x) => {
        eventData[x.target.name] = x.target.value;
        setEventData({ ...eventData });
    }

    const updateImage = (newImagePath) => {
        const updatedEventData = { ...eventData, eventimage: newImagePath };
        setEventData(updatedEventData);
    };

    var add = () => {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:50052/api/Event");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                gotoevent();
            }
        }
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(eventData));
    }//end of add

    var [uploadFile, setUploadFile] = useState("");
    const handleUpload = (e) => {
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
                <h3>Add Event Here</h3>

                <table className="table" style={{width:"75%"}}>
    <tbody>
        <tr>
            <td>Event Name:</td>
            <td>
                <input
                    name="eventname"
                    type="text"
                    placeholder="Event Name"
                    value={eventData.eventname}
                    onChange={eventDataChange}
                    className="form-control"
                />
            </td>
        </tr>
        <tr>
            <td>Event Description:</td>
            <td>
                <input
                    name="description"
                    type="text"
                    placeholder="Description"
                    value={eventData.description}
                    onChange={eventDataChange}
                    className="form-control"
                />
            </td>
        </tr>
        <tr>
            <td>Place:</td>
            <td>
                <input
                    name="place"
                    type="text"
                    placeholder="Event Place"
                    value={eventData.place}
                    onChange={eventDataChange}
                    className="form-control"
                />
            </td>
        </tr>
        <tr>
            <td>Event Date:</td>
            <td>
                <input
                    name="eventdate"
                    type="date"
                    placeholder="Event Date"
                    value={eventData.eventdate}
                    onChange={eventDataChange}
                    className="form-control"
                />
            </td>
        </tr>
        <tr>
            <td>Event Time:</td>
            <td>
                <input
                    name="eventtime"
                    type="time"
                    placeholder="Event Time"
                    value={eventData.eventtime}
                    onChange={eventDataChange}
                    className="form-control"
                />
            </td>
        </tr>
        <tr>
            <td>Event Image:</td>
            <td>
                <input
                    name="eventimage"
                    type="file"
                    placeholder="Event Image"
                    onChange={(e) => setUploadFile(e.target.files[0])}
                    className="form-control-file"
                />
                <button className="btn btn-primary mt-2" onClick={handleUpload}>Save Image</button>
            </td>
        </tr>
        <tr>
            <td style={{ textAlign: "center" }} colSpan={2}>
                <button className="btn btn-success" disabled={isButtonDisabled} onClick={add}>Add Event</button>
            </td>
        </tr>
    </tbody>
</table>


                
            </center>
        </div>
    )

}

export default AddEvent;