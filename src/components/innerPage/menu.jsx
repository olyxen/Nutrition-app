import React, { Component} from 'react';
import './css/dashboard.css';
import Chart from './chart';
import DatePicker from './calendar';
import jwt from 'jwt-decode';
import axios from "axios";

import 'react-circular-progressbar/dist/styles.css';
import {
    CircularProgressbar,
    buildStyles
  } from "react-circular-progressbar";
import './css/animateCircle.css';
import ReactSpeedometer from "react-d3-speedometer";



class Menu extends Component {
    state = {
        calendarVal: 7,
        bmi: '',
        bmr:'',
        calories: null,
        flag: false
    };

    constructor(props) {
        super(props);

        this.state = {
            user: null,
            pickedDate: null,
            flag: false,
            calendarVal: 7,
            chartData: props.chartData
          };
    }


    componentDidMount() {
        window.addEventListener("resize", this.resize.bind(this));
        this.resize();
        
        var token = localStorage.getItem("login");
        var decoded = jwt(token);
        this.setState({bmi: decoded.bmi});
        console.log(decoded.bmi);
        this.setState({bmr: decoded.bmr});
        //this.setState({cal: decoded.cal});
        //console.log(decoded.cal);

         
        axios.defaults.headers.common['Authorization'] = `${token}`
        this.setState({user: decoded._id})


        //xreiazetai gia na arxikopoiei thn imeromhnia sthn shmerinh
        var date = new Date();
        this.updateDailyCalories(date)
        this.getChartData(date);
               
    }
    getChartData= (val) =>{
        
        //briskei thn akribh wra sthn ellada
        var isoDateTime = new Date(val.getTime() - (val.getTimezoneOffset() * 60000)).toISOString()
        this.setState({pickedDate: isoDateTime})

        
        axios.get(`http://localhost:8080/api/meals/getDailyStats/${isoDateTime}`) 
        
    
        .then(res => {
            var nutrients = [res.data[0],res.data[1],res.data[2],res.data[3],res.data[4],res.data[5]]                   
            this.setState({
                chartData: {
                    labels: ['Protein', 'Calcium', 'Cholesterol', 'Carbohydrate', 'Iron', 'Fat'],
                    datasets: [
                        {
                            label: 'g',
                            data: nutrients,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.6)',
                                'rgba(54, 162, 235, 0.6)',
                                'rgba(255, 206, 86, 0.6)',
                                'rgba(75, 192, 192, 0.6)',
                                'rgba(153, 102, 255, 0.6)',
                                'rgba(255, 159, 64, 0.6)',
                                'rgba(255, 99, 132, 0.6)'
                            ]
                        }
                    ]
                }
            })
        })
    }


    //allazei thn timh tou pickedDate me autin pou epele3e o xrhsths apo to hmerologio
    updateDailyCalories = (val) =>{
        //kathe fore pou epilegetai allh hmeromhnia mhdenizw ta calories
        this.setState({calories:" "})

        //briskei thn akribh wra sthn ellada
        var isoDateTime = new Date(val.getTime() - (val.getTimezoneOffset() * 60000)).toISOString()
        this.setState({pickedDate: isoDateTime})

        
        //enhmerwnei thn selida se kathe allagh hmeromhnias
        axios.get(`http://localhost:8080/api/meals/getDailyCalories/${isoDateTime}`)
        //epistrefei tis 8ermides ts hmeras kai tis apo8ukeuei sto calories
        .then( res => 
            this.setState({ 
            calories: res.data 
        }) )

        this.getChartData(val)
        
    }; 

        
     //prosarmozei to hmerologio sto megethos ths othonis
    resize() {
        if(window.innerWidth > 590){
            this.setState({calendarVal:7})        
        }else if(window.innerWidth <= 474){
            this.setState({calendarVal:3})        
        }else{
            this.setState({calendarVal:5})        
        }
    }

 

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
            <div className="calendar col-md-12 col-xl-10">
                <DatePicker 
                    getSelectedDay={this.updateDailyCalories}
                    maxValue={this.state.calendarVal}

                />            
            </div>
            <div className="bmibox col-md-12 col-xl-2">
                <h5>What is Your Body Mass Index ? <a href="http://localhost:3000/dashboard#bmi"  onClick={(e) => this.ChangeFlag()}>Check it.</a></h5>
            </div>
            </div>
            <hr/>
            <div className="row">
                <div className="col-md-12 col-xl-8 offset-xl-2" >
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
                                        value={[this.state.calories]}
                                        maxValue={this.state.bmr}
                                        text={`${[this.state.calories]} / ${this.state.bmr} cal`}
                                        strokeWidth={5}
                                        styles={buildStyles({
                                            textSize:"10px",
                                            
                                          })}
                                          
                                    />
                                
                                    <g>
                                    {Number(this.state.calories) < this.state.bmr? 
                                        <defs>
                                            <linearGradient id="gg1" x1="0" y1="0" x2="1" y2="0" >
                                                <stop offset="1%" style={{stopColor: "rgb(31, 82, 34)"}} ></stop>
                                                <stop offset="50%" style={{stopColor: "rgb(148,227,38)"}} ></stop>
                                                <stop offset="100%" style={{stopColor: "rgb(125,218,31)"}} ></stop>
                                                {/* <stop offset="100%" stopColor="#EEEEEE"></stop> */}
                                                
                                            </linearGradient>
                                           
                                        </defs>
                                    :
                                        <defs>
                                        <linearGradient id="gg1" x1="0" y1="0" x2="1" y2="0" >
                                                <stop offset="1%" style={{stopColor: "rgb(194, 48, 39)"}} ></stop>
                                                <stop offset="50%" style={{stopColor: "rgb(219,99,99)"}} ></stop>
                                                <stop offset="100%" style={{stopColor: "rgb(244,115,115)"}} ></stop>
                                                {/* <stop offset="100%" stopColor="#EEEEEE"></stop> */}
                                                
                                            </linearGradient>
                                        </defs>
                                    }   
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
                        <Chart chartData={this.state.chartData} />
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
                            <div className="bmibox col-md-12 col-xl-4">Your Body Mass Index is : <strong>{(Math.floor((this.state.bmi)*100)/100)}</strong> <br/>Body mass index (BMI) is a value derived from the mass (weight) and height of a person. The BMI is defined as the body mass divided by the square of the body height, and is universally expressed in units of kg/m2, resulting from mass in kilograms and height in metres. </div>
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