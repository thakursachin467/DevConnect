import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser } from './actions/authActions';
import Navbar from './components/Layouts/Navbar';
import Footer from './components/Layouts/Footer';
import Landing from './components/Layouts/Landing';
import Login from './components/auth/Login';
import { Provider } from 'react-redux';
import store from './store';
import Register from './components/auth/Register';

/**
 * ! check for authToken 
 */
if (localStorage.jwttoken) {
  /**
   * ! set auth token header
   */
  setAuthToken(localStorage.jwttoken);
  /**
   * ! docode token and get userinfo
   */
  const userData = jwt_decode(localStorage.jwttoken);
  /**
   * ! set user and isAuthenticate
   */

  store.dispatch(setCurrentUser(userData))
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/login" component={Login}></Route>
              <Route exact path="/register" component={Register}></Route>
            </div>

            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
