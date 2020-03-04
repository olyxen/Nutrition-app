import React, { Component} from 'react';
import Modal from 'react-responsive-modal';
import './login.css';
import './frontPage.css';
import Login from './login'
import Singup from './singup';



class Navbar extends Component {
 //for modals 
    constructor(props){
      super(props)
    }
    state = {
      flag: false,
      sign: false,
      login: false,
      final: false,
    }

    onOpenModal = () => {
      this.setState({ sign: true});
    };

    onOpenModalLogin = () => {
      this.setState({ login: true});
    };

    onCloseModal = () => {
      this.setState({ sign: false});
    };

    onCloseModalclose = () => {
      this.setState({ login: false});
    };


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

  becomeTrue(){
    this.setState({flag: true});    
}

    render(){
      const { login, sign } = this.state;
      return (
        <>

            <nav class="navbar navbar-expand" >
              <div class="collapse navbar-collapse" id="navbarsExample02">
                <ul class="navbar-nav mr-auto">
                  <li class="nav-item active">
                    <a id="home" class="navbar-brand" href="/"><img id="logo" src="/logo2.png"></img></a>
                  </li>
                </ul>
                <button id="loginBtn" class="btn my-2 my-sm-0" onClick={this.onOpenModalLogin}>Login</button>
                <button id="signup" class="btn btn-success my-2 my-sm-0" onClick={this.onOpenModal}>Sign up</button>
              </div>              
            </nav>
{/* Login modal */}

              <Modal open={login} onClose={this.onCloseModalclose}>
                
                <div className="modal-body">
                  <button  id="btn" class="btn my-2 my-sm-0" onClick={this.onCloseModalclose}><img  id="closebutton" src="/x.png"></img></button>
                    <div class="text-center h-100 login">
                          <form class="form-signin " onSubmit={(e) => { e.preventDefault(); }}>
                              <Login/>                            
                              <div >
                                You don't have an account? <a href="#"onClick={() => {
                                                      this.onOpenModal();
                                                      this.onCloseModalclose(); }}
                                                      >Create one.
                                                  </a>
                            </div>
                          </form>
                        </div>
                        
                </div>
              </Modal>


{/* Sign up modal */}
              <Modal open={sign} onClose={this.onCloseModal}>
                    <div className="modal-body">
                    <button  id="btn" class="btn my-2 my-sm-0" onClick={this.onCloseModal}><img  id="closebutton" src="/x.png"></img></button>
                        <div class="text-center h-100 singup">
                        <form class="form-signin " onSubmit={(e) => {this.becomeTrue();e.preventDefault(); }}>
                           <Singup/>
                           { !this.state.flag?
                            <div >
                            Already a member? <a href="#"onClick={() => {
                                                      this.onOpenModalLogin();
                                                      this.onCloseModal(); }}
                                                      >Login
                                                  </a>
                            </div>
                            :
                            <div>
                              <br/>
                            </div>
                            }
                        </form>
            
                         </div>
                        
                    </div>
                </Modal>

            </>
          );
      }
}


export default Navbar


