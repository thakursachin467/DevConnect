import React, { Component } from 'react';
import axios from 'axios';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { loginuser } from '../../actions/authActions';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })

    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.isAuth.isAuthanticated) {
            this.props.history.push('/dashboard');
        }

        if (nextProps.errors) {

            this.setState({ errors: nextProps.errors })
        }
    }
    onSubmit(e) {
        e.preventDefault();
        const authUser = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.loginuser(authUser);

    }

    render() {
        const { errors } = this.state;

        return (
            <div className="login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Log In</h1>
                            <p className="lead text-center">Sign in to your DevConnect account</p>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input type="email" className={classnames('form-control form-control-lg', { 'is-invalid': errors.email })} placeholder="Email Address" name="email" value={this.state.email} onChange={this.onChange} />
                                    <div className="invalid-feedback">
                                        {errors.email}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <input type="password" className={classnames('form-control form-control-lg', { 'is-invalid': errors.password })} placeholder="Password" name="password" value={this.state.password} onChange={this.onChange} />
                                    <div className="invalid-feedback">
                                        {errors.password}
                                    </div>
                                </div>
                                <input type="submit" className="btn btn-info btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

Login.propTypes = {
    loginuser: propTypes.func.isRequired,
    errors: propTypes.object.isRequired,
    isAuth: propTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    isAuth: state.auth,
    errors: state.errors

})

export default connect(mapStateToProps, { loginuser })(Login);
