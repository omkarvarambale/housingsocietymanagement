import "../node_modules/jquery/dist/jquery.min.js"
import "../node_modules/bootstrap/dist/js/bootstrap.min.js"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import "./css/homepage.css";
import './App.css';
import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./Home.js";
import AddUser from "./addUser.js";
import UpdateUser from "./updateUser.js";
import UserLogin from "./userLogin.js";
import SignUp from "./signup.js";
import HomePage1 from "./Home1.js";
import Advertise from "./Advertise.js";
import Gallery from "./Gallery.js";
import ContactUs from "./ContactUs.js";
import MangPeop from "./managementpeople.js";
import UserLogout from "./userLogout.js";
















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























    return (


        <div className="background" style={{ overflow: "hidden" }}>
            <div style={{ textAlign: "right", padding: 5 + "px" }}>
                Mobile Number : 8805686099
            </div>
            <div className="col-md-12 Header">
                <div className="row">
                    <div>
                        <img src="/photos/logo.jpg" onClick={goToHomePage} alt="Logo" className="logo" />
                        <strong style={{fontSize:"50px"}}>Housing Society Management System</strong>
                    </div>
                </div>  


                {/* <div>
                    {login ? (
                        <div className="btn-group col-md-2 TitleDiv" role="group" style={{ textAlign: "center" }}>
                            <button type="button" className="btn HeaderButton" onClick={goToHomePage}>Home</button>
                        </div>
                    ) : (
                        <div className="btn-group col-md-4 TitleDiv" role="group" style={{ textAlign: "center" }}>
                            <button type="button" className="btn HeaderButton" style={{color:buttonState.logIn}} onClick={goToLogIn}>Login</button>
                            <button type="button" className="btn HeaderButton" style={{color:buttonState.SignUp}} onClick={goToSignUp}>Sign up</button>

                        </div>
                    )}
                </div> */}





            </div>
            <Routes>
                <Route path="/" element={<HomePage1 setButtonState={setButtonState}></HomePage1>}></Route>
                {/* <Route path="/user/login" element={<Login setButtonState={setButtonState}></Login>}></Route>
                <Route path="/user/signup" element={<SignUp setButtonState={setButtonState}></SignUp>}></Route>
                <Route path="/quote/favouritequote" element={<FavQT></FavQT>}></Route>
                <Route path="/quote/myquote" element={<MyQT></MyQT>}></Route>*/}
                <Route path="/user/members" element={<Home></Home>}></Route>
                <Route path="/management" element={<MangPeop></MangPeop>}></Route>
                <Route path="/user/signup" element={<SignUp></SignUp>}></Route>
                <Route path="/advertise" element={<Advertise></Advertise>}></Route>
                <Route path="/gallery" element={<Gallery></Gallery>}></Route>
                <Route path="/contactus" element={<ContactUs></ContactUs>}></Route>
                <Route path="/user/login" element={<UserLogin></UserLogin>}></Route>
                <Route path="/user/logout" element={<UserLogout></UserLogout>}></Route>
                <Route path="/user/add" element={<AddUser></AddUser>}></Route>
                <Route path="/user/update/:userId" element={<UpdateUser></UpdateUser>} ></Route>
                {/* <Route path="/bg" element={} ></Route> */}
                {/* <Route path="/quote/update" element={<UpdateQuote></UpdateQuote>}></Route> */}

            </Routes>
            <div className="Footer" style={{height:"300px",color:"blue"}}>
                <p>This site is created by Omkar Adagale<br /> </p>
            </div>

        </div>






        // <div>
        //     <div style={{ textAlign: "right", padding: 5 + "px" }}>
        //         Mobile Number : 7385642995
        //     </div>
        //     <div className="col-md-12 Header">
        //         <div className="row">
        //             <div className="col-md-4 offset-md-4 TitleDivHeading">
        //                 <strong className="Title">Quotes App</strong>
        //             </div>
        //         </div>
        //         <div className="btn-group col-md-5 TitleDiv" role="group" style={{ textAlign: "center" }}>
        //             <button type="button" className="btn HeaderButton" disabled={buttonState.home}      onClick={goToHomePage}>Home</button>
        //             <button type="button" className="btn HeaderButton" disabled={buttonState.logIn}     onClick={goToLogIn}>Login</button>
        //             <button type="button" className="btn HeaderButton" disabled={buttonState.signUp}    onClick={goToSignUp}>Sign up</button>

        //         </div>
        //     </div>
        //     <Routes>
        //         <Route path="/" element={<HomePage setButtonState={setButtonState}></HomePage>}></Route>
        //         <Route path="/user/login" element={<Login setButtonState={setButtonState}></Login>}></Route>
        //         <Route path="/user/signup" element={<SignUp setButtonState={setButtonState}></SignUp>}></Route>
        //         <Route path="/quote/favouritequote" element={<FavQT></FavQT>}></Route>
        //         <Route path="/quote/myquote" element={<MyQT></MyQT>}></Route>
        //         <Route path="/user/update" element={<Update></Update>}></Route>
        //         <Route path="/quote/add" element={<AddQuote></AddQuote>}></Route>
        //         <Route path="/quote/update" element={<UpdateQuote></UpdateQuote>}></Route>

        //     </Routes>
        //     <div className="Footer">
        //         <p>This site is created by Gaurav Bang  and Omkar Adagale<br /> </p>
        //     </div>

        // </div>
    )

}


export default Lander;