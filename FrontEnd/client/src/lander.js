import "../node_modules/jquery/dist/jquery.min.js"
import "../node_modules/bootstrap/dist/js/bootstrap.min.js"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import "./css/homepage.css";
import './App.css';
import { useState,useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import AddUser from "./user/addUser.js";
import UpdateUser from "./user/updateUser.js";
import UserLogin from "./user/userLogin.js";
import SignUp from "./signup.js";
import HomePage1 from "./Home1.js";
import Advertise from "./advertise/Advertise.js";
import Gallery from "./home/Gallery.js";
import ContactUs from "./home/ContactUs.js";
import MangPeop from "./managementpeop/managementpeople.js";
import AddManagement from "./managementpeop/addManagement.js";
import UpdateManagment from "./managementpeop/updateManagement.js";
import Home from "./home/Home.js"
import AddAdvertise from "./advertise/addAdvertise.js";
import AOS from "aos";
import Footer from "./Footer/Footer.jsx";
import Event from "./user/event.js";
import AddEvent from "./user/addEvent.js";
import Complain from "./user/complain.js";
import AddComplain from "./user/addComplain.js";
import ForgotPassword from "./home/forgotpassword.js";
import VerifyPassword from "./home/verifypassword.js"


function Lander() {

    var [buttonState, setButtonState] = useState({ home: "", logIn: "", SignUp: "" });
    var navi = useNavigate();
    var login = window.sessionStorage.getItem("login") == "true";//we get user is logged in or not


    function goToHomePage() {
        navi("/");
    }

    function goToSignUp() {
        navi("/user/signup");
    }
    function goToLogIn() {
        navi("/user/login");
    }

    function logoclicked(){
        window.location.reload();
    }

    useEffect(() => {
        AOS.init({
          duration: 800,
        });
      }, []);























    return (


        <div className="background" style={{ overflow: "hidden" }}>
            <div style={{ textAlign: "right", padding: 5 + "px" }}>
                Mobile Number : 8805686099
            </div>
            <div className="col-md-12 Header">
                <div className="row">
                    <div>
                        <img src="/photos/logo.jpg" onClick={goToHomePage} alt="Logo" className="logo" />
                        <strong className="display-4 fs-md-5 fs-lg-4">Housing Society Management System</strong>
                    </div>
                </div>  
            </div>

            
            <Routes>
                <Route path="/" element={<HomePage1></HomePage1>}></Route>
                <Route path="/user/members" element={<Home></Home>}></Route>
                <Route path="/management" element={<MangPeop></MangPeop>}></Route>
                <Route path="/management/add" element={<AddManagement></AddManagement>}></Route>
                <Route path="/managment/updateManagment/:managementId" element={<UpdateManagment></UpdateManagment>}></Route>
                <Route path="/user/signup" element={<SignUp></SignUp>}></Route>
                <Route path="/advertise" element={<Advertise></Advertise>}></Route>
                <Route path="/advertise/add" element={<AddAdvertise></AddAdvertise>}></Route>
                <Route path="/gallery" element={<Gallery></Gallery>}></Route>
                <Route path="/contactus" element={<ContactUs></ContactUs>}></Route>
                <Route path="/user/login" element={<UserLogin></UserLogin>}></Route>
                <Route path="/user/add" element={<AddUser></AddUser>}></Route>
                <Route path="/user/update/:userId" element={<UpdateUser></UpdateUser>} ></Route>
                <Route path="/event" element={<Event></Event>} ></Route>
                <Route path="/event/add" element={<AddEvent></AddEvent>} ></Route>
                <Route path="/complain" element={<Complain></Complain>} ></Route>
                <Route path="/complain/add" element={<AddComplain></AddComplain>} ></Route>
                <Route path="/forgotpassword" element={<ForgotPassword></ForgotPassword>} ></Route>
                <Route path="/verifypassword" element={<VerifyPassword></VerifyPassword>} ></Route>
            </Routes>
            <Footer />
           

        </div>

    )

}


export default Lander;



