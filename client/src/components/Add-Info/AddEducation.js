import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../Common/textFieldGroup';
import TextArea from '../Common/TextAreaGroup';
class AddEducation extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    onSubmit(e) {
        e.preventDefault()


    }
    render() {
        return (
            <div className="add-education">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to='/dashboard' className="btn btn-light">Go Back</Link>
                            <h1 className="display-5 text-center">Add Education Details</h1>
                            <p className="lead text-center">Add your school or college details</p>
                            <small className="d-block pb-3">* means required</small>

                        </div>

                    </div>

                </div>


            </div>
        )
    }
}

export default connect()(withRouter(AddEducation));