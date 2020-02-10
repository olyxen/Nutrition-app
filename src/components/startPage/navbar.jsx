import React, { Component, useState} from 'react';
import axios from "axios";
import ReactDOM from "react-dom";
import Modal from 'react-bootstrap/Modal';

import Button from 'react-bootstrap/Button'

function login(){
  axios.get("https://nutrition-app-api.herokuapp.com/hello").then(res => {
        window.open("/login");
        alert(res.data);
        
      }
  );
}

function Navbar(){
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
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

        </div>
       <Button variant="primary" onClick={handleShow}>
         Launch demo modal
       </Button>

       <Modal show={show} onHide={handleClose}>
         <Modal.Header closeButton>
           <Modal.Title>Modal heading</Modal.Title>
         </Modal.Header>
         <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
         <Modal.Footer>
           <Button variant="secondary" onClick={handleClose}>
             Close
           </Button>
           <Button variant="primary" onClick={handleClose}>
             Save Changes
           </Button>
         </Modal.Footer>
       </Modal>
      </nav>
    );
}

export default Navbar;


