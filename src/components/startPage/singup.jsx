import React, {Component } from 'react';
import axios from "axios";
import './login.css';



class Singup extends Component{
    constructor(props){
        super(props);
    }
    state={
        email: null,
        username: null,
        password: null,
        weight: null,
        height: null,
        age: null,
        gender: null,
    };


    signup(){

        axios.post("http://localhost:8080/api/user/register/",{
            email: this.state.email,
            username: this.state.username,
            password: this.state.password,
            weight: this.state.weight,
            height: this.state.height,
            // age: this.state.age,
            // gender: this.state.gender
        })
        .then(res => {
            if (res.data==='User has successfully created'){
                window.open("/DashBoard", "_self"); //to open new page
            }
            else{
                alert(res.data);
            }
        })
    }

render(){
    return(
        <>

       

            <h2 >Get Started Absolutely<span> Free!</span></h2>


                <img class="mb-4" src="/docs/4.4/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72"></img>
                
                <h1 class="h3 mb-3 font-weight-normal">Create an account.</h1>
                <label for="inputEmail" class="sr-only">Email address</label>
                <input type="email" id="inputEmail" class="form-control" name="email" placeholder="Email address" onChange={(event)=>{this.setState({email:event.target.value})}} required autofocus></input>
                <label for="inlineFormInputGroup" class="sr-only" >Username</label>
                <input type="text" id="inlineFormInputGroup" class="form-control" name="username" placeholder="Username" onChange={(event)=>{this.setState({username:event.target.value})}} required></input>
                <label for="inputPassword" class="sr-only">Password</label>
                <input type="password" id="inputPassword" class="form-control" name="password" placeholder="Password" onChange={(event)=>{this.setState({password:event.target.value})}} required></input>
                {/* <label for="inputPassword2" class="sr-only">Password</label>
                <input type="password" id="inputPassword2" class="form-control" placeholder="Password" required></input> */}
                <input class="btn btn-lg btn-primary btn-block" type="submit" value="Sign up"></input>
              
                <p class="mt-5 mb-3 text-muted">© 2020</p>

        </>
    )

}
}
export default Singup;



