import React, { Component} from 'react';
import { Line } from 'react-chartjs-2';

class ChartLine extends Component {


    constructor(props){
        super(props);
            this.state={
                chartDataLine: props.chartDataLine
            }
    }
    
    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.chartDataLine !== prevProps.chartDataLine) {
          this.setState({ chartDataLine: this.props.chartDataLine });
        }
         
      }

    render(){
        return(
            <div className="chart">
                <Line
                    data={this.state.chartDataLine}
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
export default ChartLine;