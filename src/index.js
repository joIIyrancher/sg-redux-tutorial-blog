import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

// Router decides what react component to show based on the URL
// browserHistory is an object that tells Router how to interprete changes
// to the URL
// another way is to use hashHistory or memoryHistory
// hashHistory looks at anything after '#' in URL path
// http://www.blog.com/#posts/5

import { Router, browserHistory } from 'react-router';
import reducers from './reducers';
import routes from './routes';
import ReduxPromise from 'redux-promise';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={browserHistory} routes={routes} />
  </Provider>
  , document.querySelector('.container'));
