import { GET_PROFILE, PROFILE_LOADING, GET_ERRORS } from '../actions/types';
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
                profile: action.payload,
                loading: !state.loading
            }
        default:
            return state
    }

}
