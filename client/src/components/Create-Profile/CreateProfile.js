import React, { Component } from 'react'
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import TextFieldGroup from '../Common/textFieldGroup';
import InputGroup from '../Common/InputGroup';
import SelectListGroup from '../Common/SelectListGroup';
import TextAreaGroup from '../Common/TextAreaGroup';
import { createProfile } from '../../actions/profileAction';
import { withRouter } from 'react-router-dom';

class CreateProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displaySocialLinks: false,
            handle: '',
            company: '',
            website: '',
            location: '',
            status: '',
            skills: '',
            githubusername: '',
            bio: '',
            twitter: '',
            facebook: '',
            linkedin: '',
            youtube: '',
            instagram: '',
            errors: {}
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.toggleSocialMedia = this.toggleSocialMedia.bind(this)
    }

    toggleSocialMedia() {
        console.log("object")
        this.setState((prevState) => ({ displaySocialLinks: !prevState.displaySocialLinks }))
    }

    onChange(e) {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value })

    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors })
        }

    }
    onSubmit(e) {
        e.preventDefault()
        const profileData = {
            handle: this.state.handle,
            company: this.state.company,
            website: this.state.website,
            location: this.state.location,
            status: this.state.status,
            skills: this.state.skills,
            githubusername: this.state.githubusername,
            bio: this.state.bio,
            twitter: this.state.twitter,
            facebook: this.state.facebook,
            linkedin: this.state.linkedin,
            youtube: this.state.youtube,
            instagram: this.state.instagram
        }
        this.props.createProfile(profileData, this.props.history)

    }
    render() {
        const { errors, displaySocialLinks } = this.state;
        let socialInputs;
        if (displaySocialLinks) {
            socialInputs = (
                <div >
                    <InputGroup
                        placeholder="twitter profile url"
                        name="twitter" icon="fab fa-twitter"
                        value={this.state.twitter}
                        onChange={this.onChange}
                        error={errors.twitter} />

                    <InputGroup
                        placeholder="facebook profile url"
                        name="twitter" icon="fab fa-facebook"
                        value={this.state.facebook}
                        onChange={this.onChange}
                        error={errors.facebook} />
                    <InputGroup
                        placeholder="linkedin profile url"
                        name="twitter" icon="fab fa-linkedin"
                        value={this.state.linkedin}
                        onChange={this.onChange}
                        error={errors.linkedin} />

                    <InputGroup
                        placeholder="youtube profile url"
                        name="twitter" icon="fab fa-youtube"
                        value={this.state.youtube}
                        onChange={this.onChange}
                        error={errors.youtube} />
                    <InputGroup
                        placeholder="instagram profile url"
                        name="twitter" icon="fab fa-instagram"
                        value={this.state.instagram}
                        onChange={this.onChange}
                        error={errors.instagram} />

                </div>
            )

        }
        /**
         * ? select option for status
         */
        const option = [{
            label: '* Select Professional Status', value: 0
        }, { label: 'Developer', value: 'Developer' }, { label: 'Junior Developer', value: 'Junior Developer' }, { label: 'Web Developer', value: 'Web Developer' }, { label: 'Android Developer', value: 'Android Developer' }, { label: 'Teacher', value: 'Teacher' }, { label: 'Data Analyst', value: 'Data Analyst' }, { label: 'Software Tester', value: 'Software Tester' }, { label: 'Human Resources', value: 'Human Resources' }, { label: 'Intern', value: 'Intern' }, { label: 'Student', value: 'Student' }, { label: 'other', value: 'other' }]
        return (
            <div className="create-profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Create Your Profile</h1>
                            <p className="lead text-center">
                                Please add some info to create your awesome DevConnect Profile
                                </p>
                            <small className="d-black pd-3 text-muted">* means the fields is required</small>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    placeholder="* profile Handle"
                                    name="handle"
                                    value={this.state.handle}
                                    onChange={this.onChange}
                                    error={errors.handle}
                                    info="A Unique handle for your profile URL. e.g Yourname or nickname"
                                />
                                <SelectListGroup
                                    options={option}
                                    name='status'
                                    value={this.state.status}
                                    onChange={this.onChange}
                                    error={errors.status}
                                    info='Please enter your current job or what you do?'
                                />

                                <TextFieldGroup
                                    placeholder="company"
                                    name="company"
                                    value={this.state.company}
                                    onChange={this.onChange}
                                    error={errors.company}
                                    info="Please add your company name or college name(if student)."
                                />
                                <TextFieldGroup
                                    placeholder="website"
                                    name="website"
                                    value={this.state.website}
                                    onChange={this.onChange}
                                    error={errors.website}
                                    info="Please add your website."
                                />

                                <TextFieldGroup
                                    placeholder="location"
                                    name="location"
                                    value={this.state.location}
                                    onChange={this.onChange}
                                    error={errors.location}
                                    info="Please add your location."
                                />

                                <TextFieldGroup
                                    placeholder="* skills"
                                    name="skills"
                                    value={this.state.skills}
                                    onChange={this.onChange}
                                    error={errors.skills}
                                    info="Please add your skills as comma separated (e.g Java,JavaScript,HTML,CSS)."
                                />

                                <TextFieldGroup
                                    placeholder="github username"
                                    name="github"
                                    value={this.state.github}
                                    onChange={this.onChange}
                                    error={errors.github}
                                    info="Please add your github username. It will add latest repos to your profile"
                                />

                                <TextAreaGroup
                                    placeholder="short bio"
                                    name="bio"
                                    value={this.state.bio}
                                    onChange={this.onChange}
                                    error={errors.bio}
                                    info="Please tell us something about you."
                                />

                                <div className="mb-3">
                                    <button
                                        type="button"
                                        className="btn btn-light" onClick={this.toggleSocialMedia}
                                    >{displaySocialLinks ? 'Remove' : 'Add'} Social Media Links</button>
                                    <span className="text-muted ml-3">Optional</span>
                                </div>
                                {socialInputs}

                                <input type="submit" value="submit" className="btn btn-info btn-block mb-3"></input>

                            </form>



                        </div>

                    </div>

                </div>

            </div >
        )
    }
}

CreateProfile.propTypes = {
    profile: propTypes.object.isRequired,
    errors: propTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    profile: state.profile,
    errors: state.errors
})



export default withRouter(connect(mapStateToProps, { createProfile })(CreateProfile));
