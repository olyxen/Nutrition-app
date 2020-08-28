import React, { Component} from 'react';
import jwt from 'jwt-decode' 

// #61892F
// #86C232
// #222629
// #474B4F
// #6B6E70

class Sidebar extends Component {

    state = {
        username: ''
    }

    componentDidMount(){
        var token = localStorage.getItem("login");
        var decoded = jwt(token);
        this.setState({username: decoded.username});
    }

    
render() { 
    return (
        <>
            <div className="sidebar-header">
                <h3>Your Nutrition Diary</h3>
            </div>
            <div className="sidebar-profile mt-3">
                <img id="profile-image" src="/Profile_avatar_placeholder.png" alt="Smiley face"></img>
                <h3>{this.state.username}</h3>
            </div>

            <ul className="list-unstyled components">
                <li>
                    <a href="https://nutrition-app-pamak.herokuapp.com/dashboard">
                        <i className="fa fa-tachometer-alt"></i>
                        <span className="menu-text"> Dashboard</span>
                    </a>
                </li>
                <li>
                    <a href="https://nutrition-app-pamak.herokuapp.com/dashboard/meals">
                        <i className="fas fa-seedling"></i>
                        <span className="menu-text"> Meals</span>
                    </a>                </li>
                <li>
                <a href="https://nutrition-app-pamak.herokuapp.com/dashboard/charts">
                        <i className="fa fa-chart-line"></i>
                        <span className="menu-text"> Charts</span>
                    </a>
                </li>
                <li>
                    <a href="https://nutrition-app-pamak.herokuapp.com/dashboard/recipes">
                        <i className="fas fa-book-open"></i>
                        <span className="menu-text"> Recipes</span>
                    </a>                
                </li>
                <li>
                    <a href="https://nutrition-app-pamak.herokuapp.com/dashboard/faq">
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

            
            <section className = "fatSecretRef">
                <a href="https://platform.fatsecret.com">
                    <img src="https://platform.fatsecret.com/api/static/images/powered_by_fatsecret.png" srcset="https://platform.fatsecret.com/api/static/images/powered_by_fatsecret_2x.png 2x, https://platform.fatsecret.com/api/static/images/powered_by_fatsecret_3x.png 3x" border="0"/>
                </a>
            </section>
        </>
    )
}
}
export default Sidebar;