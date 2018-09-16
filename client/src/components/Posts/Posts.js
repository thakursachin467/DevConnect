import React, { Component } from 'react'
import { connect } from 'react-redux';
import propType from 'prop-types';
import PostForm from './PostForm';
import Loading from '../Common/Loading';
import { getPost } from '../../actions/postAction';
import PostFeed from './PostFeed'
class Posts extends Component {

    componentDidMount() {
        this.props.getPost()
    }
    render() {
        const { posts, loading } = this.props.post
        let postContent;
        if (posts === null || loading) {
            postContent = <Loading />
        } else {
            postContent = <PostFeed posts={posts} />
        }
        return (
            <div className="feed">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <PostForm />
                            {postContent}
                        </div>

                    </div>

                </div>

            </div>
        )
    }
}

Posts.propType = {
    post: propType.object.isRequired,
    getPost: propType.func.isRequired
}

const mapStateToProps = (state) => ({
    post: state.post
})

export default connect(mapStateToProps, { getPost })(Posts);