import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/Layouts/Navbar'
import Footer from './components/Layouts/Footer'
import Landing from './components/Layouts/Landing'
import Login from './components/auth/Login';
import Register from './components/auth/Register';



class App extends Component {
  render() {
    return (
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
    );
  }
}

export default App;
