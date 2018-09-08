import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import propTypes from 'prop-types'
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import TextField from '../Common/textFieldGroup';



class Register extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            errors: {

            }
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount() {
        if (this.props.auth.isAuthanticated) {
            this.props.history.push('/dashboard');
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors })
        }
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })

    }
    onSubmit(e) {
        e.preventDefault();
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        }

        this.props.registerUser(newUser, this.props.history);



    }
    render() {
        const { errors } = this.state

        return (
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <div className="shadow-sm p-3 mb-3 bg-light rounded">
                                <h1 className="display-4 text-center">Sign Up</h1>
                                <p className="lead text-center">Create your DevConnect account</p>
                            </div>

                            <form onSubmit={this.onSubmit} className="shadow p-3 mb-5 bg-white rounded">
                                <TextField
                                    placeholder="Name"
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.onChange}
                                    type="text"
                                    error={errors.name} />

                                <TextField
                                    placeholder="Email"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.onChange}
                                    type="email"
                                    error={errors.email} info="This site uses Gravatar so if you want a profile image, use a Gravatar email" />


                                <TextField
                                    placeholder="password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.onChange}
                                    type="password"
                                    error={errors.password} />


                                <TextField
                                    placeholder="Confirm password"
                                    name="password2"
                                    value={this.state.password2}
                                    onChange={this.onChange}
                                    type="password"
                                    error={errors.password2} />
                                <input type="submit" className="btn btn-info btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

Register.propTypes = {
    registerUser: propTypes.func.isRequired,
    auth: propTypes.object.isRequired,
    errors: propTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
