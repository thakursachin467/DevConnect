import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorsReducer from './errorReducer';
import profileReducer from './profileReducer';
import { loadingBarReducer } from 'react-redux-loading-bar'
import postReducer from './postReducer';


export default combineReducers({
    auth: authReducer,
    errors: errorsReducer,
    loadingBar: loadingBarReducer,
    profile: profileReducer,
    post: postReducer
})