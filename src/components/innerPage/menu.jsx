import React, { Component} from 'react';
import './css/dashboard.css';
import Chart from './chart';
import DatePicker from './calendar';
import jwt from 'jwt-decode' 


import 'react-circular-progressbar/dist/styles.css';
import {
    CircularProgressbar,
    buildStyles
  } from "react-circular-progressbar";
import './css/animateCircle.css';
import ReactSpeedometer from "react-d3-speedometer";

//8ermides pou katanalwnei o xrhsths apo ta faghta
const value = 520;

class Menu extends Component {
    state = {
        calendarVal: 7,
        bmi: '',
        bmr:'',
        flag: false
    };


    componentDidMount() {
        window.addEventListener("resize", this.resize.bind(this));
        this.resize();
        
        var token = localStorage.getItem("login");
        var decoded = jwt(token);
        this.setState({bmi: decoded.bmi});
        console.log(decoded.bmi);
        this.setState({bmr: decoded.bmr});
        

        
    }
    
    resize() {
        if(window.innerWidth > 590){
            this.setState({calendarVal:7})        
        }else if(window.innerWidth <= 474){
            this.setState({calendarVal:3})        
        }else{
            this.setState({calendarVal:5})        
        }
    }
selectedDay = (val) =>{
    console.log(val)
}; 

ChangeFlag(){
    this.setState({flag: !this.state.flag})
}



render() { 

    return (
        <>
        <div id="content">
            <button type="button" id="sidebarCollapse" className="btn btn-info toogleButton">
                <i className="fas fa-align-left"></i>
                <span>Toggle Sidebar</span>
            </button>
            <div className="row">
            <div className="calendar col-md-12 col-xl-8">
                <DatePicker 
                    getSelectedDay={this.selectedDay}
                    maxValue={this.state.calendarVal}

                />            
            </div>
            <div className="col-md-12 col-xl-2"></div>
            <div className="bmibox col-md-12 col-xl-2">
                <h5>What is Your Body Mass Index ? <a href="http://localhost:3000/dashboard#bmi"  onClick={(e) => this.ChangeFlag()}>Check it.</a></h5>
            </div>
            </div>
            <hr/>
            <div className="row">
                <div className="col-md-12 col-xl-2" ></div>
                <div className="col-md-12 col-xl-8" >
                    <div className="box1">
                        <div className="row">
                            <div className="col-md-12 col-xl-4" >
                                <a href="http://localhost:3000/dashboard/meals#breakfast"><button className="mealbtn" id="brbtn"></button></a>
                                <br/>
                                <br/>
                                <br/>
                                <a href="http://localhost:3000/dashboard/meals#lunch"><button className="mealbtn" id="lnchbtn"></button></a>
                            </div>
                            <div className="col-md-12 col-xl-4" >
                                
                                <svg height="310">
                                    <CircularProgressbar
                                        value={value}
                                        maxValue={this.state.bmr}
                                        text={`${value} / ${this.state.bmr} cal`}
                                        strokeWidth={5}
                                        styles={buildStyles({
                                            textSize:"10px"
                                          })}
                                        
                                    />
                                
                                    <g>
                                        <defs>
                                            <linearGradient id="gg1" x1="0" y1="0" x2="1" y2="0" >
                                                <stop offset="1%" style={{stopColor: "rgb(31, 82, 34)"}} ></stop>
                                                <stop offset="50%" style={{stopColor: "rgb(148,227,38)"}} ></stop>
                                                <stop offset="100%" style={{stopColor: "rgb(125,218,31)"}} ></stop>
                                                {/* <stop offset="100%" stopColor="#EEEEEE"></stop> */}
                                                
                                            </linearGradient>
                                        </defs>
                                    </g>
                                </svg>
                            </div>
                            
                            <div className="col-md-12 col-xl-4" >
                                <a href="http://localhost:3000/dashboard/meals/#snack1"><button className="mealbtn" id="snckbtn"></button></a>
                                <br/>
                                <br/>
                                <br/>
                                <a href="http://localhost:3000/dashboard/meals#dinner"><button className="mealbtn"id="dnnrbtn"></button></a>
                            </div>
                        </div>    
                    </div>
                    
                    <div className="" >
                        <Chart/>
                        {this.state.flag?
                        <div className="row" id="bmidiv">
                            <div className="col-md-12 col-xl-8" id="bmi">
                            <ReactSpeedometer
                                width={350}
                                needleHeightRatio={0.75}
                                value={this.state.bmi *20 }
                                customSegmentStops={[0, 370, 500, 1000]}
                                segmentColors={["rgba(255, 206, 86, 0.7)", "rgba(0, 208, 132, 0.7)", "rgba(184, 0, 0, 0.6)"]}
                                currentValueText="What Is Your Body Mass Index?"
                                customSegmentLabels={[
                                {
                                    fontSize:"13.5px",
                                    text: "Underweight <18,5",
                                    position: "OUTSIDE",
                                    color: "#343736",
                                },
                                {
                                    fontSize:"12.5px",
                                    text: "Normal <25",
                                    position: "OUTSIDE",
                                    color: "#343736",
                                },
                                {
                                    fontSize:"13.5px",
                                    text: "Overweight >25",
                                    position: "OUTSIDE",
                                    color: "#343736",
                                },
                                ]}
                                ringWidth={50}
                                needleTransitionDuration={3333}
                                needleTransition="easeElastic"
                                needleColor={"rgba(49, 176, 75, 0.6)"}
                                textColor={"#000000"}
                        
                            />
                            
                            </div>
                            <div className="bmibox col-md-12 col-xl-4">Your Body Mass Index is : <strong>{this.state.bmi}</strong> <br/>Body mass index (BMI) is a value derived from the mass (weight) and height of a person. The BMI is defined as the body mass divided by the square of the body height, and is universally expressed in units of kg/m2, resulting from mass in kilograms and height in metres. </div>
                        </div>
                        :
                        <div/>
                        }
                    </div>    
                </div> 
            </div>
        </div>
        </>  
    )
}
}

export default Menu;