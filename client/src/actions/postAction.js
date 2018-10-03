import {
  ADD_POST,
  DELETE_POST,
  GET_POST,
  POST_LOADING,
  GET_POSTS,
  GET_ERRORS,
  CLEAR_ERRORS
} from "./types";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import axios from "axios";

//ADD POST

export const addPost = postData => dispatch => {
  dispatch(clearErrors());
  dispatch(showLoading());
  axios
    .post("/api/posts", postData)
    .then(res => {
      dispatch({
        type: ADD_POST,
        payload: res.data
      });
      dispatch(hideLoading());
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
      dispatch(hideLoading());
    });
};

//fetch all post

export const getPost = () => dispatch => {
  dispatch(showLoading());
  dispatch(postLoading());
  axios
    .get("/api/posts")
    .then(res => {
      dispatch({
        type: GET_POSTS,
        payload: res.data
      });
      dispatch(postLoading());
      dispatch(hideLoading());
    })
    .catch(err => {
      dispatch({
        type: GET_POSTS,
        payload: null
      });
      dispatch(postLoading());
      dispatch(hideLoading());
    });
};

//FETCH NEW LIKES

export const getLikes = () => dispatch => {
  dispatch(showLoading());

  axios
    .get("/api/posts")
    .then(res => {
      dispatch({
        type: GET_POSTS,
        payload: res.data
      });

      dispatch(hideLoading());
    })
    .catch(err => {
      dispatch({
        type: GET_POSTS,
        payload: null
      });

      dispatch(hideLoading());
    });
};

//delete post

export const deletePost = id => dispatch => {
  dispatch(showLoading());
  axios
    .delete(`/api/posts/${id}`)
    .then(res => {
      dispatch({
        type: DELETE_POST,
        payload: id
      });
      dispatch(hideLoading());
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
      dispatch(hideLoading());
    });
};

//add like
export const addLike = id => dispatch => {
  dispatch(showLoading());
  axios
    .post(`/api/posts/like/${id}`)
    .then(res => {
      dispatch(getLikes());
      dispatch(hideLoading());
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
      dispatch(hideLoading());
    });
};

//remove like

export const removeLike = id => dispatch => {
  dispatch(showLoading());
  axios
    .post(`/api/posts/unlike/${id}`)
    .then(res => {
      dispatch(getLikes());
      dispatch(hideLoading());
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
      dispatch(hideLoading());
    });
};

//get single post

export const getSinglePost = id => dispatch => {
  dispatch(showLoading());
  dispatch(postLoading());
  axios
    .get(`/api/posts/${id}`)
    .then(res => {
      dispatch({
        type: GET_POST,
        payload: res.data
      });
      dispatch(postLoading());
      dispatch(hideLoading());
    })
    .catch(err => {
      dispatch({
        type: GET_POST,
        payload: null
      });
      dispatch(postLoading());
      dispatch(hideLoading());
    });
};

//add comment
export const addComment = (commentData, postId) => dispatch => {
  dispatch(clearErrors());
  dispatch(showLoading());
  axios
    .post(`/api/posts/comment/${postId}`, commentData)
    .then(res => {
      dispatch({
        type: GET_POST,
        payload: res.data
      });
      dispatch(hideLoading());
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
      dispatch(hideLoading());
    });
};

//delete comment
export const deleteComment = (commentId, postId) => dispatch => {
  dispatch(showLoading());
  axios
    .delete(`/api/posts/comment/${postId}/${commentId}`)
    .then(res => {
      dispatch({
        type: GET_POST,
        payload: res.data
      });
      dispatch(hideLoading());
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
      dispatch(hideLoading());
    });
};

export const postLoading = () => {
  return {
    type: POST_LOADING
  };
};

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
