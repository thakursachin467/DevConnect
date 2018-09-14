import React, { Component } from 'react'
import { connect } from 'react-redux'
import propType from 'prop-types'
import Moment from 'react-moment';
import { deleteExperience } from '../../actions/profileAction';

class Experience extends Component {
    constructor(props) {
        super(props);

    }

    onDelete(id) {

        this.props.deleteExperience(id)
    }

    render() {
        const experience = this.props.experience.map((exp) => (
            <tr key={exp._id}>
                <td>{exp.company}</td>
                <td>{exp.title}</td>
                <td><Moment format="DD/MM/YYYY">{exp.from}</Moment> - {exp.current ? 'Now' : <Moment format="DD/MM/YYYY"> {exp.to} </Moment>} </td>
                <td><button className="btn btn-danger" onClick={this.onDelete.bind(this, exp._id)}>Delete</button></td>
            </tr>
        ));
        return (
            <div >

                <h4 className="mb-4">Experience Credentials</h4>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Company</th>
                            <th>Title</th>
                            <th>Years</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {experience}
                    </tbody>
                </table>


            </div>
        )
    }
}

Experience.propType = {
    deleteExperience: propType.func.isRequired
}


export default connect(null, { deleteExperience })(Experience);