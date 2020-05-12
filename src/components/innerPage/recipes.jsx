import React, { Component} from 'react';
import Cards from './cards/cards';

class Recipes extends Component {

    

render() { 

    return (
        <>
        <div id="content">
            <button type="button" id="sidebarCollapse" className="btn btn-info toogleButton">
                <i className="fas fa-align-left"></i>
                <span>Toggle Sidebar</span>
            </button> 
            <Cards/>
        </div>
        </>  
    )
}
}

export default Recipes;