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

