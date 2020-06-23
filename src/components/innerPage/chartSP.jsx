import React, { Component} from 'react';
import axios from "axios";
import { Pie } from 'react-chartjs-2';


class ChartSP extends Component {
 
    state ={
        chartDataSP:{},
    }

    componentDidMount(){
        this.getSP();       
    }

    getSP(){
        // Ajax calls here
        var token = localStorage.getItem("login");
        axios.get("http://localhost:8080/api/meals/getDailyStatsSP", { headers: { Authorization: `${token}`}}) 
    
        .then(res => {
            var nutrients = res.data;                    
            this.setState({
                chartDataSP: {
                    labels: ['Sodium', 'Potassium'],
                    datasets: [
                        {
                            label: '% value',
                            data: nutrients,
                            backgroundColor: [
                                'rgba(255, 206, 86, 0.6)',
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
        
        <div className="chart">
                <Pie
                    data={this.state.chartDataSP}
                    options={{
                       title:{
                           display:true,
                           text:'Nutrition Facts',
                           fontSize:25
                       },
                       legend:{
                           display:true,
                           position:'bottom',
                           labels:{
                               fontColor:'#000'
                           }
                       },
                    }}
                />
            </div>
        </>  
    )
        
}
}

export default ChartSP;