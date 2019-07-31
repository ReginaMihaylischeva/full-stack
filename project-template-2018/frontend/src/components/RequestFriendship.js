import React, {
    Component
} from 'react';
import UserActivities from './UserActivities';

class RequestFriendship extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            loading: true,
            email: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRemoveClick = this.handleRemoveClick.bind(this);

    }

    handleSubmit(event) {
        event.preventDefault();
        fetch('/requestFriends', {
            method: 'post',
            body: JSON.stringify({
                id:this.props.id,
                relations: 'request'
            }),
            headers: {
                'X-My-Custom-Header': 'value-v',
                'content-type': 'application/json'
            }
        }).then((response) => response.json()).then((responseJson) => {
            this.setState({
                users: responseJson,
                loading: false
            })
        }).
        then(fetch('/me', {
            method: 'post',
            body: JSON.stringify({
                id: this.props.id
            }),
            headers: {
                'X-My-Custom-Header': 'value-v',
                'content-type': 'application/json'
            }
        }).then(response => response.json()).then(result => {
            this.setState({
                email: result.email
            })
        }));




    }
    handleRemoveClick(event) {
        event.preventDefault();
        this.setState({
            loading: true
        });
    }
    render() {
       const {
            email,
            users,
            loading
        }=this.state;
        let button;
        if (loading) {
            button = < Button onClick = { this.handleSubmit } label = { ' Show Request Friend List' }/>;
        } else {
            button = < Button onClick = { this.handleRemoveClick  } label = { 'Remove Request Friend List' }/>;
        }
        return (
           <form >
            <FriendshipPrinting users = { users }  email = { email } loading = { loading }/>
            { button}
            </form>
        );
    }
}

function FriendshipPrinting(props) {
    const {
    email,
    users,
    loading
    }=props;

    if (!loading) {
        return (
            users.map((dpElem, index) => (
              <div key = { index } >
                < h2 > User < /h2>
                <form > {
                    dpElem.map((item, i) => (
                    <div key = { i } >
                        < p >Name: { item.name} < /p>
                        < p >Surname: { item.surname} < /p>
                        < UserActivities emailFriend = { item.email} email = { email } fromRequest = { true } />
                        < /div>
                    ))
                }
                </form>
                </div>
            ))
        );
    }
    return null;
}

function Button(props) {
    return (
        < button onClick = { props.onClick } >
         {props.label}
        </button>
        );
    }
export default RequestFriendship;