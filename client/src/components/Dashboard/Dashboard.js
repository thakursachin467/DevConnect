import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { getCurrentProfile } from '../../actions/profileAction';
import propTypes from 'prop-types';
import Loading from '../Common/Loading';



class Dashboard extends Component {
    componentDidMount() {
        this.props.getCurrentProfile()
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
                dashboardContent = <h1>TODO:display profile</h1>
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
    getCurrentProfile: propTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
