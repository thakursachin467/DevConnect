import React, { Component } from 'react'
import { connect } from 'react-redux';
import propType from 'prop-types';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

class PostItem extends Component {
    onDeleteClick(id) {
        console.log(id)

    }
    render() {
        const { post, auth } = this.props
        return (
            <div className="card card-body mb-3">
                <div className="row">
                    <div className="col-md-2">
                        <a href="profile.html">
                            <img className="rounded-circle d-none d-md-block" src={post.avatar}
                                alt={post.name} />
                        </a>
                        <br />
                        <p className="text-center">{post.name}</p>
                    </div>
                    <div className="col-md-10">
                        <p className="lead">{post.text}</p>
                        <button type="button" className="btn btn-light mr-1">
                            <i className="text-info fas fa-thumbs-up"></i>
                            <span className="badge badge-light">{post.likes.length}</span>
                        </button>
                        <button type="button" className="btn btn-light mr-1">
                            <i className="text-secondary fas fa-thumbs-down"></i>
                        </button>
                        <Link to={`/posts/${post._id}`} className="btn btn-info mr-1">
                            Comments
            </Link>
                        {
                            post.user === auth.user.id ? (
                                <button type="button" onClick={this.onDeleteClick.bind(this, post._id)} className="btn btn-danger mr-1">
                                    <i className="fas fa-times"></i>
                                </button>
                            ) : null
                        }

                    </div>

                </div>
            </div>
        )
    }
}

PostItem.propType = {
    auth: propType.object.isRequired,
    post: propType.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})


export default connect(mapStateToProps)(PostItem);