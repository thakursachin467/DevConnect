import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profileAction';




class Dashboard extends Component {
    componentDidMount() {
        this.props.getCurrentProfile()
    }

    render() {

        return (
            <div>

                <div className="d-flex justify-content-center align-items-center">

                </div>
                Dashboard
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    profile: state.profile
})

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
