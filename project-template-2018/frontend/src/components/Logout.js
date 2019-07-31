import React, { Component} from 'react';
import Profile from './Profile';

class Logout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''

        };


        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch('/logout', {
            method: 'get',
            headers: {
                'X-My-Custom-Header': 'value-v',
                'content-type': 'application/json'
            }
        })
         window.location.assign('/login');
    }

    render() {
        return (

            <form onSubmit = {this.handleSubmit } >
            <div onSubmit = {this.handleSubmit }>
             <button > Logout < /button>
             </div>
             </form>

        );
    }
}




export default Logout;