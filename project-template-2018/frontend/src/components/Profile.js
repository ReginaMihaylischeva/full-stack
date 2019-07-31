import React, {
    Component
} from 'react';

import NewPost from './NewPost';
import Posts from './Posts';
import GetMyPosts from './GetMyPosts';
import Logout from './Logout.js';
import Users from './Users';
import RequestFriendship from './RequestFriendship';
import UserActivities from './UserActivities';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: '',
            isFetching: true,
            error: null,
            content: '',
            friends: [],
            Friends: [],
            emailCurrentUser: ''
        };
    }

    updateData(value) {
        const Friends = [];
        value.map((dpElem, index) => (
            Friends.push(dpElem.email)
        ))
        this.setState({
            Friends: Friends
        });
    }
    handleRequest() {
        fetch('/me', {
                method: 'post',
                body: JSON.stringify({
                    id: this.props.match.params.id.substring(3)

                }),
                headers: {
                    'X-My-Custom-Header': 'value-v',
                    'content-type': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    if (response.status != 401) {
                        return Promise.reject(new Error(response.statusText))
                    } else {
                        this.setState({
                            isFetching: false
                        })
                        return response.json();
                    }
                }
            })
            .then(result => {
                this.setState({
                    data: result,
                    emailCurrentUser: result.email
                })
            })
            .catch(error => {
                this.setState({
                    error: error,
                })
            });

    }

    componentWillReceiveProps(nextProps) {
        if (this.props.match.params.id != nextProps.match.params.id) {
            this.handleRequest();
        }
    }



    componentWillMount() {
        this.handleRequest();
    }
    render() {
        let isFriend;
         const {
             data,
             isFetching,
             error,
             emailCurrentUser,
             Friends
         } = this.state;
        const id=this.props.match.params.id;
        const idCurrentUser = window.localStorage.getItem('rr_login');
        (Friends.indexOf(this.state.data.email) == -1) ?  isFriend=false :isFriend=true;

         if(error!=null){return(
          < p > { error.message } < /p>
         )}
         if (!isFetching) { return(
             <div >
              <h2 > { data.name } < /h2>
              < p > { data.surname} < /p>
             < /div>
         );
         }
         return (
            < form >
                           < div >
                             <h2 >Name: { data.name } < /h2>
                             < p >Surname: { data.surname} < /p>
                             < p >Email: { data.email  } < /p>
                             < p >Year: { data.year } < /p>
                            < /div>
               <div >
            < ButtonPrinting id = { id.substring(3)} updateData={this.updateData.bind(this)} email = { this.state.data.email } idCurrentUser = { idCurrentUser } isFriend={isFriend} emailCurrentUser={emailCurrentUser}/>
             </div >
             </form>
        );
    }
}






function ButtonPrinting(props) {
    const {
          email,
          id,
          idCurrentUser,
          isFriend,
          emailCurrentUser
    }=props;

    if (idCurrentUser === id) {
        return (
          < form >
            < div >
            < GetMyPosts id = {id } />
            < /div>

            < div >
            < NewPost id = {id } email = { email } />
            < /div>

            < div >
            < Posts id = {id } />
            < /div>

            < div >
            <RequestFriendship id = { id } />
            < /div>

            <div >
            < Users email = { emailCurrentUser } id = {id } updateData={props.updateData}/>
            < /div>

            < div >

            < Logout  />
            < /div>


          </form>
        );
    }
    if(isFriend){
    return (

    < div >
    < GetMyPosts id = {id } />
    < /div>
     )
    }else{
      return (

        < div >
        <UserActivities email = {emailCurrentUser } emailFriend = {email} fromProfile={true}   />
        < /div>
       )
    }
    return null;
}
export default Profile;