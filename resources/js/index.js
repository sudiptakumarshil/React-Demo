import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch,IndexRoute } from "react-router-dom";
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './rootReducer';
import { createBrowserHistory } from "history";
import "bootstrap/dist/css/bootstrap.min.css";

import Routes from './routes';


const history = createBrowserHistory();
const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);
render(
  <Provider store={store}>
     <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </Provider>, document.getElementById('root'));
