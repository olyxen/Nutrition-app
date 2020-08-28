import React, { Component} from 'react';
import Modal from 'react-responsive-modal';
import './login.css';
import './frontPage.css';
import Login from './login'
import Singup from './singup';



class Navbar extends Component {
 //for modals 
    state = {
      flag: false,
      sign: false,
      login: false,
    }

    onOpenModal = () => {
      this.setState({ sign: true});
    };

    onOpenModalLogin = () => {
      const login_token = localStorage.getItem('login')
        if (login_token){
            window.open("https://nutrition-app-pamak.herokuapp.com/dashboard", "_self"); //to open new page
        }else{
          this.setState({ login: true});
        }
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
        <nav className="navbar navbar-expand" >
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a id="home" className="navbar-brand" href="/"><img id="logo" alt="" src="/logo47.png"></img></a>
              </li>
            </ul>
            <button id="loginBtn" className="btn my-2 my-sm-0" onClick={this.onOpenModalLogin}>Login</button>
            <button id="signup" className="btn btn-success my-2 my-sm-0" onClick={this.onOpenModal}>Sign up</button>
          </div>              
        </nav>
        {/* Login modal */}
        <Modal open={login} onClose={this.onCloseModalclose}>
          <div className="modal-body">
            <button  id="btn" className="btn my-2 my-sm-0" onClick={this.onCloseModalclose}><img  id="closebutton" alt="" src="/x.png"></img></button>
              <div className="text-center h-100 login">
                <div className="form-signin ">
                  <Login/>                            
                  <div >
                    You don't have an account? 
                    <a className="changeModal" href="/#" onClick={() => {this.onOpenModal(); this.onCloseModalclose();}} > Create one.</a>
                  </div>
                </div>
              </div> 
          </div>
        </Modal>
        {/* Sign up modal */}
        <Modal open={sign} onClose={this.onCloseModal}>
          <div className="modal-body">
            <button  id="btn" className="btn my-2 my-sm-0" onClick={this.onCloseModal}><img  id="closebutton" alt="" src="/x.png"></img></button>
            <div className="text-center h-100 singup">
              <div className="form-signin " onSubmit={(e) => {this.becomeTrue();e.preventDefault(); }}>
                <Singup/>
                { !this.state.flag?
                <div >
                  Already a member?
                  <a className="changeModal" href="/#"onClick={() => { this.onOpenModalLogin(); this.onCloseModal(); }} > Login</a>
                </div>
                :
                <div>
                  <br/>
                </div>
                }
              </div>
            </div>
          </div>
        </Modal>
      </>
    );
  }
}


export default Navbar


