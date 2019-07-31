import React, {
     Component
 }
 from 'react';


 class Posts extends Component {
     constructor(props) {
         super(props);

         this.state = {
             posts: [],
             isFetching: false,
             content: '',
             name: '',
             surname: '',
             feed: [],
             count: 3,
             splicePosts: []

         };
         this.handleSubmitRemove = this.handleSubmitRemove.bind(this);
         this.handleSubmitShow = this.handleSubmitShow.bind(this);
         this.handleLoadMore = this.handleLoadMore.bind(this);
     }

     handleSubmitRemove(event) {
         event.preventDefault();
         this.setState({
             isFetching: false
         });
     }

     handleLoadMore(event) {
         event.preventDefault();
         if (this.state.feed.length < this.state.count + 3) {
             this.setState({
                 splicePosts: this.state.feed.slice(0).reverse(),
             })
         } else {
             this.setState({
                 splicePosts: this.state.feed.slice(this.state.feed.length - (this.state.count + 3)).reverse(),
                 count: this.state.count + 3
             })
         }
     }

     componentWillMount() {
         fetch('/getPosts', {
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
                 isFetching: false,

             })
         })
     }

     handleSubmitShow(event) {
         event.preventDefault();
         this.setState({
             isFetching: true
         })
         const feed = [];
         this.state.posts.map((dpElem, index) => (
             dpElem.map((item, i) => (
                 feed.push(item)
             ))))


         this.setState({
             feed: feed,
             splicePosts: feed.slice(this.state.feed.length - this.state.count).reverse()
         });
     }


    render() {
        const isFetching = this.state.isFetching;
        let button;
        let loadMore;
        if (isFetching) {
            button = < RemoveButton onClick = {this.handleSubmitRemove} label = { 'Remove Feed' }/>;
        } else {
            button = < ShowButton onClick = { this.handleSubmitShow } label = { 'Show Feed' }/>;
        }
         loadMore = < LoadMoreButton onClick = { this.handleLoadMore }  />;
        return (
            <form >
            < div >
            < RenderFromProps splicePosts = {this.state.splicePosts} isFetching = { this.state.isFetching } loadMore={loadMore}/>
            </div>
            { button}
            </form>
        )
    }


}

function RenderFromProps(props) {
    const {
           splicePosts,
           isFetching,
           loadMore
          }=props;
        const posts= splicePosts.map((dpElem, index) => (
     < div key = { index } >
     <h2 > Post < /h2>
     <form >
      <div>
         <p>{dpElem.date.split('T')[0]}</p>
         <p>{dpElem.date.split('T')[1].substring(8, -1)}</p>
          </div>
     <div>
     <p>Name: {dpElem.User.name}</p>
     </div>
      <p>Content: {dpElem.content } </p>
      </form>
       </div>
       ));
    if (!isFetching) {
    return null;
    }
    return(
          <div>
          {posts}
         {loadMore}
          </div>);

}

function ShowButton(props) {
    return (
       <button onClick = {props.onClick} >
        Show feed
        </button>
    );
}

function RemoveButton(props) {
     return (
       <button onClick = { props.onClick } >
         Remove feed
         </button>
     );
 }
     function Button(props) {
              return (
                  < button onClick = { props.onClick } >
                   {props.label}
                  </button>
                  );
              }


 function LoadMoreButton(props) {
     return (
       <button onClick = { props.onClick } >
       Load more
         </button>
     );
 }
export default Posts;