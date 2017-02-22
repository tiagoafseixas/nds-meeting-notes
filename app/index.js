import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { Provider } from 'react-redux'
import { createStore } from 'redux'

import App from './containers/App';
import MEETINGS_APP from './reducers';

let store = createStore(MEETINGS_APP);
console.log(store.getState());

injectTapEventPlugin();

render((
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={App} />
      </Router>
    </Provider>
), document.getElementById('app'));