import React, { Component } from 'react'
import { connect } from 'react-redux';
import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfileCred from './ProfileCred';
import ProfileGithub from './ProfileGithub';
import propTypes from 'prop-types';
import Loading from '../Common/Loading';
import { Link } from 'react-router-dom';
import { getProfileByHandle } from '../../actions/profileAction';
class Profile extends Component {
    componentDidMount() {
        if (this.props.match.params.handle) {
            this.props.getProfileByHandle(this.props.match.params.handle)
        }
    }
    render() {
        const { profile, loading } = this.props.profile;
        let profileContent;
        if (profile === null || loading) {
            profileContent = <Loading />
        } else {
            profileContent = (
                <div>
                    <div className="row">
                        <div className="col-md-6">
                            <Link to='/profiles' className="btn btn-light mb-3 float-left">Back To Profiles</Link>
                            <div className="col-md-6">

                            </div>

                        </div>

                    </div>
                    <div>
                        <ProfileHeader profile={profile} />
                        <ProfileAbout profile={profile} />
                        <ProfileCred education={profile.education} experience={profile.experience} />

                        {
                            profile.githubusername ? <ProfileGithub username={profile.githubusername} /> : null
                        }


                    </div>
                </div>
            )
        }
        return (
            <div className="profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            {profileContent}

                        </div>

                    </div>

                </div>

            </div>
        )
    }
}

Profile.propTypes = {
    profile: propTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    profile: state.profile
})

export default connect(mapStateToProps, { getProfileByHandle })(Profile);