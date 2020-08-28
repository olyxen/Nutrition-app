import React, { Component} from 'react';
import ChartLine from './chartline';
import axios from "axios";




class Charts extends Component {

    constructor(props){
        super(props);
        this.state = {
            chartDataLine: props.chartDataLine,
            value: '',
            chartDataLineNutri: props.chartDataLineNutri
        };
        this.handleChange = this.handleChange.bind(this);
        //this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        var date = new Date();
        this.setState({value: event.target.value});
        this.getWeeklyNutr(date,event.target.value);
        // alert('Your favorite flavor is: ' + this.state.value);
    }
    
    // handleSubmit(event) {
    //     alert('Your favorite flavor is: ' + this.state.value);
    //     event.preventDefault();
    // }

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
        

        axios.get(`https://nutrition-app-api.herokuapp.com/api/meals/getWeeklyCalories/${isoDateTime}`) 
        
    
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
                                'rgb(148,227,38,0.8)'
                            ]
                        }
                    ]
                }
            })
        })
    }

    getWeeklyNutr= (val,nutri) =>{
        
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
        

        axios.get(`https://nutrition-app-api.herokuapp.com/api/meals/getWeeklynutri/${isoDateTime}/${nutri}`) 
        
    
        .then(res => {
            var nutrients = res.data;   
            if(nutri==='protein'){
                this.setState({
                    chartDataLineNutri: {
                        labels: [sixdayb, fivedayb, fourdayb, threedayb, twodayb, yesterday  , today],
                        datasets: [
                            {
                                label: 'g',
                                data: nutrients,
                                backgroundColor: [
                                    'rgb(255, 99, 132, 0.6)'
                                ]
                            }
                        ]
                    }
                })
            } else if(nutri === 'calcium') {
                this.setState({
                    chartDataLineNutri: {
                        labels: [sixdayb, fivedayb, fourdayb, threedayb, twodayb, yesterday  , today],
                        datasets: [
                            {
                                label: 'mg',
                                data: nutrients,
                                backgroundColor: [
                                    'rgb(54, 162, 235, 0.6)'
                                ]
                            }
                        ]
                    }
                })

            } else if(nutri === 'cholesterol') {
                this.setState({
                    chartDataLineNutri: {
                        labels: [sixdayb, fivedayb, fourdayb, threedayb, twodayb, yesterday  , today],
                        datasets: [
                            {
                                label: 'mg',
                                data: nutrients,
                                backgroundColor: [
                                    'rgb(255, 206, 86, 0.6)'
                                ]
                            }
                        ]
                    }
                })

            } else if(nutri === 'carbohydrate') {
                this.setState({
                    chartDataLineNutri: {
                        labels: [sixdayb, fivedayb, fourdayb, threedayb, twodayb, yesterday  , today],
                        datasets: [
                            {
                                label: 'g',
                                data: nutrients,
                                backgroundColor: [
                                    'rgb(75, 192, 192, 0.6)'
                                ]
                            }
                        ]
                    }
                })

            } else if(nutri === 'iron') {
                this.setState({
                    chartDataLineNutri: {
                        labels: [sixdayb, fivedayb, fourdayb, threedayb, twodayb, yesterday  , today],
                        datasets: [
                            {
                                label: 'mg',
                                data: nutrients,
                                backgroundColor: [
                                    'rgb(153, 102, 255, 0.6)'
                                ]
                            }
                        ]
                    }
                })

            }  else if(nutri === 'fat') {
                this.setState({
                    chartDataLineNutri: {
                        labels: [sixdayb, fivedayb, fourdayb, threedayb, twodayb, yesterday  , today],
                        datasets: [
                            {
                                label: 'g',
                                data: nutrients,
                                backgroundColor: [
                                    'rgb(255, 159, 64, 0.6)'
                                ]
                            }
                        ]
                    }
                })

            }  else if(nutri === 'fiber') {
                this.setState({
                    chartDataLineNutri: {
                        labels: [sixdayb, fivedayb, fourdayb, threedayb, twodayb, yesterday  , today],
                        datasets: [
                            {
                                label: 'g',
                                data: nutrients,
                                backgroundColor: [
                                    'rgb(30, 159, 64, 0.6)'
                                ]
                            }
                        ]
                    }
                })

            } else if(nutri === 'sugar') {
                this.setState({
                    chartDataLineNutri: {
                        labels: [sixdayb, fivedayb, fourdayb, threedayb, twodayb, yesterday  , today],
                        datasets: [
                            {
                                label: 'g',
                                data: nutrients,
                                backgroundColor: [
                                    'rgb(208, 52, 132, 0.6)'
                                ]
                            }
                        ]
                    }
                })

            }     else if(nutri === 'sodium') {
                this.setState({
                    chartDataLineNutri: {
                        labels: [sixdayb, fivedayb, fourdayb, threedayb, twodayb, yesterday  , today],
                        datasets: [
                            {
                                label: 'mg',
                                data: nutrients,
                                backgroundColor: [
                                    'rgb(208, 120, 132, 0.6)'
                                ]
                            }
                        ]
                    }
                })

            } else if(nutri === 'potassium') {
                this.setState({
                    chartDataLineNutri: {
                        labels: [sixdayb, fivedayb, fourdayb, threedayb, twodayb, yesterday  , today],
                        datasets: [
                            {
                                label: 'mg',
                                data: nutrients,
                                backgroundColor: [
                                    'rgb(208, 260, 132, 0.6)'
                                ]
                            }
                        ]
                    }
                })

            } else if(nutri === 'vitamin_a') {
                this.setState({
                    chartDataLineNutri: {
                        labels: [sixdayb, fivedayb, fourdayb, threedayb, twodayb, yesterday  , today],
                        datasets: [
                            {
                                label: 'mg',
                                data: nutrients,
                                backgroundColor: [
                                    'rgb(208, 52, 230, 0.6)'
                                ]
                            }
                        ]
                    }
                })

            } else if(nutri === 'vitamin_c') {
                this.setState({
                    chartDataLineNutri: {
                        labels: [sixdayb, fivedayb, fourdayb, threedayb, twodayb, yesterday  , today],
                        datasets: [
                            {
                                label: 'mg',
                                data: nutrients,
                                backgroundColor: [
                                    'rgb(208, 2, 132, 0.6)'
                                ]
                            }
                        ]
                    }
                })

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
            <ChartLine chartDataLine={this.state.chartDataLine}/>
            <form onSubmit={this.handleSubmit}>
        <label>
          Pick the nutrient:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="" disabled></option>
            <option value="protein">Protein</option>
            <option value="calcium">Calcium</option>
            <option value="cholesterol">Cholesterol</option>
            <option value="carbohydrate">Carbohydrate</option>
            <option value="iron">Iron</option>
            <option value="fat">Fat</option>
            <option value="fiber">Fiber</option>
            <option value="sugar">Sugar</option>
            <option value="sodium">Sodium</option>
            <option value="potassium">Potassium</option>
            <option value="vitamin_a">Vitamin A</option>
            <option value="vitamin_c">Vitamin C</option>
          </select>
        </label>
        <ChartLine chartDataLine={this.state.chartDataLineNutri}/>
      </form>
        </div>

        </>  
    )
        
}
}

export default Charts;