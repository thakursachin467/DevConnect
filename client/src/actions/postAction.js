import { ADD_POST, DELETE_POST, GET_POST, POST_LOADING, GET_POSTS, GET_ERRORS } from './types';
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import axios from 'axios';


//ADD POST

export const addPost = (postData) => dispatch => {
    dispatch(showLoading())
    axios.post('/api/posts', postData)
        .then((res) => {

            dispatch({
                type: ADD_POST,
                payload: res.data
            })
            dispatch(hideLoading())

        })
        .catch((err) => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
            dispatch(hideLoading())
        })

}

//fetch all post

export const getPost = () => dispatch => {
    dispatch(showLoading())
    dispatch(postLoading())
    axios.get('/api/posts')
        .then((res) => {

            dispatch({
                type: GET_POSTS,
                payload: res.data
            })
            dispatch(postLoading())
            dispatch(hideLoading())

        })
        .catch((err) => {
            dispatch({
                type: GET_POSTS,
                payload: null
            })
            dispatch(postLoading())
            dispatch(hideLoading())
        })

}


export const postLoading = () => {
    return {
        type: POST_LOADING
    }
}