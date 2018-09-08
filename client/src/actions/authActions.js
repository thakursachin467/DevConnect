
import axios from 'axios';
import { TEST_DISPATCH, GET_ERRORS, SET_CURRENT_USER } from './types';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

//Register user
export const registerUser = (userData, history) => dispatch => {
    axios.post('/api/users/register', userData)
        .then((res) => {
            history.push('/login')
        })
        .catch((err) => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })

        });


}


//Login user
export const loginuser = (userData, history) => dispatch => {
    axios.post('/api/users/login', userData)
        .then((res) => {
            //save token to local storage
            const { token } = res.data;
            //set token local storage
            localStorage.setItem('jwttoken', token);
            /**
             * * set auth token to header
             */
            setAuthToken(token);

            /**
             * ! decode token to get data
             */
            const decoded = jwt_decode(token);

            /**
             * ! set current user
             */
            dispatch(setCurrentUser(decoded))
        })
        .catch((err) => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })

}

/**
 * ! set login user
 */

export const setCurrentUser = (decode) => {
    return {
        type: SET_CURRENT_USER,
        payload: decode
    }
}


/**
 * ! Logout action
 */

export const logoutUser = () => dispatch => {
    //remove token from local sstorage
    localStorage.removeItem('jwttoken');
    /**
     * ! remove  auth header for future request
     */

    setAuthToken(false);
    //set current user to empy user
    dispatch(setCurrentUser({}));

}