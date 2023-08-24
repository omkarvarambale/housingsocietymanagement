import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";

const UpdateManagment=()=>{
    var navi = useNavigate();

    function goToManagement() {
        navi("/management");
    }

    const { managementId } = useParams();

    var [managementData, setManagementData] = useState({
        "name": "",  "email": "", "img": "", "phoneNo": "",
        "position": "", "userId": ""
    });

    var managementDataChange = (x) => {
        managementData[x.target.name] = x.target.value;
        setManagementData({ ...managementData });
    }

    useEffect(()=>{

        var xhr = new XMLHttpRequest() ;
        xhr.open("GET" , "http://localhost:50052/api/Management/"+managementId);
        xhr.onreadystatechange = function(){
            if (xhr.readyState === 4 && xhr.status === 200){
                var data = JSON.parse(xhr.responseText) ;
                debugger
                setManagementData({...data}) ;
            }
        }
        xhr.setRequestHeader("Content-Type", "application/json") ;
        xhr.send() ;
    } , []);
    var saveManagement =()=>{

        var xhr = new XMLHttpRequest() ;
        xhr.open("PUT" , "http://localhost:50052/api/Management/"+managementId) ;
        xhr.onreadystatechange = function(){
            if (xhr.readyState === 4 && xhr.status === 200){
                var data = JSON.parse(xhr.responseText) ;
                console.log(data);
                gotomanagement();
            }
        }
        xhr.setRequestHeader("Content-Type", "application/json") ;
        xhr.send(JSON.stringify(managementData)) ;
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
    function gotomanagement(){navi("/management");}
    

    return(
        <div className="homepage-container">
        <header className="header">
          <nav className="nav-links">
            <button  onClick={gotohome}>Home</button>
            <button onClick={gotoadv}>Advertise</button>
            <button onClick={gotogal}>Gallery</button>
            <button onClick={gotocont}>Contact Us</button>
            <button onClick={gotologin}>Login</button>
            <button style={{color:"red"}} onClick={gotomanagement}>Management</button>
          </nav>
        </header>
        
        <div>
            
        <div className="society-info">
        <div className="col-md-8 offset-md-2" style={{textAlign:"justify" , marginTop : 5+"px"}}>
        <div>
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
            <td><input name="phoneNo" type="text" placeholder="phoneno" value={managementData.phoneNo} onChange={managementDataChange} /></td>
            <br></br>
        </tr>
       
        <tr>
            <td>Position :</td>
            <td><input name="position" type="text" placeholder="position" value={managementData.position} onChange={managementDataChange} /></td>
            <br></br>
        </tr>
        <tr>
            <td>Image :</td>
            <td><input name="img" type="file" placeholder="image path" value={managementData.img} onChange={managementDataChange} /></td>
            <br></br>
        </tr>
        <tr>
            <td>userId :</td>
            <td><input name="userId" type="text" placeholder="userID" value={managementData.userId} onChange={managementDataChange} /></td>
            <br></br>
        </tr>
       
        <tr>
            <td style={{ textAlign: "center" }} colSpan={2}>
                <button className="btn btn-success" onClick={saveManagement}> saveManagement</button>

            </td>
        </tr>
    </table>
    </center>

</div>
</div>
</div>

        </div>
        <footer className="footer">
        {/* Footer content goes here */}
        
      </footer>
    </div>
    )
}
export default UpdateManagment;