import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import AuthRoute from './util/AuthRoute';
import home from './pages/home';
import register from './pages/register';
import login from './pages/login';
import { Provider } from 'react-redux';
import store from './redux/store';
import axios from 'axios';
import { getUserData } from './redux/actions/userActions';

axios.defaults.baseUrl = 'http://localhost:5000/z-dev-82607/us-central1/api'

store.dispatch(getUserData())

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="container">
            <Switch>
              <Route path="/" exact component={home}/>
              <AuthRoute exact path="/register" component={register}/>
              <AuthRoute exact path="/login" component={login}/>
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}


export default App;
