import React, { Component } from 'react'
import { connect } from 'react-redux'
import propTypes from 'prop-types';
import Loading from '../Common/Loading';
import { getProfiles } from '../../actions/profileAction';
import Profile from './Profile';
class Profiles extends Component {
    componentDidMount() {
        this.props.getProfiles()
    }
    render() {
        const { profiles, loading } = this.props.profile;
        let profileItems;
        if (profiles === null || loading) {
            profileItems = <Loading />
        } else {
            if (profiles.length > 0) {
                profileItems = profiles.map((profile) => (
                    <Profile key={profile._id} profile={profile} />
                ))
            } else {
                profileItems = <h4>No Profiles Found</h4>
            }
        }
        return (
            <div className="profiles">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4 text-center">
                                Developer Profiles
                            </h1>
                            <p className="lead text-center">Browse and connect with Developers</p>
                            {profileItems}
                        </div>

                    </div>

                </div>

            </div>
        )
    }
}

Profiles.propTypes = {
    getProfiles: propTypes.func.isRequired,
    profile: propTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    profile: state.profile
})

export default connect(mapStateToProps, { getProfiles })(Profiles);