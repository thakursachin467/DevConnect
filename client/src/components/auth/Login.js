import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginuser } from '../../actions/authActions';
import TextField from '../Common/textFieldGroup';

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
    componentDidMount() {
        if (this.props.isAuth.isAuthanticated) {
            this.props.history.push('/dashboard');
        }
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
                            <div className="shadow-sm p-3 mb-3 bg-light rounded">
                                <h1 className="display-4 text-center">Log In</h1>
                                <p className="lead text-center">Sign in to your DevConnect account</p>
                            </div>

                            <form onSubmit={this.onSubmit} className="shadow p-3 mb-5 bg-white rounded">
                                <TextField
                                    placeholder="Email Address"
                                    type="email" name="email"
                                    value={this.state.email}
                                    onChange={this.onChange}
                                    error={errors.email} />
                                <TextField
                                    placeholder="Password"
                                    type="password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.onChange}
                                    error={errors.password} />
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
