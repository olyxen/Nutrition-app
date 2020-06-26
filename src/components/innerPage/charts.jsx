import React, { Component} from 'react';
import Chart from './chart';
import axios from "axios";




class Charts extends Component {
    componentDidMount(){
        var token = localStorage.getItem("login");
        axios.defaults.headers.common['Authorization'] = `${token}`
              
    }
 
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