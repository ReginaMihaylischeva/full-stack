import React, { Component } from 'react';


class GetMyPosts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            isFetching: false,
            content: '',
            name: '',
            surname: '',
            id: this.props.id
        };
        this.handleSubmitRemove = this.handleSubmitRemove.bind(this);
        this.handleSubmitShow = this.handleSubmitShow.bind(this);
    }
    handleSubmitRemove(event) {
        this.setState({
            isFetching: false
        });
    }

    handleSubmitShow(event) {
        event.preventDefault();
        fetch('/getMyPosts', {
            method: 'post',
            body: JSON.stringify({
                UserId: this.props.id
            }),
            headers: {
                'X-My-Custom-Header': 'value-v',
                'content-type': 'application/json'
            }
        }).then(response => response.json()).then((responseJson) => {
            this.setState({
                posts: responseJson,
                isFetching: true
            })
        })
    }




    render() {
        const isFetching = this.state.isFetching;
        let button;
        if (isFetching) {
            button = < RemoveButton onClick = {this.handleSubmitRemove}/>;
        } else {
            button = < ShowButton onClick = { this.handleSubmitShow } />;
        }

        return (
            <form >
            < div >
            < RenderFromProps posts = {this.state.posts}isFetching = { this.state.isFetching }/>
            </div>
            { button}
            </form>
        )
    }


}

function RenderFromProps(props) {
    const posts = props.posts;
    const isFetching = props.isFetching;
    if (isFetching) {
        return (
            posts.map((dpElem, index) => (
            < div key = { index } >
                <h1 > Post < /h1>
                <form >
                <p>{dpElem.date.split('T')[0]}</p>
                <p>{dpElem.date.split('T')[1].substring(8, -1)}</p>
                <p>Content:  {dpElem.content }</p>

                < /form>
               </div>
            ))
        )
    }
    return null;
}

function ShowButton(props) {
    return (
       <button onClick = {props.onClick} >
        Show  posts
        </button>
    );
}

function RemoveButton(props) {
    return (
      <button onClick = { props.onClick } >
        Remove  posts
        </button>
    );
}
export default GetMyPosts;