import React, { Component } from 'react'
import { connect } from 'react-redux';
import propType from 'prop-types';
import TextAreaGroup from '../Common/TextAreaGroup';
import { addPost } from '../../actions/postAction';

class PostForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            errors: {}
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)


    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors })
        }
    }
    onSubmit(e) {
        e.preventDefault()
        const { user } = this.props.user
        const { avatar, name } = user
        const { text } = this.state
        const post = {
            avatar,
            name,
            text
        }
        this.props.addPost(post)
        this.setState({ text: '' })
    }
    onChange(e) {

        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        const { errors, text } = this.state

        return (

            <div className="post-form mb-3">
                <div className="card card-info">
                    <div className="card-header bg-info text-white">
                        Say Something...
                    </div>
                    <div className="card-body">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <TextAreaGroup
                                    onClick={this.onClick}
                                    className="form-control form-control-lg"
                                    placeholder="Write your thoughts here...."
                                    onChange={this.onChange}
                                    name="text"
                                    value={text}
                                    error={errors.text}
                                />



                            </div>

                            <button type="submit" className="btn btn-primary btn-block">Share</button>
                        </form>

                    </div>

                </div>

            </div>
        )
    }
}

PostForm.propType = {
    errors: propType.object.isRequired,
    user: propType.object.isRequired,
    addPost: propType.func.isRequired
}

const mapStateToProps = (state) => ({
    errors: state.errors,
    user: state.auth
})


export default connect(mapStateToProps, { addPost })(PostForm);