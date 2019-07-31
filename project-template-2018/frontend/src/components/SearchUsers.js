import React, { Component} from 'react';
import Profile from './Profile';

class SearchUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nameSurname: ''
        };

        this.handleNameSurnameChange = this.handleNameSurnameChange.bind(this);
        this.handleSearchClick = this.handleSearchClick.bind(this);
    }



    handleSearchClick() {
     event.preventDefault();
   this.props.updateFilter(this.state.nameSurname);
     /*   fetch('/searchUsers', {
            method: 'post',
            body: JSON.stringify({nameSurname: this.state.nameSurname}),
            headers: {
                'X-My-Custom-Header': 'value-v',
                'content-type': 'application/json'
            }
        }).then((response) => response.json()).then((responseJson) => {
        })*/
}
    handleNameSurnameChange(event) {
        this.setState({
            nameSurname: event.target.value
        });

    }


    render() {
        return (
            <form onSubmit = {this.handleSearchClick } >
            <div>
            <input
            type = "text"
            placeholder = "Name or surname"
            value = { this.state.nameSurname}
            onChange = { this.handleNameSurnameChange }
            />

            </div>
            <button >  Search  User < /button>
             </form>
        );
    }
}




export default SearchUsers;