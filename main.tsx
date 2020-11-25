import 'regenerator-runtime/runtime';
import * as React from 'react'
import ReactDOM from 'react-dom';
import { Provider, ReactReduxContext } from 'react-redux';
import { configureStore, history } from "./scripts/store";
import App from "./scripts/app";
import { Store } from 'redux';
import { ConnectedRouter } from 'connected-react-router';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css';
const rootElement = document.getElementById('root');
const store: Store = configureStore();

ReactDOM.render(
  <Provider store={store} context={ReactReduxContext}>
    <ConnectedRouter history={history} context={ReactReduxContext}>
      <App />
    </ConnectedRouter>
  </Provider>,
  rootElement
);