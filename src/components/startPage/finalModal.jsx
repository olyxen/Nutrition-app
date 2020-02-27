import React, {Component } from 'react';
import './login.css';
import axios from "axios";

class Final extends Component{

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
         <h2 >Last Step for Sign up!</h2>
                          <img class="mb-4" src="/docs/4.4/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72"></img>
                          <form name="form" onSubmit={(e) => {this.signup(); e.preventDefault(); }}>
                          <h1 class="h3 mb-3 font-weight-normal">Please complete</h1>
                          <hr/>
                          {/* <fieldset class="form-group">
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
                          </fieldset> */}



                          {/* <label for="inputAge" class="sr-only">Age</label>
                          <input type="age" id="inputAge" class="form-control" name="age" placeholder="Age" onChange={(event)=>{this.setState({age:event.target.value})}} required=""></input> */}
                          


                          <label for="inputWeight" class="sr-only">Weight</label>
                          <input type="weight" id="inputWeight" class="form-control" name="weight" placeholder="Weight //eg 60 kg" onChange={(event)=>{this.setState({weight:event.target.value})}} required=""></input>
                          <label for="inputHeight" class="sr-only">Height</label>
                          <input type="height" id="inputHeight" class="form-control" name="height" placeholder="Height //eg 170 cm" onChange={(event)=>{this.setState({height:event.target.value})}} required=""></input>
                          <br/>
                          <br/>
                          <button class="btn btn-lg btn-primary btn-block" type="submit">Sign up</button>
                          </form>
        </>
    )
}
}
export default Final;