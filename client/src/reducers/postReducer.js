import { ADD_POST, DELETE_POST, GET_POST, POST_LOADING, GET_POSTS } from '../actions/types';
const initialState = {
    posts: [],
    post: {},
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        default:
            return {
                ...state
            }
    }

}