import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import AddUser from './addUser';


function Home() {

    var [user , setUser ] = useState([]) ;
    
    useEffect(()=>{
      
        var xhr = new XMLHttpRequest() ;
        xhr.open("GET" , "http://localhost:50052/api/Home") ;
        xhr.onreadystatechange = function(){
            if (xhr.readyState === 4 && xhr.status === 200){
                var data = JSON.parse(xhr.responseText) ;
                setUser([...data]) ;
            }
        }
        xhr.setRequestHeader("Content-Type", "application/json") ;
        xhr.send() ;
    } , []);

    var deleteUser = (x)=>{
        console.log(x);
        var xhr = new XMLHttpRequest() ;
        xhr.open("DELETE" , "http://localhost:50052/api/Home/"+x) ;
                xhr.onreadystatechange = function(){
                    if (xhr.readyState === 4 && xhr.status === 200){
                        var data = JSON.parse(xhr.responseText) ;
                        console.log(data);
                        window.location.reload() ;     
                    }
                }
                xhr.setRequestHeader("Content-Type", "application/json") ;
                xhr.send() ;
    }

    var updateUser = (x) =>{
      console.log(x);

    }

  return (
    <div className="col-md-8 offset-md-2" style={{textAlign:"justify" , marginTop : 5+"px"}}>

    <div>
      <h2>User List</h2>
      <h3><button><Link to="/user/add">Add User </Link></button></h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Flat No</th>
            <th>Family Member</th>
            <th>mobile no</th>
            <th>Profession</th>
            <th>Image</th>
            <th>Delete</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {user.map(u => (
            <tr key={u.Id}>
              <td>{u.fname}</td>
              <td>{u.lname}</td>
              <td>{u.email}</td>
              <td>{u.flatno}</td>
              <td>{u.familymember}</td>
              <td>{u.mobileno}</td>
              <td>{u.profession}</td>
              <td>{u.image}</td>
              <td><button onClick={()=>{deleteUser(u.Id)}} >Delete</button></td>
              <td><Link to={`/user/update/${u.Id}`}>Update</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}

export default Home;



/*

import "jquery/dist/jquery.min.js"
import "bootstrap/dist/js/bootstrap.min.js"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./css/homepage.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Logout from "./logout.jsx"







function MyQT() {
   var [myQuote , setMyQuote ] = useState([]) ;
    var nav = useNavigate() ;
    var login = window.localStorage.getItem("login") == "true";


   


    useEffect(()=>{
        if(!login){
            nav("/user/login");
        }
        else{

            var xhr = new XMLHttpRequest() ;
            xhr.open("GET" , "http://127.0.0.1:5000/quote/myquote/"+window.localStorage.getItem("userID")) ;
            xhr.onreadystatechange = function(){
                if (xhr.readyState == 4 && xhr.status == 200){
                    var data = JSON.parse(xhr.responseText) ;
                    if(data.successFlag)
                    {
                        myQuote = data.payload;
                        setMyQuote([...myQuote]) ;
                    }
                    else{
                        toast.error(data.errorMsg);
                    } 
                }
            }
            xhr.setRequestHeader("Content-Type", "application/json") ;
            xhr.send() ;








        }









    
    
    
    
    } , []);
    


    var updateQuote = (x)=>{
        var qid  = x.target.id ;
        window.localStorage.setItem("qid", qid)
        nav("/quote/update") ;
    }


 var deleteQuote = (x)=>{
    var qid  = x.target.id ;
    var uid = window.localStorage.getItem("userID") ;
    var packet = {
        "id" : uid ,
        "quoteID" :qid 
    }
    var xhr = new XMLHttpRequest() ;
    xhr.open("DELETE" , "http://127.0.0.1:5000/quote/") ;
            xhr.onreadystatechange = function(){
                if (xhr.readyState == 4 && xhr.status == 200){
                    var data = JSON.parse(xhr.responseText) ;
                    if(data.successFlag == true)
                    {
                     window.location.reload() ;
                    }
                    else{
                        toast.error(data.errorMsg);
                    } 
                }
            }
            xhr.setRequestHeader("Content-Type", "application/json") ;
            xhr.send(JSON.stringify(packet)) ;

 }











    return (
        <div className="col-md-8 offset-md-2" style={{textAlign:"justify" , marginTop : 5+"px"}}>
            <div > 

            <Link to="/">All Quotes &nbsp;</Link>
            <Link to="/quote/favouritequote"> |&nbsp; Favourite Quotes &nbsp;|&nbsp;</Link>
            <Link to="/quote/myquote"><span style={{color:"black"}}>&nbsp; My Quotes &nbsp;</span></Link>
            <Link to="/quote/add">|&nbsp; Add Quote </Link>
            <span > <Logout/></span>
            </div> 
           <div >
                {myQuote.map((x)=>{ 
                 return (
                    <div className="QuoteDiv">
                  <b>"{x.text}"</b>
                  <br/>
                  <b>Author : -</b> <i>{x.author}</i>&nbsp;&nbsp;&nbsp;&nbsp; 
                  
                  <button className="btn btn-danger" onClick={deleteQuote} id={x.id} > Delete </button>&nbsp;&nbsp; 
                  <button className="btn btn-warning" onClick={updateQuote} id={x.id} > Update </button>
                               
                        </div>
                 )
                })}
           </div>
        </div>
    )

}

export default MyQT;



import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
        <Switch>
        <Route path="/home" component={HomeComponent} />
        <Route path="/about" component={AboutComponent} />
        {/* Other routes }
        </Switch>
    </BrowserRouter>
      );
    };
    
    export default App;
    





*/