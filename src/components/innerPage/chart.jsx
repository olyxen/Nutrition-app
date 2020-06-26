import React, { Component} from 'react';
import { Bar } from 'react-chartjs-2';

class Chart extends Component {


    constructor(props){
        super(props);
            this.state={
                chartData: props.chartData
            }
    }
    
    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.chartData !== prevProps.chartData) {
          this.setState({ chartData: this.props.chartData });
        }
         
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

                    }}
                />
            </div>
        )

    }



}
export default Chart;