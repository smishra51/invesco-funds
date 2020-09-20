import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import httpStatus from './config/constant';
import axios from 'axios';
import { userActions } from './actions';
import {history} from './helpers/history';

const store = createStore(reducer, applyMiddleware(thunk))

const app = (
    <Provider store={store}>
        <App />
    </Provider>
  );

  /** Intercept any unauthorized request.
* dispatch logout action accordingly **/
const {dispatch} = store; // direct access to redux store.
axios.interceptors.response.use(
  response => response,
  error => {
    const {status} = error.response;
    if (status === httpStatus.UNAUTHORIZED || status === httpStatus.FORBIDDEN) {
      dispatch(userActions.logout());
    }
    if (status === httpStatus.FORBIDDEN) {
        history.push('/error')
      }
   return Promise.reject(error);
 }
);
ReactDOM.render(app, document.getElementById('root'));
