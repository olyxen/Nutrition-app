import React, { Component, useState} from 'react';
// import axios from "axios";
import Modal from 'react-responsive-modal';
import './login.css';

// import Button from 'react-bootstrap/Button'

// function login(){
//   axios.get("https://nutrition-app-api.herokuapp.com/hello").then(res => {
//         window.open("/login");
//         alert(res.data);
        
//       }
//   );
// }

class Navbar extends Component {

    constructor(props){
      super(props)

      this.state = {
        sign: false,
        login: false,

      }
    }

    onOpenModal = () => {
      this.setState({ sign: true});
    };

    onOpenModalLogin = () => {
      this.setState({ login: true});
    };

    onCloseModal =() => {
      this.setState({ sign: false});
    };

    onCloseModalclose =() => {
      this.setState({ login: false});
    };

    render(){
      const { login, sign } = this.state;
      return (
        <>

            <nav class="navbar navbar-expand navbar-dark bg-dark">
              <div class="collapse navbar-collapse" id="navbarsExample02">
                <ul class="navbar-nav mr-auto">
                  <li class="nav-item active">
                  <a class="navbar-brand" href="/">Always expand</a>
                  </li>
                </ul>
                <button id="loginBtn" class="btn my-2 my-sm-0" onClick={this.onOpenModalLogin}>Login</button>
                <button id="signup" class="btn btn-success my-2 my-sm-0" onClick={this.onOpenModal}>Sign Up</button>
              </div>
{/* Login modal */}

              <Modal open={login} onClose={this.onCloseModalclose}>
                
                <div className="modal-body">
                    
                    <div class="text-center h-100 login">
                          <form class="form-signin ">
                          <h2>Login and Get <span>Started</span></h2>
                    
                              <img class="mb-4" src="/docs/4.4/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72"></img>
                              <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
                              <label for="inputEmail" class="sr-only">Email address</label>
                              <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required="" autofocus=""></input>
                              <label for="inputPassword" class="sr-only">Password</label>
                              <input type="password" id="inputPassword" class="form-control" placeholder="Password" required=""></input>
                              <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                              <p class="mt-5 mb-3 text-muted">© 2020</p>
                          </form>
                        </div>
                </div>
              </Modal>


{/* Sign up modal */}
              <Modal open={sign} onClose={this.onCloseModal}>
                    <div className="modal-body">
                        
                        <div class="text-center h-100 singup">
                        <form class="form-signin ">
                        <h2 >Get Started Absolutely<span> Free!</span></h2>
                            <img class="mb-4" src="/docs/4.4/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72"></img>
                            <h1 class="h3 mb-3 font-weight-normal">Please sign up</h1>
                            <label for="inputEmail" class="sr-only">Email address</label>
                            <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required="" autofocus=""></input>
                            <label for="inlineFormInput" class="sr-only" >Name</label>
                            <input type="text" id="inlineFormInput" class="form-control" placeholder="Full Name"></input>
                            <label for="inlineFormInputGroup" class="sr-only" >Username</label>
                            <input type="text" id="inlineFormInputGroup" class="form-control" placeholder="Username"></input>
                            <label for="inputPassword" class="sr-only">Password</label>
                            <input type="password" id="inputPassword" class="form-control" placeholder="Password" required=""></input>
                            <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                            <p class="mt-5 mb-3 text-muted">© 2020</p>
                            {/* <div >
                                Have an account? <button onClick={this.onOpenModalLogin} >Log In</button>
                            </div> */}
                        </form>
            
                         </div>
                        
                    </div>
                </Modal>


           
            </nav>
            </>
          );
      }
}


export default Navbar


