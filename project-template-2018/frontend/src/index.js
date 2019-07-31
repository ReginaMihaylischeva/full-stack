import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Router  } from 'react-router'

import NavBar from './components/NavBar';
import Registration from './components/Registration';
import Login from './components/Login';
import Profile from './components/Profile';
//import { Provider } from 'react-redux';
//import { createStore, applyMiddleware, combineReducers } from 'redux';
//import thunk from 'redux-thunk';
//import * as reducers from './reducer';
//const store = createStore(combineReducers(reducers), applyMiddleware(thunk));
//<Provider store={store}>


render(

<BrowserRouter >
<div>
    <Route exact  path='/profile/:id' component={Profile}/>
    <Route path='/login' component={Login}/>
    <Route path='/registrationUser' component={Registration}/>
    <Route path="/" component={ NavBar }/>
 </div>
</BrowserRouter >
  , document.getElementById('app')

);
