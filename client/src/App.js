import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import Navbar from './components/Layouts/Navbar';
import Footer from './components/Layouts/Footer';
import Landing from './components/Layouts/Landing';
import Login from './components/auth/Login';
import { Provider } from 'react-redux';
import { clearCurrentProfile } from './actions/profileAction';
import store from './store';
import Register from './components/auth/Register';
import Dashboard from './components/Dashboard/Dashboard';
import CreateProfile from './components/Create-Profile/CreateProfile';
import PrivateRoute from './components/Common/PrivateRoute';

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

  /**
   * ? check for expired user
   */
  const currentTime = Date.now() / 1000;
  if (userData.exp < currentTime) {
    //logout the user
    store.dispatch(logoutUser());
    //clear current user
    store.dispatch(clearCurrentProfile());
    /**
     * ? clear the current profile
     */

    /**
     * ? redirect to login
     */
    window.location.href = '/login';
  }
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
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard}></PrivateRoute>
                <PrivateRoute exact path="/create-profile" component={CreateProfile}></PrivateRoute>
              </Switch>

            </div>

            <Footer />
          </div>

        </Router>
      </Provider>
    );
  }
}

export default App;
