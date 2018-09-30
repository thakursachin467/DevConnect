import React, { Component } from "react";
import { connect } from "react-redux";
import propTypes from "prop-types";
import { deleteComment } from "../../actions/postAction";
import Moment from "react-moment";
import { Link } from "react-router-dom";

class CommentItem extends Component {
  onDeleteClick(postId, commentId) {
    this.props.deleteComment(commentId, postId);
  }
  render() {
    const { comment, postId, auth } = this.props;
    const imgUrl = comment.avatar;
    const divStyle = {
      backgroundImage: "url(" + imgUrl + ")"
    };
    return (
      <div>
        <div className="comment-wrap">
          <div className="photo">
            <div className="avatar" style={divStyle} />
          </div>
          <div className="comment-block">
            <p>
              <Link to={`/profile/user/${comment.user}`} className="text-dark">
                {comment.name}
              </Link>
            </p>
            <p className="comment-text">{comment.text}</p>
            <div className="bottom-comment">
              <div className="comment-date">
                Replied <Moment fromNow>{comment.date}</Moment>
              </div>
              {comment.user === auth.user.id ? (
                <ul className="comment-actions">
                  <li
                    className="complain"
                    onClick={this.onDeleteClick.bind(this, postId, comment._id)}
                  >
                    Delete
                  </li>
                </ul>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CommentItem.propTypes = {
  comment: propTypes.object.isRequired,
  postId: propTypes.string.isRequired,
  deleteComment: propTypes.func.isRequired,
  auth: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteComment }
)(CommentItem);
