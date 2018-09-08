import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorsReducer from './errorReducer';
import profileReducer from './profileReducer';
import { loadingBarReducer } from 'react-redux-loading-bar'


export default combineReducers({
    auth: authReducer,
    errors: errorsReducer,
    loadingBar: loadingBarReducer,
    profile: profileReducer
})