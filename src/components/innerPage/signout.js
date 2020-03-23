import React, { Component } from 'react';

class SignOut extends Component {

    componentDidMount(){
        localStorage.removeItem('login');
            this.props.history.push('/');
    }


    render(){
        return(
            <div>
                {this.props.children}
            </div>
        )
    }
}

export default SignOut;