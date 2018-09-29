import React, { Component } from "react";
import { connect } from "react-redux";
import propType from "prop-types";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { deletePost, addLike, removeLike } from "../../actions/postAction";
import Moment from "react-moment";
class PostItem extends Component {
  onDeleteClick(id) {
    this.props.deletePost(id);
  }
  onLikeClick(id) {
    this.props.addLike(id);
  }
  onUnlikeClick(id) {
    this.props.removeLike(id);
  }

  findUserLike(likes) {
    const { auth } = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const { post, auth, showActions } = this.props;
    const imgUrl = post.avatar;
    const divStyle = {
      backgroundImage: "url(" + imgUrl + ")"
    };
    return (
      <div className=" mb-3">
        <div className="row">
          <div className="comment-wrap">
            <div className="photo">
              <div className="avatar" style={divStyle} />
            </div>
            <div className="comment-block">
              <p>
                <Link to={`/profile/user/${post.user}`} className="text-dark">
                  {post.name}
                </Link>
              </p>
              <p className="comment-text">{post.text}</p>
              {showActions ? (
                <span>
                  <button
                    type="button"
                    onClick={this.onLikeClick.bind(this, post._id)}
                    className="btn btn-light mr-1"
                  >
                    <i
                      className={classnames("fas fa-long-arrow-alt-up", {
                        "text-info": this.findUserLike(post.likes)
                      })}
                    />
                    <span className="badge badge-light">
                      {post.likes.length}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={this.onUnlikeClick.bind(this, post._id)}
                    className="btn btn-light mr-1"
                  >
                    <i className="text-secondary fas fa-long-arrow-alt-down" />
                  </button>
                </span>
              ) : null}

              <div className="bottom-comment mt-3">
                <div className="comment-date">
                  <Moment fromNow>{post.date}</Moment>
                  <p className="mt-3 text-muted">
                    {post.comments.length}{" "}
                    {post.comments.length > 1
                      ? "Replies so far"
                      : "Reply so far"}
                  </p>
                </div>
                {showActions ? (
                  <ul className="comment-actions">
                    <li className="complain">
                      {" "}
                      <Link to={`/post/${post._id}`}>Comment</Link>
                    </li>
                    {post.user === auth.user.id ? (
                      <li
                        className="reply"
                        onClick={this.onDeleteClick.bind(this, post._id)}
                      >
                        Delete
                      </li>
                    ) : null}
                  </ul>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PostItem.defaultProps = {
  showActions: true
};

PostItem.propType = {
  auth: propType.object.isRequired,
  post: propType.object.isRequired,
  deletePost: propType.object.isRequired,
  addLike: propType.object.isRequired,
  removeLike: propType.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deletePost, addLike, removeLike }
)(PostItem);
