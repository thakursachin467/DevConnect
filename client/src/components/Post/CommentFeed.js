import React, { Component } from 'react'
import propType from 'prop-types'
import CommentItem from './CommentItem';
class CommentFeed extends Component {
    render() {
        const { comment, postId } = this.props
        return comment.map(comment => <CommentItem key={comment._id} comment={comment} postId={postId} />)
    }
}

CommentFeed.propType = {
    comment: propType.array.isRequired,
    postId: propType.string.isRequired
}


export default CommentFeed;