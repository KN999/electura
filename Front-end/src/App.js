import React from 'react';
import Login from './Login.js';
import Register from './Register.js'
import Homepage from './Homepage.js'
import Dashboard from './Dashboard.js'
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
        <Route exact path='/' component={Homepage} />
        <Route path='/Login' component={Login} />
        <Route path='/Register' component={Register} />
        <PrivateRoute authed={Boolean(localStorage.getItem('Token'))} exact path='/Dashboard' component={Dashboard} />
    </Router>
  );
}

function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => Boolean(localStorage.getItem('Token'))
        ? <Component {...props} />
        : <Redirect to={{pathname: '/Login', state: {from: props.location}}} />}
    />
  )
}

export default App;
