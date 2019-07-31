import React,{ Component} from 'react';
import   { browserHistory, withRouter} from "react-router-dom";

import Profile from './Profile';



class UserActivities extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: false,
            label: 'addFriend',
            Friends: [],
            error:null
        };
        this.handleAdd = this.handleAdd.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddRequest = this.handleAddRequest.bind(this);
        this.handleGetProfile = this.handleGetProfile.bind(this);


    }
     componentWillMount() {
     if((!this.props.fromProfile)&&(!this.props.fromRequest)){
        const friends = this.props.friends;
        const Friends = [];
        friends.map((dpElem, index) => (
        Friends.push(dpElem.email)
        ))
       this.setState({ Friends: Friends });
       }
     }

    handleGetProfile(event) {
        event.preventDefault();
          this.props.history.push('/profile/:id' + this.props.idUser);
    }
    handleRequest (value)  {
    fetch('/addFriend', {
                method: 'post',
                body: JSON.stringify({
                    email1: this.props.email,
                    email2: this.props.emailFriend,
                    relations: value
                }),
                headers: {
                    'X-My-Custom-Header': 'value-v',
                    'content-type': 'application/json'
                }
            }).then(response =>{
               if (response.status < 200 || response.status > 300) {
                   this.setState({error: response.statusText })
               }
            })
    }

    handleAddRequest(event) {
        event.preventDefault();
       this.handleRequest('friend');
    }
    handleDelete(event) {
        event.preventDefault();
        this.handleRequest('delete');
    }

    handleAdd(event) {
        event.preventDefault();
        this.handleRequest('request');
        this.setState({
                   label: 'request',
                   disabled: true
               })
    }

     setButtonForRequests(){
      let buttonAdd;
     let buttonDelete;

     buttonAdd = < Add onClick = { this.handleAddRequest } label = { 'Accept' } />;
     buttonDelete = < Delete onClick = { this.handleDelete } />;
     return(buttonAdd);


    }
    render() {
        const{
             Friends,
             label,
             disabled,
             error
             }=this.state;
        let buttonAdd;
        let buttonDelete;
        let buttonGetProfile;
        const emailFriend=this.props.emailFriend;
        const fromRequest = this.props.fromRequest;

           if(error!=null){
             return(
                  < p > { error.message } < /p>
             )
           }


           if(!fromRequest&&!this.props.fromProfile){
                       buttonGetProfile = < GetProfile onClick = {this.handleGetProfile}  />;
                       if (Friends.indexOf(emailFriend) == -1) {
                          buttonAdd = < Add onClick = { this.handleAdd} label = { label } disabled = { disabled } />;
                       } else {
                           buttonDelete = < Delete onClick = {this.handleDelete } />;
                       }
           }
           if (fromRequest) {
                       buttonAdd = < Add onClick = { this.handleAddRequest } label = { 'Accept' } />;
                       buttonDelete = < Delete onClick = { this.handleDelete } />;;
                   }
           if(this.props.fromProfile){
                       buttonAdd = < Add onClick = { this.handleAdd} label = { label } disabled = { disabled } />;
           }
       return (
       <form>
       <div>
        {buttonAdd}
        {buttonDelete}
        {buttonGetProfile}
        </div>
        </form>
       );
    }
}

         function GetProfile(props){
           return (
              <button onClick={props.onClick}>
                GetProfile
              </button>
           );
         }

         function Add(props) {
           return (
             <button onClick={props.onClick} disabled={props.disabled} >
             {props.label}
             </button>
           );
         }
         function Delete(props) {
           return (
             <button onClick={props.onClick}>
               Delete
             </button>
           );
         }
export default withRouter(UserActivities);