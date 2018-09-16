import { ADD_POST, DELETE_POST, GET_POST, POST_LOADING, GET_POSTS } from '../actions/types';
const initialState = {
    posts: [],
    post: {},
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case POST_LOADING:
            return {
                ...state,
                loading: !state.loading
            }
        case ADD_POST:
            return {
                ...state,
                posts: [action.payload, ...state.posts]
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== action.payload)
            }
        case GET_POST:
            return {
                ...state,
                post: action.payload
            }
        case GET_POSTS:
            return {
                ...state,
                posts: action.payload
            }
        default:
            return {
                ...state
            }
    }

}