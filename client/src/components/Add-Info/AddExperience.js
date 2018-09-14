import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../Common/textFieldGroup';
import TextArea from '../Common/TextAreaGroup';
import propTypes from 'prop-types'
import { addExperience } from '../../actions/profileAction'

class AddExperience extends Component {
    constructor(props) {
        super(props);
        this.state = {
            company: '',
            title: '',
            experience: '',
            location: '',
            from: '',
            to: '',
            current: false,
            description: '',
            errors: {},
            disabled: false
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCheck = this.onCheck.bind(this);
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
        e.preventDefault()
        const expData = {
            company: this.state.company,
            title: this.state.title,
            experience: this.state.experience,
            location: this.state.location,
            from: this.state.from,
            to: this.state.to,
            current: this.state.current,
            description: this.state.description
        }
        this.props.addExperience(expData, this.props.history)

    }
    onCheck(e) {
        this.setState({
            disabled: !this.state.disabled,
            current: !this.state.current
        })
    }
    render() {
        const { errors } = this.state
        return (
            <div className="add-experience">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to='/dashboard' className="btn btn-light">Go Back</Link>
                            <h1 className="display-5 text-center">Add Experience</h1>
                            <p className="lead text-center">Add any experience you have had in the past or present.</p>
                            <small className="d-block pb-3">* means required</small>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    placeholder="* company"
                                    name="company"
                                    value={this.state.company}
                                    onChange={this.onChange}
                                    error={errors.company}
                                    info="Tell us your company name"
                                />
                                <TextFieldGroup
                                    placeholder="* job title"
                                    name="title"
                                    value={this.state.title}
                                    onChange={this.onChange}
                                    error={errors.title}
                                    info="Tell us you job title"
                                />
                                <TextFieldGroup
                                    placeholder="Location"
                                    name="location"
                                    value={this.state.location}
                                    onChange={this.onChange}
                                    error={errors.location}
                                    info="Tell us your job location"
                                />
                                <h6>From Date</h6>

                                <TextFieldGroup
                                    placeholder="from"
                                    name="from"
                                    type="date"
                                    value={this.state.from}
                                    onChange={this.onChange}
                                    error={errors.from}
                                    info="Tell us when you started working here"
                                />
                                <h6>To Date</h6>
                                <TextFieldGroup
                                    placeholder="to"
                                    name="to"
                                    type="date"
                                    value={this.state.to}
                                    onChange={this.onChange}
                                    error={errors.to}
                                    disabled={this.state.disabled ? 'disabled' : ''}
                                    info="Have you left your job here?"
                                />
                                <div className="form-check mb-4">
                                    <input type="checkbox"
                                        className="form-check-input"
                                        name="current"
                                        value={this.state.current}
                                        checked={this.state.current}
                                        onChange={this.onCheck}
                                        id="current"

                                    />
                                    <label htmlFor="current" className="form-check-label">Current Job</label>


                                </div>
                                <TextArea
                                    placeholder="Job Description"
                                    name="description"
                                    type="description"
                                    value={this.state.description}
                                    onChange={this.onChange}
                                    error={errors.description}
                                    info="Tell us something about your job"
                                />
                                <input type="submit" value="submit" className="btn btn-info btn-block mt-4 mb-4"></input>

                            </form>

                        </div>

                    </div>

                </div>


            </div>
        )
    }
}

AddExperience.propTypes = {
    profile: propTypes.object.isRequired,
    errors: propTypes.object.isRequired,
    addExperience: propTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    profile: state.profile,
    errors: state.errors
})


export default connect(mapStateToProps, { addExperience })(withRouter(AddExperience));