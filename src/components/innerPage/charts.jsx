import React, { Component} from 'react';
import Chart from './chart';
import axios from "axios";




class Charts extends Component {

    constructor(props){
        super(props);
        this.state = {
            chartData: props.chartData
        }
    }

    componentDidMount(){
        var token = localStorage.getItem("login");
        axios.defaults.headers.common['Authorization'] = `${token}`
        
        //xreiazetai gia na arxikopoiei thn imeromhnia sthn shmerinh
        var date = new Date();
        this.getChartData(date);
              
    }

    getChartData= (val) =>{
        
        //briskei thn akribh wra sthn ellada
        var isoDateTime = new Date(val.getTime() - (val.getTimezoneOffset() * 60000)).toISOString()
        this.setState({pickedDate: isoDateTime})

        //mpakalistika pros to paron gia n ypologizw mia mera prin
        var dayVal = new Date(val.getTime() - (val.getTimezoneOffset() * 60000)).getDate()-1;
        var monthVal = new Date(val.getTime() - (val.getTimezoneOffset() * 60000)).getMonth()+1;
        var yearVal = new Date(val.getTime() - (val.getTimezoneOffset() * 60000)).getFullYear();
        var theVal = dayVal +"-" + monthVal+ "-" + yearVal;
        var today = new Date(val.getTime() - (val.getTimezoneOffset() * 60000)).toDateString()

        axios.get(`http://localhost:8080/api/meals/getWeeklyCalories/${isoDateTime}`) 
        
    
        .then(res => {
            var nutrients = res.data;                    
            this.setState({
                chartData: {
                    labels: ['Protein', 'Calcium', 'Cholesterol', 'lala', theVal  , today],
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
 
render() { 

    return (
        <>
        <div id="content">
            <button type="button" id="sidebarCollapse" className="btn btn-info toogleButton">
                <i className="fas fa-align-left"></i>
                <span>Toggle Sidebar</span>
            </button> 
            <Chart chartData={this.state.chartData}/>
            
        </div>

        </>  
    )
        
}
}

export default Charts;