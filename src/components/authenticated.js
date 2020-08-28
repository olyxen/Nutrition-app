import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class AuthenticatedComponent extends Component {
    constructor(props){
        super(props);

        this.state = {
            user: undefined
        };
    }

    componentDidMount(){
        const jwt = this.getJwt();
        if(!jwt){
            this.props.history.push('/');
        }
        
        axios.get('https://nutrition-app-api.herokuapp.com/api/user/getUser', { headers: { Authorization: `${jwt}`}})
        .then( res => 
            this.setState({ 
            user: res.data 
        })).catch(err => {
            localStorage.removeItem('login');
            this.props.history.push('/');
        })

 
    }


    getJwt(){
        return localStorage.getItem('login');
    }

    render(){
        if(this.state.user === undefined){
            return(
                <div><h1>Loading...</h1></div>
            );
        }

        return(
            <div>
                {this.props.children}
            </div>
        )
    }
}

export default withRouter(AuthenticatedComponent);