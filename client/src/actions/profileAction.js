import axios from 'axios';
import { GET_PROFILE, PROFILE_LOADING, GET_ERRORS } from './types';
import { showLoading, hideLoading } from 'react-redux-loading-bar'

/**
 * ? GET CURRENT PROFILE
 */

export const getCurrentProfile = () => dispatch => {
    dispatch(showLoading())
    dispatch(setProfileLoading())
    axios.get('/api/profiles')
        .then((res) => {
            dispatch(hideLoading())
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        })
        .catch((err) => {
            dispatch(hideLoading())
            dispatch({
                type: GET_PROFILE,
                payload: {}
            })
        })


}

// PROFILE LOADING
export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    }
}

