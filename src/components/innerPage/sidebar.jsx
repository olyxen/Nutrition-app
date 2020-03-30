import React, { Component} from 'react';

class Sidebar extends Component {

    
render() { 
    return (
        <>
            <div className="sidebar-header">
                <h3>Your Nutrition Diary</h3>
            </div>

            <ul className="list-unstyled components">
                <li>
                    <a href="http://localhost:3000/dashboard">
                        <i className="fa fa-tachometer-alt"></i>
                        <span className="menu-text"> Dashboard</span>
                    </a>
                </li>
                <li>
                    <a href="http://localhost:3000/dashboard/meals">
                        <i className="fas fa-seedling"></i>
                        <span className="menu-text"> Meals</span>
                    </a>                </li>
                <li>
                    <a href="/#" style={{pointerEvents: "none", cursor: "default"}}>
                        <i className="fa fa-chart-line"></i>
                        <span className="menu-text"> Charts</span>
                    </a>
                </li>
                <li>
                    <a href="http://localhost:3000/dashboard/recipes">
                        <i className="fas fa-book-open"></i>
                        <span className="menu-text"> Recipes</span>
                    </a>                
                </li>
                <li>
                    <a href="/#" style={{pointerEvents: "none", cursor: "default"}}>
                        <i className="fa fa-question-circle"></i>
                        <span className="menu-text"> FAQ</span>
                    </a>                
                </li>
            </ul>

            <section>
                <a href="/signout" className="signout-link" title="Sign out">
                    <i className="fas fa-sign-out-alt"></i><span> Sign out</span>
                </a>
            </section>
        </>
    )
}
}
export default Sidebar;