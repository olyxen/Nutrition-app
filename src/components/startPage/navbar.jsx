import React, { Component} from 'react';
import Modal from 'react-responsive-modal';
import './login.css';
import './frontPage.css';
import Login from './login'
import Singup from './singup';
import Final from './finalModal';



class Navbar extends Component {
 //for modals 
    constructor(props){
      super(props)
    }
    state = {
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
                        <form class="form-signin " onSubmit={(e) => {this.onOpenModalFinal(); this.onCloseModal(); e.preventDefault(); }}>
                           <Singup/>
                            <div >
                            Already a member? <a href="#"onClick={() => {
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
                <Modal open={ final} onClose={this.onCloseModalFinal} class="final">
                <button  id="btn" class="btn my-2 my-sm-0" onClick={this.onCloseModalFinal}><img  id="closebutton" src="/x.png"></img></button>
                    <div className="modal-body">
                      <div class="final">
                        <form  class="form-signin " name="form" onSubmit={(e) => {this.singup(); e.preventDefault(); }}>
                         <Final/>
                        </form>
                      </div>

                    </div>
                </Modal>
            </>
          );
      }
}


export default Navbar


