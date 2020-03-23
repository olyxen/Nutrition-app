import React, { Component} from 'react';
import axios from "axios";
import './login.css';




class Login extends Component {

    state = {
      username: null,
      password: null,
    };


    login(){       
        axios.post("http://localhost:8080/api/user/login/",{
            username: this.state.username,
            password: this.state.password
        })
        .then(res => {
            if (res.data==='Logged in!'){
                var token = res.headers['auth-token'];
                localStorage.setItem("login", token);
                window.open("/dashboard", "_self"); //to open new page
            }
            else{
                alert(res.data);
            }
        })
    }

render() { 
    return (
        <>
        <h2>Welcome to <br/> Nutri App</h2>
        <form name="form" onSubmit={(e) => {this.login(); e.preventDefault(); }}> 
            <h3 className="mt-4 mb-4 font-weight-normal">Login and Get Started</h3>
            <label className="sr-only" >Username</label>
            <input type="text" className="form-control" name="username" placeholder="Username" onChange={(event)=>{this.setState({username:event.target.value})}} required></input> 
            <label className="sr-only">Password</label>
            <input type="password" className="form-control" name="password" placeholder="Password" onChange={(event)=>{this.setState({password:event.target.value})}} required></input>
            <br/>
            <input className="btn btn-lg btn-primary btn-block" type="submit" value="Sign in"></input>
        </form>
        
        <p className="mt-4 mb-3 text-muted">© 2020</p>
    </>
    )
}
}

export default Login;