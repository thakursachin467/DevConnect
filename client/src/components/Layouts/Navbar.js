import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions'
import LoadingBar from 'react-redux-loading-bar'
class Navbar extends Component {
    onLogoutClick(e) {
        e.preventDefault();
        this.props.logoutUser();
    }
    render() {
        const { isAuthanticated, user } = this.props.auth;
        const authLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <a href="" className="nav-link" onClick={this.onLogoutClick.bind(this)}>
                        <img
                            className="rounded-circle"
                            src={user.avatar} style={{ width: "25px", marginRight: "5px" }} alt={user.name} title="You must have gravatar connected to your email to display image">
                        </img>{' '}
                        Logout

                    </a>
                </li>
            </ul>

        )

        const guestLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/register">Sign Up</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                </li>
            </ul>

        )
        const loading = this.props.profile.loading ? <div className="mb-1">
            <LoadingBar />
        </div> : '';
        return (

            <Fragment>
                {loading}
                <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
                    <div className="container">
                        <Link className="navbar-brand" to="/">DevConnect</Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="mobile-nav">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/profiles"> Developers
                    </Link>
                                </li>
                            </ul>
                            {isAuthanticated ? authLinks : guestLinks}


                        </div>
                    </div>
                </nav>

            </Fragment>

        )
    }
}

Navbar.propTypes = {
    logoutUser: propTypes.func.isRequired,
    auth: propTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps, { logoutUser })(Navbar);