import React, {Component } from 'react';
import axios from "axios";
import './login.css';
import './navbar.jsx';



class Singup extends Component{
    constructor(props){
        super(props);
    }
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
        this.setState({flag: true});    
    }
    signup(){

        axios.post("http://localhost:8080/api/user/register/",{
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
                
                alert(res.data);

                
               // window.open("/DashBoard", "_self"); //to open new page
                
            }
            else{
                alert(res.data);
            }
        })


        // axios.post("http://localhost:8080/api/user/bmr/",{

        //     weight: this.state.weight,
        //     height: this.state.height,
        //     age: this.state.age,
        //     gender: this.state.gender
        // })
        // .then(res => {
           
                
                
        //         window.open("/DashBoard", "_self"); //to open new page
                
           
        // })

    }

render(){
    return(
        <>
           { !this.state.flag?
       
            <div>
                <h2 >Get Started Absolutely<span> Free!</span></h2>


                <img class="mb-4" src="/docs/4.4/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72"></img>
                <form name="form" onSubmit={(e) => {this.becomeTrue(); e.preventDefault(); }}>
                
                <h1 class="h3 mb-3 font-weight-normal">Create an account.</h1>
                <label for="inputEmail" class="sr-only">Email address</label>
                <input type="email" id="inputEmail" class="form-control" name="email" placeholder="Email address" onChange={(event)=>{this.setState({email:event.target.value})}} required autofocus></input>
                <label for="inlineFormInputGroup" class="sr-only" >Username</label>
                <input type="text" id="inlineFormInputGroup" class="form-control" name="username" placeholder="Username" onChange={(event)=>{this.setState({username:event.target.value})}} required></input>
                <label for="inputPassword" class="sr-only">Password</label>
                <input type="password" id="inputPassword" class="form-control" name="password" placeholder="Password" onChange={(event)=>{this.setState({password:event.target.value})}} required></input>
                {/* <label for="inputPassword2" class="sr-only">Password</label>
                <input type="password" id="inputPassword2" class="form-control" placeholder="Rewrite Password" required></input> */}
                <br/>
                <input class="btn btn-lg btn-primary btn-block" type="submit" value="Sign up"></input>

                </form>

                <p class="mt-5 mb-3 text-muted">© 2020</p>
            </div>
            :
                <div>
                <h2 >Last Step for Sign up!</h2>
                <img class="mb-4" src="/docs/4.4/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72"></img>
                <form name="form" onSubmit={(e) => {this.signup(); e.preventDefault(); }}>
                <h1 class="h3 mb-3 font-weight-normal">Please complete</h1>
                <hr/>
                <fieldset >
                            <div class="text-left row">
                              <legend class="col-form-label col-sm-2 pt-0">Gender</legend>
                              <div class="col-sm-10">
                                <div class="form-check">
                                  <input class="form-check-input" type="radio" name="gender" id="gridRadios1" value="female" onChange={(event)=>{this.setState({gender:event.target.value})}} ></input>
                                  <label class="form-check-label" for="gridRadios1">
                                    Female
                                  </label>
                                </div>
                                <div class="form-check">
                                  <input class="form-check-input" type="radio" name="gender" id="gridRadios2" value="male" onChange={(event)=>{this.setState({gender:event.target.value})}}></input>
                                  <label class="form-check-label" for="gridRadios2">
                                      Male  
                                  </label>
                                </div>
                                
                              </div>
                            </div>
                </fieldset>
                <br/>

                 <label for="inputAge" class="sr-only">Age</label>
                          <input type="age" id="inputAge" class="form-control" name="age" placeholder="Age" onChange={(event)=>{this.setState({age:event.target.value})}} required=""></input>

                <label for="inputWeight" class="sr-only">Weight</label>
                <input type="weight" id="inputWeight" class="form-control" name="weight" placeholder="Weight //eg 60 kg" onChange={(event)=>{this.setState({weight:event.target.value})}} required=""></input>
                <label for="inputHeight" class="sr-only">Height</label>
                <input type="height" id="inputHeight" class="form-control" name="height" placeholder="Height //eg 170 cm" onChange={(event)=>{this.setState({height:event.target.value})}} required=""></input>
                <br/>
                <br/>
                

                <button class="btn btn-lg btn-primary btn-block" type="submit">Sign up</button>
                </form>
                </div>
            }

        </>
    )

}
}
export default Singup;



