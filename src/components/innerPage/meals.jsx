import React, { Component} from 'react';
import './css/meals.css'
import './css/dashboard.css';


class Meals extends Component {
    

render() { 

    return (
        <>
        <div id="content">
            <button type="button" id="sidebarCollapse" className="btn btn-info toogleButton">
                <i className="fas fa-align-left"></i>
                <span>Toggle Sidebar</span>
            </button>
            <h1>Calendar</h1>
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
                                <div class="input-group mb-3">
                                    <input type="text" class="form-control" placeholder="Add new food" aria-describedby="basic-addon2"/>
                                    <div class="input-group-append">
                                        <button class="btn btn-primary" id="basic-addon2">+</button>
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