import "../node_modules/jquery/dist/jquery.min.js"
import "../node_modules/bootstrap/dist/js/bootstrap.min.js"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import "./css/homepage.css";
import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
//import HomePage from "./homepage.jsx";
//import Login from "./login.jsx";
//import SignUp from "./signup.jsx";
//import FavQT from "./favourite.jsx";
//import MyQT from "./myquotes.jsx";
//import Update from "./updateProfile.jsx";
//import AddQuote from "./addquote.jsx";
import Home from "./Home.js";
import AddUser from "./addUser.js";
import UpdateUser from "./updateUser.js";
//import updateUser from "../updateUser.js";
//import UpdateQuote from "./update.jsx";
















function Lander() {
    var [buttonState, setButtonState] = useState({home:"", logIn:"",SignUp:""});
    var navi = useNavigate();
    //var login = window.localStorage.getItem("login") == "true";//we get user is logged in or not




    function goToHomePage() {
        navi("/");
    }
 
    function goToSignUp() {
        navi("/");
    }
    function goToLogIn() {
        navi("/");
    }























    return (



        <div style={{overflow:"hidden"}}>
            <div style={{ textAlign: "right", padding: 5 + "px" }}>
                Mobile Number : 8805686099
            </div>
            <div className="col-md-12 Header">
                <div className="row">
                    <div className="col-md-4 offset-md-4 TitleDivHeading">
                        <strong className="Title">Housing Society Management</strong>
                    </div>
                </div>


                <div>
                {/* {login ? (
                    <div className="btn-group col-md-2 TitleDiv" role="group" style={{ textAlign: "center" }}>
                    <button type="button" className="btn HeaderButton"      onClick={goToHomePage}>Home</button>
                    </div>
                    ) : (
                    <div className="btn-group col-md-4 TitleDiv" role="group" style={{ textAlign: "center" }}>
                    <button type="button" className="btn HeaderButton" disabled={buttonState.logIn}     onClick={goToLogIn}>Login</button>
                    <button type="button" className="btn HeaderButton" disabled={buttonState.signUp}    onClick={goToSignUp}>Sign up</button>
                    </div>
                )} */}
                </div>

                


                
            </div>
            <Routes>
                <Route path="/" element={<Home></Home>}></Route>
                {/* <Route path="/user/login" element={<Login setButtonState={setButtonState}></Login>}></Route>
                <Route path="/user/signup" element={<SignUp setButtonState={setButtonState}></SignUp>}></Route>
                <Route path="/quote/favouritequote" element={<FavQT></FavQT>}></Route>
                <Route path="/quote/myquote" element={<MyQT></MyQT>}></Route>*/}
                <Route path="/user/add" element={<AddUser></AddUser>}></Route>
                <Route path="/user/update/:userId" element={<UpdateUser></UpdateUser>} ></Route>
                {/* <Route path="/quote/update" element={<UpdateQuote></UpdateQuote>}></Route> */}
                
            </Routes>
            <div className="Footer">
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