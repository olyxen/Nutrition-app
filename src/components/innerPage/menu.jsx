import React, { Component} from 'react';
import './css/dashboard.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from "axios";
import Chart from './chart'



class Menu extends Component {
constructor(props){
    super(props);
    this.state ={
        chartData:props.chartData
    }
}

componentWillMount(){
    this.getChartData();

}

getChartData(){
    // Ajax calls here
    axios.get("http://localhost:8080/api/chart",{   
    })
    .then(res => {
        alert(res.data);
    })
    this.setState({
        chartData:{
            labels:['Protein', 'Calcium', 'Cholesterol','Carbohydrate','Sodium', 'Fat'],
            datasets:[
                {
                    label:'% value',
                    data:[
                        10,
                        3,
                        29,
                        11,
                        17,
                        15
                    ],
                    backgroundColor:[
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
                <div className="box3 col-md-12 col-xl-6" >
                    <div className="box1">
                        <svg height="310">
                        {/* #e54343 */}
                            <path  strokeWidth="17.666666666666668" stroke="#EEEEEE" fill="none" strokeLinecap="round" 
                            d=" M 132.5 70.96700000000001 C 322.6375 -5.735701074999994 257.71250000000003 331.7563677416667 135.59166666666667 265.79213225833337 
                            C 7.2875000000000005 331.7563677416667 -57.637499999999996 -5.735701074999994 132.5 70.96700000000001 Z" />

                            {/* to parakatw path prepei n xrhsimopoieitai otan bazei 8ermides o xrhsths */}
                            <path className="path" strokeWidth="17.666666666666668"  fill="none" strokeLinecap="round" 
                            d=" M 132.5 70.96700000000001 C 322.6375 -5.735701074999994 257.71250000000003 331.7563677416667 135.59166666666667 265.79213225833337 
                            C 7.2875000000000005 331.7563677416667 -57.637499999999996 -5.735701074999994 132.5 70.96700000000001 Z" />
                            <g>
                                <defs>
                                    <linearGradient id="gg1" x1="0" y1="0" x2="1" y2="0" >
                                        <stop offset="0%" style={{stopColor: "rgb(255,255,255)"}} ></stop>
                                        <stop offset="50%" style={{stopColor: "rgb(148,227,38)"}} ></stop>
                                        <stop offset="100%" style={{stopColor: "rgb(125,218,31)"}} ></stop>
                                        {/* <stop offset="100%" stopColor="#EEEEEE"></stop> */}
                                        
                                    </linearGradient>
                                </defs>
                            </g>
                            <path fill="#37d67a" d=" M 132.5 53.300333333333334 C 118.4844362 40.293236308333334 126.72888724 2.95035188333334 139.92000000000002 12.225333333333339 
                            C 158.05777448 24.150350558333336 133.32444362 25.223599233333335 132.5 53.300333333333334 Z"/>
                            <path fill="#EEEEEE" d=" M 132.5 61.427 L 132.5 79.80033333333333 L 130.73333333333332 79.80033333333333 L 121.89999999999999 76.70866666666666 
                            L 121.89999999999999 58.600333333333325 Z"></path>                            
                        </svg>
                    </div>
                    
                    <div className="box1" >
                        <Chart chartData={this.state.chartData}/>
                    </div> 
                </div> 
                <div className="box3 col-md-12 col-xl-5">
                    <div className="box2 d-flex justify-content-center align-items-center" >
                        <Calendar/>
                    </div>                
                </div>            
            </div>
        </div>
        </>  
    )
}
}

export default Menu;