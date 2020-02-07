import React, { Component, useState} from 'react';
import axios from "axios";
import ReactDOM from "react-dom";
import Modal from 'react-bootstrap/Modal';

import Button from 'react-bootstrap/Button'

function Navbar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
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
    </>
  );
}




// class Navbar extends Component{
//   const [show, setShow] = useState(false);

//    handleClose = () => setShow(false);
//    handleShow = () => setShow(true);

//   login(){
//     axios.get("https://nutrition-app-api.herokuapp.com/hello").then(res => {
//       window.open("/login");
//       alert(res.data);
//     });
//   }
//   render(){
//     return(
//       <nav class="navbar navbar-expand navbar-dark bg-dark">
//       <div class="collapse navbar-collapse" id="navbarsExample02">
//         <ul class="navbar-nav mr-auto">
//           <li class="nav-item active">
//           <a class="navbar-brand" href="#">Always expand</a>
//           </li>
//         </ul>
//         <button id="loginBtn" class="btn my-2 my-sm-0" onClick={this.login}>Login</button>
//         {/* onClick={login} */}
//         <a href="/singup"><button class="btn btn-success my-2 my-sm-0" >Sing Up</button></a>
//       </div>

//       <div>
// <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
//   Launch demo modal
// </button>

// <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
//   <div class="modal-dialog" role="document">
//     <div class="modal-content">
//       <div class="modal-header">
//         <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
//         <button type="button" class="close" data-dismiss="modal" aria-label="Close">
//           <span aria-hidden="true">&times;</span>
//         </button>
//       </div>
//       <div class="modal-body">
//         ...
//       </div>
//       <div class="modal-footer">
//         <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
//         <button type="button" class="btn btn-primary">Save changes</button>
//       </div>
//     </div>
//   </div>
// </div>
// </div>
      
//     </nav>
//     );
//   }
// }

 export default Navbar;