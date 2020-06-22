import React, { Component} from 'react';
import Chart from './chart';


class Charts extends Component {
 



render() { 

    return (
        <>
        <div id="content">
            <button type="button" id="sidebarCollapse" className="btn btn-info toogleButton">
                <i className="fas fa-align-left"></i>
                <span>Toggle Sidebar</span>
            </button> 
            <Chart/>

        </div>
        </>  
    )
        
}
}

export default Charts;