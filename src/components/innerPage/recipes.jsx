import React, { Component} from 'react';
import Card from './cards/cards';

class Recipes extends Component {

    

render() { 

    return (
        <>
        <div id="content">
            <button type="button" id="sidebarCollapse" className="btn btn-info toogleButton">
                <i className="fas fa-align-left"></i>
                <span>Toggle Sidebar</span>
            </button> 
            
            
            <Card/>

            
        </div>
        </>  
    )
}
}

export default Recipes;