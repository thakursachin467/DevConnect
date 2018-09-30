import React, { Component } from "react";
import { Link } from "react-router-dom";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { Image } from "semantic-ui-react";
import Logo from "../../img/logo2.png";
class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthanticated) {
      this.props.history.push("/dashboard");
    }
  }
  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">
                  <img src={Logo} style={{ height: "250px", width: "250px" }} />
                </h1>
                <p className="lead"> Connect to Developers Around the World </p>
                <hr />
                <Link to="/register" className="btn btn-lg btn-info mr-2">
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

propTypes.Landing = {
  auth: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
