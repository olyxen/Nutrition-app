import React, { Component} from 'react';
import './css/dashboard.css';
import Chart from './chart';
import DatePicker from './calendar';

import 'react-circular-progressbar/dist/styles.css';
import {
    CircularProgressbar
  } from "react-circular-progressbar";
import './css/animateCircle.css';
import SpeedoBmr from './speedometer';
import ReactSpeedometer from "react-d3-speedometer";

//8ermides pou katanalwnei o xrhsths apo ta faghta
const value = 520;
//hmerhsies 8ermides pou 8a prepei na katanalwnei
const maxValue = 2200;

class Menu extends Component {
    state = {
        calendarVal: 7
    };

    componentDidMount() {
        window.addEventListener("resize", this.resize.bind(this));
        this.resize();
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



render() { 

    return (
        <>
        <div id="content">
            <button type="button" id="sidebarCollapse" className="btn btn-info toogleButton">
                <i className="fas fa-align-left"></i>
                <span>Toggle Sidebar</span>
            </button>
            <div className="calendar">
                <DatePicker 
                    getSelectedDay={this.selectedDay}
                    maxValue={this.state.calendarVal}

                />            
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
                                        maxValue={maxValue}
                                        text={`${value}cal`}
                                        strokeWidth={5}
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
                        <ReactSpeedometer
                            width={500}
                            needleHeightRatio={0.7}
                            value={770}
                            customSegmentStops={[0, 250, 750, 1000]}
                            segmentColors={["#EDE713", "#4ECD8E", "#F92D2D"]}
                            currentValueText="What Is Your Body Mass Index?"
                            customSegmentLabels={[
                              {
                                text: "Underweight",
                                position: "OUTSIDE",
                                color: "#343736",
                              },
                              {
                                text: "Normal",
                                position: "OUTSIDE",
                                color: "#343736",
                              },
                              {
                                text: "Overweight",
                                position: "OUTSIDE",
                                color: "#343736",
                              },
                            ]}
                            ringWidth={47}
                            needleTransitionDuration={3333}
                            needleTransition="easeElastic"
                            needleColor={"#a7ff83"}
                            textColor={"#000000"}
                       
                        />
                    </div> 
                    
                </div> 
                {/* <div className="box3 col-md-12 col-xl-5">
                    <div className="box2 d-flex justify-content-center align-items-center" >
                        <Calendar/>
                    </div>                
                </div>             */}
            </div>
        </div>
        </>  
    )
}
}

export default Menu;