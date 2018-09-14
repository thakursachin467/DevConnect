import { GET_PROFILE, GET_PROFILES, PROFILE_LOADING, GET_ERRORS, CLEAR_CURRENT_PROFILE } from '../actions/types';
const initalState = {
    profile: null,
    profiles: null,
    loading: false
}

export default (state = initalState, action) => {
    switch (action.type) {
        case PROFILE_LOADING:
            return {
                ...state,
                loading: !state.loading
            }
        case GET_PROFILE:
            return {
                ...state,
                profile: action.payload
            }
        case CLEAR_CURRENT_PROFILE:
            return {
                ...state,
                profile: null
            }
        case GET_PROFILES:
            return {
                ...state,
                profiles: action.payload
            }
        default:
            return state
    }

}
