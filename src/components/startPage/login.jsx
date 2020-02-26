import React, { Component} from 'react';
import axios from "axios";
import './login.css';



class Login extends Component {

    constructor(props){
        super(props);
    }
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
                window.open("/DashBoard", "_self"); //to open new page
            }
            else{
                alert(res.data);
            }
        })
    }

render() { 
    return (
        <>
        <h2>Login and Get <span>Started</span></h2>

                    
        <img class="mb-4" src="/docs/4.4/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72"></img>
        <form name="form" onSubmit={(e) => {this.login(); e.preventDefault(); }}> 
            <h1 class="h3 mb-3 font-weight-normal">Welcome to Nutri App</h1>
            <label class="sr-only" >Username</label>
            <input type="text" class="form-control" name="username" placeholder="Username" onChange={(event)=>{this.setState({username:event.target.value})}} required></input> 
            <label class="sr-only">Password</label>
            <input type="password" class="form-control" name="password" placeholder="Password" onChange={(event)=>{this.setState({password:event.target.value})}} required></input>
            <input class="btn btn-lg btn-primary btn-block" type="submit" value="Sign in"></input>
        </form>
        
        <p class="mt-5 mb-3 text-muted">© 2020</p>
    </>
    )
}
}

export default Login;