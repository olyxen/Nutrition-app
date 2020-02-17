import React, { Component} from 'react';
// import axios from "axios";
import Modal from 'react-responsive-modal';
import './login.css';
import './frontPage.css';
import styles from './frontPage.css';



// function login(){
//   axios.get("https://nutrition-app-api.herokuapp.com/hello").then(res => {
//         window.open("/login");
//         alert(res.data);
        
//       }
//   );
// }

class Navbar extends Component {
 //for modals 
    constructor(props){
      super(props)

      this.state = {
        sign: false,
        login: false,
        final: false,

      }
    }

    onOpenModal = () => {
      this.setState({ sign: true});
    };

    onOpenModalLogin = () => {
      this.setState({ login: true});
    };

    onOpenModalFinal = () => {
      this.setState({ final: true});
    }

    onCloseModal = () => {
      this.setState({ sign: false});
    };

    onCloseModalclose = () => {
      this.setState({ login: false});
    };

    onCloseModalFinal = () => {
      this.setState({ final: false});
    }

//change css for navbar on scroll
    documentStyle = document.documentElement.style;
    initalNavbarBackgroundColor = '';
    scrolledNavbarBackgroundColor = 'rgba(0, 0, 0, 0.8)';
    

    handleScroll = () => {
      if (window.scrollY === 0) {
          this.documentStyle.setProperty('--navbar-background-color', this.initalNavbarBackgroundColor);
      } else {
          this.documentStyle.setProperty('--navbar-background-color', this.scrolledNavbarBackgroundColor);
      }
  }

  componentDidMount() {
      window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
      window.removeEventListener('scroll', this.handleScroll);
  }


    render(){
      const { login, sign, final } = this.state;
      return (
        <>

            <nav className={styles.Navbar} class="navbar navbar-expand fixed-top in" >
              <div class="collapse navbar-collapse" id="navbarsExample02">
                <ul class="navbar-nav mr-auto">
                  <li class="nav-item active">
                    <a id="home" class="navbar-brand" href="/">Nutri App</a>
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
                              <label for="inlineFormInputGroup" class="sr-only" >Username</label>
                              <input type="text" id="inlineFormInputGroup" class="form-control" placeholder="Username"></input> 
                              <label for="inputPassword" class="sr-only">Password</label>
                              <input type="password" id="inputPassword" class="form-control" placeholder="Password" required=""></input>
                              <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                              <p class="mt-5 mb-3 text-muted">© 2020</p>
                              <div >
                                You don't have an account? <a href="#"onClick={() => {
                                                      this.onOpenModal();
                                                      this.onCloseModalclose(); }}
                                                      >Sign up
                                                  </a>
                            </div>
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
                            <label for="inlineFormInputGroup" class="sr-only" >Username</label>
                            <input type="text" id="inlineFormInputGroup" class="form-control" placeholder="Username"></input>
                            <label for="inputPassword" class="sr-only">Password</label>
                            <input type="password" id="inputPassword" class="form-control" placeholder="Password" required=""></input>
                            <button class="btn btn-lg btn-primary btn-block" type="submit" onClick={() => {
                                                      this.onOpenModalFinal();
                                                      this.onCloseModal(); }}>Sign in</button>
                            <p class="mt-5 mb-3 text-muted">© 2020</p>
                            <div >
                                Have an account? <a href="#"onClick={() => {
                                                      this.onOpenModalLogin();
                                                      this.onCloseModal(); }}
                                                      >Login
                                                  </a>
                            </div>
                        </form>
            
                         </div>
                        
                    </div>
                </Modal>
{/*Final modal */}
                <Modal open={ final} onClose={this.onCloseModalFinal}>
                    <div className="modal-body">
                      {/* <div class="text-center h-100"> */}
                        <form class="final">
                          <h2 >Last Step for Sign up!</h2>
                          <img class="mb-4" src="/docs/4.4/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72"></img>
                          <h1 class="h3 mb-3 font-weight-normal">Please complete</h1>

                          <fieldset class="form-group">
                            <div class="row">
                              <legend class="col-form-label col-sm-2 pt-0">Gender</legend>
                              <div class="col-sm-10">
                                <div class="form-check">
                                  <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1" ></input>
                                  <label class="form-check-label" for="gridRadios1">
                                    Female
                                  </label>
                                </div>
                                <div class="form-check">
                                  <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2"></input>
                                  <label class="form-check-label" for="gridRadios2">
                                      Male  
                                  </label>
                                </div>
                                
                              </div>
                            </div>
                          </fieldset>

                          <label for="inputAge" class="sr-only">Age</label>
                          <input type="age" id="inputAge" class="form-control" placeholder="Age" required=""></input>
                          
                          <label for="inputWeight" class="sr-only">Weight</label>
                          <input type="weight" id="inputWeight" class="form-control" placeholder="Weight //eg 60 kg" required=""></input>
                          <label for="inputHeight" class="sr-only">Height</label>
                          <input type="height" id="inputHeight" class="form-control" placeholder="Height //eg 170 cm" required=""></input>
                          <br/>
                          <br/>
                          <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                        </form>
                      {/* </div> */}

                    </div>
                </Modal>
            </nav>
            </>
          );
      }
}


export default Navbar


