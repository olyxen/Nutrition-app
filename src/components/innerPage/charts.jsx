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

    removeDays(dateObj, numDays) {
        dateObj.setDate(dateObj.getDate() - numDays);
        return dateObj;
     }
     


    getChartData= (val) =>{
        
        //briskei thn akribh wra sthn ellada
        var isoDateTime = new Date(val.getTime() - (val.getTimezoneOffset() * 60000)).toISOString()
        this.setState({pickedDate: isoDateTime})

        var today = new Date().toDateString()      
        var yesterday = this.removeDays(new Date(), 1).toDateString()
        var twodayb = this.removeDays(new Date(), 2).toDateString()
        var threedayb = this.removeDays(new Date(), 3).toDateString()
        var fourdayb = this.removeDays(new Date(), 4).toDateString()
        var fivedayb = this.removeDays(new Date(), 5).toDateString()
        var sixdayb = this.removeDays(new Date(), 6).toDateString()
        

        axios.get(`http://localhost:8080/api/meals/getWeeklyCalories/${isoDateTime}`) 
        
    
        .then(res => {
            var nutrients = res.data;                    
            this.setState({
                chartData: {
                    labels: [sixdayb, fivedayb, fourdayb, threedayb, twodayb, yesterday  , today],
                    datasets: [
                        {
                            label: 'kcal',
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