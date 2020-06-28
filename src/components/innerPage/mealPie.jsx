import React, { Component} from 'react';
import { Pie } from 'react-chartjs-2';


class MealPie extends Component {

    constructor(props){
        super(props);
            this.state={
                dailyMealCalories: props.dailyMealCalories
            }
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.dailyMealCalories !== prevProps.dailyMealCalories) {
            this.setState({ dailyMealCalories: this.props.dailyMealCalories });
          }
      }

render() { 

    return (
        <>

        <div className="chart">
                <Pie
                    data={this.state.dailyMealCalories}
                    options={{
                       title:{
                           display:true,
                           text:'Calories Per Meal',
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
export default MealPie; 