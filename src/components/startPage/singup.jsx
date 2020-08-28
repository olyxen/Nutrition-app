import React, {Component } from 'react';
import axios from "axios";
import './login.css';
import './navbar.jsx';



class Singup extends Component{
    
    state={
        flag: false,
        email: null,
        username: null,
        password: null,
        weight: null,
        height: null,
        age: null,
        gender: null,
    };

    becomeTrue(){
        axios.post("https://nutrition-app-api.herokuapp.com/api/user/validateSignup",{
            email: this.state.email,
            username: this.state.username,
            password: this.state.password
        }).then(res => {
            if (res.data==="It's ok"){
                this.setState({flag: true});    
        this.setState({flag: true});    
                this.setState({flag: true});    
            }
            else{
                alert(res.data);
            }
        })
    }
    signup(){

        axios.post("https://nutrition-app-api.herokuapp.com/api/user/register/",{
            email: this.state.email,
            username: this.state.username,
            password: this.state.password,
            weight: this.state.weight,
            height: this.state.height,
            age: this.state.age,
            gender: this.state.gender
        })
        .then(res => {
            if (res.data==='User has successfully created'){
                alert(res.data + '\nTry to Login'); 
                window.open("/", "_self");
            }
            else{
                alert(res.data);
            }
        })
    }

render(){
    return(
        <>
           { !this.state.flag?
       
            <div>
                <h2 >Get Started Absolutely<span> Free!</span></h2>
                <form name="form" onSubmit={(e) => {this.becomeTrue(); e.preventDefault(); }}>
                
                    <h3 className="mt-4 mb-4 font-weight-normal">Create an account</h3>
                    <label htmlFor="inputEmail" className="sr-only">Email address</label>
                    <input type="email" id="inputEmail" className="form-control" name="email" placeholder="Email address" onChange={(event)=>{this.setState({email:event.target.value})}} required autoFocus></input>
                    <label htmlFor="inlineFormInputGroup" className="sr-only" >Username</label>
                    <input type="text" id="inlineFormInputGroup" className="form-control" name="username" placeholder="Username" onChange={(event)=>{this.setState({username:event.target.value})}} required></input>
                    <label htmlFor="inputPassword" className="sr-only">Password</label>
                    <input type="password" id="inputPassword" className="form-control" name="password" placeholder="Password" onChange={(event)=>{this.setState({password:event.target.value})}} required></input>
                    {/* <label for="inputPassword2" className="sr-only">Password</label>
                    <input type="password" id="inputPassword2" className="form-control" placeholder="Rewrite Password" required></input> */}
                    <br/>
                    <input className="btn btn-lg btn-primary btn-block" type="submit" value="Sign up"></input>

                </form>

                <p className="mt-4 mb-3 text-muted">© 2020</p>
            </div>
            :
                <div>
                <h2 >Last Step for Sign up!</h2>
                <img className="mb-4" src="/docs/4.4/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72"></img>
                <form name="form" onSubmit={(e) => {this.signup(); e.preventDefault(); }}>
                    <h1 className="h3 mb-3 font-weight-normal">Please complete</h1>
                    <hr/>
                    <fieldset>
                        <div className="text-left row">
                            <legend className="col-form-label col-sm-2 pt-0">Gender</legend>
                            <div className="col-sm-10">
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="gender" id="gridRadios1" value="female" onChange={(event)=>{this.setState({gender:event.target.value})}} required></input>
                                <label className="form-check-label" htmlFor="gridRadios1">
                                Female
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="gender" id="gridRadios2" value="male" onChange={(event)=>{this.setState({gender:event.target.value})}} required></input>
                                <label className="form-check-label" htmlFor="gridRadios2">
                                    Male  
                                </label>
                            </div>
                            
                            </div>
                        </div>
                    </fieldset>
                    <br/>

                    <label htmlFor="inputAge" className="sr-only">Age</label>
                    <input type="age" id="inputAge" className="form-control" name="age" placeholder="Age" onChange={(event)=>{this.setState({age:event.target.value})}} required></input>
                    <label htmlFor="inputWeight" className="sr-only">Weight</label>
                    <input type="weight" id="inputWeight" className="form-control" name="weight" placeholder="Weight //eg 60 kg" onChange={(event)=>{this.setState({weight:event.target.value})}} required></input>
                    <label htmlFor="inputHeight" className="sr-only">Height</label>
                    <input type="height" id="inputHeight" className="form-control" name="height" placeholder="Height //eg 170 cm" onChange={(event)=>{this.setState({height:event.target.value})}} required></input>
                    <br/>
                    <br/>
                    

                    <button className="btn btn-lg btn-primary btn-block" type="submit">Sign up</button>
                </form>
            </div>
            }
        </>
    )
}}

export default Singup;



