import { TEST_DISPATCH, SET_CURRENT_USER } from '../actions/types'
import isEmpty from '../utils/isDashEmpty';
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
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthanticated: !isEmpty(action.payload),
                user: {
                    ...action.payload
                }
            }
        default:
            return state;

    }
}