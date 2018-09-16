import React, { Component } from 'react'
import { getSinglePost } from '../../actions/postAction';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import propTypes from 'prop-types';
import Loading from '../Common/Loading';
import PostItem from '../Posts/PostItems';
import AddComment from './CommentForm';
import CommentFeed from './CommentFeed';

class Post extends Component {
    componentDidMount() {
        this.props.getSinglePost(this.props.match.params.id)
    }
    render() {
        const { post, loading } = this.props.post
        let postContent;
        if (post === null || loading || Object.keys(post).length === 0) {
            postContent = <Loading />

        } else {
            postContent = <div>
                <PostItem post={post} showActions={false} />
                <AddComment postId={post._id} />
                <CommentFeed postId={post._id} comment={post.comments} />
            </div>
        }
        return (
            <div className="post">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <Link to="/feed" className="btn btn-light mb-3">Back to Posts</Link>
                            {postContent}
                        </div>

                    </div>

                </div>
            </div>
        )
    }
}
Post.propTypes = {
    getSinglePost: propTypes.func.isRequired,
    post: propTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    post: state.post

})


export default connect(mapStateToProps, { getSinglePost })(Post);
