import React, { Component} from 'react';
import './css/meals.css'
import './css/dashboard.css';
import DatePicker from './calendar'


class Meals extends Component {
    state = {
        calendarVal: 7
    };

    componentDidMount() {
        window.addEventListener("resize", this.resize.bind(this));
        this.resize();
    }
    
    resize() {
        if(window.innerWidth > 590){
            this.setState({calendarVal:7})        
        }else if(window.innerWidth <= 474){
            this.setState({calendarVal:3})        
        }else{
            this.setState({calendarVal:5})        
        }
    }
selectedDay = (val) =>{
    console.log(val)
};    

render() { 

    return (
        <>
        <div id="content">
            <button type="button" id="sidebarCollapse" className="btn btn-info toogleButton">
                <i className="fas fa-align-left"></i>
            </button>
            <div className="calendar">
                <DatePicker 
                    getSelectedDay={this.selectedDay}
                    maxValue={this.state.calendarVal}

                />            
            </div>
            <hr/>
                <div className="row">
                    <div className="col-xs-12 col-lg-4 col-lg-push-8">
                        <div className="lunchbox stats-analysis">
                            
                        </div>
                        <div className="lunchbox macronutrients"></div>
                        <div className="lunchbox micronutrients"></div>
                    </div>
                    <div className="col-xs-12 col-lg-8 col-lg-pull-4">
                        <div className="lunchbox breakfast">
                            <div className="mealform">
                                <div className="d-flex p-2 bd-highlight">Breakfast</div>
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" placeholder="Add new food" aria-describedby="basic-addon2"/>
                                    <div className="input-group-append">
                                        <button className="btn btn-primary" id="basic-addon2">+</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lunchbox lunch"></div>
                        <div className="lunchbox dinner"></div>
                        <div className="lunchbox snack"></div>
                        
                    </div>
                </div>
            
            
            
            
        </div>
        </>  
    )
}
}

export default Meals;