import React, { Component} from 'react';

class Sidebar extends Component {

    
render() { 
    return (
        <>
            <div class="sidebar-header">
                <h3>Your Nutrition Diary</h3>
            </div>

            <ul class="list-unstyled components">
                <li>
                    <a href="#">
                        <i class="fa fa-tachometer-alt"></i>
                        <span class="menu-text"> Dashboard</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <i class="fas fa-seedling"></i>
                        <span class="menu-text"> Food</span>
                    </a>                </li>
                <li>
                    <a href="#">
                        <i class="fa fa-chart-line"></i>
                        <span class="menu-text"> Charts</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <i class="fas fa-book-open"></i>
                        <span class="menu-text"> Recipes</span>
                    </a>                </li>
                <li>
                    <a href="#">
                        <i class="fa fa-question-circle"></i>
                        <span class="menu-text"> FAQ</span>
                    </a>                </li>
            </ul>
        </>
    )
}
}
export default Sidebar;