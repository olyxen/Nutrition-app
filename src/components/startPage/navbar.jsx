import React, { Component,PropTypes } from 'react';
import axios from "axios";

 function login(){
  axios.get("https://nutrition-app-api.herokuapp.com/hello").then(res => {
        window.open("/login");
        alert(res.data);
        
      }
  );
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

        <div>
<button type="button" id='ingresar' data-toggle="modal" data-target="#myModal">
  Ingresar
</button>

<div className="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span className="sr-only">Close</span></button>
        <h4 className="modal-title" id="myModalLabel">Modal title</h4>
      </div>
      <div className="modal-body">
        ...
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
        </div>
      </nav>
    );
}

export default Navbar;