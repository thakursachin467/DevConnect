import React, { Component } from 'react'
import propTypes from 'prop-types';
import { Link } from 'react-router-dom'
import isEmpty from '../../utils/isDashEmpty';

class Profile extends Component {
    render() {
        const { profile } = this.props
        return (
            <div className="card card-body bg-light mb-3">
                <div className="row">
                    <div className="col-2">
                        <img src={profile.user.avatar} className="rounded-circle"></img>

                    </div>
                    <div className="col-lg-6 col-md-4 col-8">
                        <h3><Link to={`/profile/${profile.handle}`} className="text-dark">{profile.user.name}</Link></h3>
                        <p>
                            {profile.status} {isEmpty(profile.company) ? null : <span>at {profile.company}</span>}
                        </p>
                        <p>
                            {isEmpty(profile.location) ? null : <span>{profile.location}</span>}
                        </p>
                        <Link to={`/profile/${profile.handle}`} className="btn btn-info">View Profile</Link>

                    </div>
                    <div className="col-md-4 d-none d-md-block">
                        <h4>Skill Set</h4>
                        <ul className="list-group">
                            {
                                profile.skills.slice(0, 4).map((skill, index) => (
                                    <li key={index} className="list-group-item"><i className="fa fa-check pr-1"></i> {skill}</li>
                                ))
                            }

                        </ul>

                    </div>

                </div>

            </div>
        )
    }
}

Profile.propTypes = {
    profile: propTypes.object.isRequired
}


export default Profile;