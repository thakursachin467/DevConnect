import React, { Component } from 'react'
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import TextFieldGroup from '../Common/textFieldGroup';

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

        // this.onChange = this.onChange.bind(this);
        //this.onSubmit = this.onSubmit.bind(this);
    }
    render() {
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



                        </div>

                    </div>

                </div>

            </div>
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



export default connect(mapStateToProps)(CreateProfile);
