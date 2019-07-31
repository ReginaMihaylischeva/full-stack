import React, {
    Component
} from 'react';
import {
    browserHistory,
    withRouter
} from "react-router-dom";

import UserActivities from './UserActivities';
import SearchUsers from './SearchUsers';

class Users extends Component {

    constructor(props) {
        super(props);
        this.handleShowClick = this.handleShowClick.bind(this);
        this.handleRemoveClick = this.handleRemoveClick.bind(this);


        this.state = {
            isLoggedIn: false,
            users: [],
            isFriend: false,
            friends: [],
            filter: '',
            filtered: [],
            error: null
        };
    }

    updateFilter(value) {
        this.setState({
            filter: value
        });
    }

    componentWillMount() {
        fetch('/getFriends', {
            method: 'post',
            body: JSON.stringify({
                UserId: this.props.id,
                relations: 'friend',
            }),
            headers: {
                'X-My-Custom-Header': 'value-v',
                'content-type': 'application/json'
            }
        }).then((response) => {

            if (response.status < 200 || response.status > 300) {
                return Promise.reject(new Error(response.statusText))
            } else {
                return response.json();
            }
        }).then((responseJson) => {
            this.setState({
                friends: responseJson
            })
        }).catch(error => {
            this.setState({
                error: error
            })

        })
    }


    handleShowClick() {
        event.preventDefault();
        fetch('/getUsers', {
            method: 'get',
            headers: {
                'X-My-Custom-Header': 'value-v',
                'content-type': 'application/json'
            }
        }).then((response) => response.json()).then((responseJson) => {
            this.setState({
                users: responseJson
            })
        })

        this.setState({
            isLoggedIn: true
        });
        this.props.updateData(this.state.friends);
    }

    handleRemoveClick() {
        event.preventDefault();
        this.setState({
            isLoggedIn: false,
            filter: ''
        });
    }
  render() {
        const{users,
              isLoggedIn,
              friends,
              filter,
              error
              }=this.state;
        const email = this.props.email;
        let button;
                 if(error!=null){return(
                                  < p > { error.message } < /p>
                                 )}
        if (isLoggedIn) {
            button = < Button onClick = { this.handleRemoveClick } label = { 'Remove Users List' }/>;
        } else {
            button = < Button onClick = {this.handleShowClick } label = { ' Show Users List' }/>;
        }
             return (
               <div>
                 <OutputControl users={users} isLoggedIn={isLoggedIn} email={email} friends={friends} updateFilter={this.updateFilter.bind(this)} filter={filter}/>
                 {button}
               </div>
             );
           }
         }

         function UsersPrint(props) {
            const {
                 users,
                 email,
                 friends,
                 history,
                 filter
             } = props;
                debugger;
             const usersList= users.map((dpElem, index) => (
                   <div key={index}>
                   <h2>User</h2>
                   <form>
                   <div>
                   <p>Name: {dpElem.name}</p>
                  <UserActivities email = { email} emailFriend = {dpElem.email} friends={friends} idUser={dpElem.id} />
                   </div>
                   </form>
                   </div>
              ))
                const usersList1= users.map((dpElem, index) => (
                <div key={index}>
                 <form>
                 <FilteredUsers users={users} email = { email} emailFriend = {dpElem.email} friends={friends} idUser={dpElem.id} filter={filter} name={dpElem.name} surname={dpElem.surname}/>
                 </form>
                 </div>
                ))


             if (filter!=""){

             return (
             <div>
               <SearchUsers updateFilter={props.updateFilter}/>
               {usersList1}
               </div>
              )}else {
              return   (
              <div>
              <SearchUsers updateFilter={props.updateFilter}/>
              {usersList}
               </div>
               )}
         }

        function FilteredUsers(props) {
         const {
               users,
               name,
               filter,
               surname,
               email,
               emailFriend,
               friends,
               idUser
               } = props;

        if (((((filter.split(' ').length==1 )&&((filter===name)||(filter===surname)))) ||
         (( (filter.split(' ').length==2 )&&((filter[0]===name)||(filter[1]===surname)))))){

         return (
         <div>
         <h1>User</h1>
         <div>
         <p>{name}</p>
         <UserActivities email = { email} emailFriend = {emailFriend} friends={friends} idUser={idUser} />
          </div>
          </div>
           );
         }
           return null;
         }

         function OutputControl(props) {
          const {
                 users,
                 filter,
                 email,
                 isLoggedIn,
                 friends,
                 } = props;

           if (isLoggedIn) {
             return <UsersPrint users={users} email={email} friends={friends}  updateFilter={props.updateFilter} filter={filter}/>;
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

export default Users;