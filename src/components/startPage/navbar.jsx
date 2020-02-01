import React from 'react';
import axios from "axios";

 function login(){
  axios.get("https://nutrition-app-api.herokuapp.com/hello").then(res => {
        window.open("/login");
        alert(res.data);
        
      }
  );
}

function singUp(){

}

function Navbar(){
    return(
      <nav class="navbar navbar-expand navbar-dark bg-dark">
        <div class="collapse navbar-collapse" id="navbarsExample02">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
            <a class="navbar-brand" href="#">Always expand</a>
            </li>
          </ul>
          <button id="loginBtn" class="btn my-2 my-sm-0" onClick={login}>Login</button>
          {/* onClick={login} */}
          <a href="/singup"><button class="btn btn-success my-2 my-sm-0" >Sing Up</button></a>
        </div>
      </nav>
    );
}

export default Navbar;