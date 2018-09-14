import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../Common/textFieldGroup';
import TextArea from '../Common/TextAreaGroup';
import { addEducation } from '../../actions/profileAction'
import propTypes from 'prop-types'

class AddEducation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            school: '',
            degree: '',
            fieldofstudy: '',
            from: '',
            to: '',
            degree: '',
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
        const eduData = {
            school: this.state.school,
            degree: this.state.degree,
            fieldofstudy: this.state.fieldofstudy,
            from: this.state.from,
            to: this.state.to,
            current: this.state.current,
            description: this.state.description
        }
        this.props.addEducation(eduData, this.props.history);


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
            <div className="add-education">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to='/dashboard' className="btn btn-light">Go Back</Link>
                            <h1 className="display-5 text-center">Add Education Details</h1>
                            <p className="lead text-center">Add your school or college details</p>
                            <small className="d-block pb-3">* means required</small>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    placeholder="* school"
                                    name="school"
                                    value={this.state.school}
                                    onChange={this.onChange}
                                    error={errors.school}
                                    info="Tell us your school name"
                                />
                                <TextFieldGroup
                                    placeholder="* Degree or Certification"
                                    name="degree"
                                    value={this.state.degree}
                                    onChange={this.onChange}
                                    error={errors.degree}
                                    info="Degree?"
                                />
                                <TextFieldGroup
                                    placeholder="* field of study"
                                    name="fieldofstudy"
                                    value={this.state.fieldofstudy}
                                    onChange={this.onChange}
                                    error={errors.fieldofstudy}
                                    info="Tell us your field of study"
                                />


                                <h6>From Date</h6>

                                <TextFieldGroup
                                    placeholder="from"
                                    name="from"
                                    type="date"
                                    value={this.state.from}
                                    onChange={this.onChange}
                                    error={errors.from}
                                    info="Tell us when you started school here"
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
                                    info="Have you left your school here?"
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
                                    <label htmlFor="current" className="form-check-label">Current School</label>


                                </div>
                                <TextArea
                                    placeholder="Program or Certification Description"
                                    name="description"
                                    type="description"
                                    value={this.state.description}
                                    onChange={this.onChange}
                                    error={errors.description}
                                    info="Tell us something about your program"
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

AddEducation.propTypes = {
    profile: propTypes.object.isRequired,
    errors: propTypes.object.isRequired,
    addEducation: propTypes.func.isRequired
}
const mapStateToProps = (state) => ({
    errors: state.errors,
    profile: state.profile

})

export default connect(mapStateToProps, { addEducation })(withRouter(AddEducation));