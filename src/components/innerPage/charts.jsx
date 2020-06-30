import React, { Component} from 'react';
import ChartLine from './chartline';
import axios from "axios";




class Charts extends Component {

    constructor(props){
        super(props);
        this.state = {
            chartDataLine: props.chartDataLine
        }
    }

    componentDidMount(){
        var token = localStorage.getItem("login");
        axios.defaults.headers.common['Authorization'] = `${token}`
        
        //xreiazetai gia na arxikopoiei thn imeromhnia sthn shmerinh
        var date = new Date();
        this.getChartDataLine(date);
              
    }

    removeDays(dateObj, numDays) {
        dateObj.setDate(dateObj.getDate() - numDays);
        return dateObj;
     }
     


    getChartDataLine= (val) =>{
        
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
                chartDataLine: {
                    labels: [sixdayb, fivedayb, fourdayb, threedayb, twodayb, yesterday  , today],
                    datasets: [
                        {
                            label: 'kcal',
                            data: nutrients,
                            backgroundColor: [
                                'rgb(148,227,38)'
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
            <ChartLine chartDataLine={this.state.chartDataLine}/>
            
        </div>

        </>  
    )
        
}
}

export default Charts;