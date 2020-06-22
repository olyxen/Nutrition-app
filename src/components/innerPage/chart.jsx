import React, { Component} from 'react';
import axios from "axios";
import { Bar } from 'react-chartjs-2';

class Chart extends Component {
    
    state ={
        chartData:{},
    }

    componentDidMount(){
        this.getChartData();       
    }

    getChartData(){
        // Ajax calls here
        var token = localStorage.getItem("login");
        axios.get("http://localhost:8080/api/meals/getDailyMeals", { headers: { Authorization: `${token}`}}) 
    
        .then(res => {
            var nutrients = res.data;                    
            this.setState({
                chartData: {
                    labels: ['Protein', 'Calcium', 'Cholesterol', 'Carbohydrate', 'Iron', 'Fat'],
                    datasets: [
                        {
                            label: '% value',
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

    render(){
        return(
            <div className="chart">
                <Bar
                    data={this.state.chartData}
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


                    //    tooltips:{
                    //        enabled:true
                    //    }
                    }}
                />
            </div>
        )

    }



}
export default Chart;