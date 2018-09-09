import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

const PrivateRoute = ({ component: Component, auth, ...rest }) => (<Route
    {...rest}
    render={props =>
        auth.isAuthanticated ? (<Component {...props} />) : <Redirect to="/login" />

    }
></Route>)

PrivateRoute.propTypes = {
    auth: propTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps)(PrivateRoute);
