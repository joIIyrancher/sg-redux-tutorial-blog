import React from 'react';
// Route object is what we use to define a match between URL and component
// react-router tricks the user to think they are going to different pages
// but they are always on the same page
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import PostsIndex from './containers/posts_index';
import PostsNew from './containers/posts_new';
import PostsShow from './containers/posts_show';

// const Greeting = () => {
//   return <div>Hello there</div>;
// };

// if path is '/', then show App and show PostsIndex
// 

export default (
  <Route path="/" component={App}>
    <IndexRoute component={PostsIndex} />
    <Route path="posts/new" component={PostsNew} />
    <Route path="posts/:id" component={PostsShow} />
  </Route>
);

// this.props.params.id   -- this is done by react-router