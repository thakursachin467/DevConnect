import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { getCurrentProfile, deleteAccount } from '../../actions/profileAction';
import propTypes from 'prop-types';
import Loading from '../Common/Loading';
import ProfileActions from './ProfileAction';
import Experience from './Experience';
import Education from './Education';




class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.onDelectClick = this.onDelectClick.bind(this)
    }
    componentDidMount() {

        this.props.getCurrentProfile()

    }
    onDelectClick(e) {
        e.preventDefault()
        this.props.deleteAccount()

    }

    render() {
        const { user } = this.props.auth;
        const { profile, loading } = this.props.profile;
        let dashboardContent;
        if (profile === null || loading) {
            dashboardContent = <Loading />
        } else {
            /**
             * ? check if logged in user has a profile or not
             */

            if (Object.keys(profile).length > 0) {
                dashboardContent = (
                    <div>
                        <p className="lead text-muted"> Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link></p>
                        <ProfileActions />
                        <Experience experience={profile.experience} />
                        <Education education={profile.education} />
                        {/* TODO experience and education */}
                        <div style={{ marginBottom: '60px' }}>
                            <button className="btn btn-danger" onClick={this.onDelectClick}>
                                Delete my account
                            </button>

                        </div>
                    </div>
                )
            } else {
                //user has a valid account but hasn't made a profile
                dashboardContent = (
                    <div>
                        <p className="lead text-muted"> Welcome {user.name}</p>
                        <p>You have not yet set up a profile, please add some info</p>
                        <Link to='/create-profile' className="btn btn-lg btn-info">
                            Create profile
                        </Link>
                    </div>
                )
            }
        }

        return (
            <div className="dashboard">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4">Dashboard</h1>
                            {dashboardContent}

                        </div>

                    </div>

                </div>
            </div>
        )
    }
}

Dashboard.propTypes = {
    profile: propTypes.object.isRequired,
    auth: propTypes.object.isRequired,
    getCurrentProfile: propTypes.func.isRequired,
    deleteAccount: propTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);
