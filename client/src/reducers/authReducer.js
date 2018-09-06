import { TEST_DISPATCH } from '../actions/types'
const initiaState = {
    isAuthanticated: false,
    user: {}
}

export default function (state = initiaState, action) {
    switch (action.type) {
        case TEST_DISPATCH:
            return {
                ...state,
                user: action.payload
            }
        default:
            return state;

    }
}