import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';



const initialState = {}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleWare = [thunk]
const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(...middleWare)));

export default store;