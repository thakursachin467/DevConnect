import React, { Component } from "react";
import { connect } from "react-redux";
import propType from "prop-types";
import Moment from "react-moment";
import { deleteEducation } from "../../actions/profileAction";

class Education extends Component {
  constructor(props) {
    super(props);
  }

  onDelete(id) {
    this.props.deleteEducation(id);
  }

  render() {
    const education = this.props.education.map(edu => (
      <tr key={edu._id}>
        <td>{edu.school}</td>
        <td>{edu.degree}</td>
        <td>
          <Moment format="DD/MM/YYYY">{edu.from}</Moment> -{" "}
          {edu.current ? (
            <span>Now</span>
          ) : (
            <span>
              <Moment format="DD/MM/YYYY">{edu.to}</Moment>
            </span>
          )}{" "}
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={this.onDelete.bind(this, edu._id)}
          >
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-4 mt-4">Education Credentials</h4>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>School</th>
              <th>Degree</th>
              <th>Years</th>
              <th />
            </tr>
          </thead>
          <tbody>{education}</tbody>
        </table>
      </div>
    );
  }
}

Education.propType = {
  deleteEducation: propType.func.isRequired
};

export default connect(
  null,
  { deleteEducation }
)(Education);
