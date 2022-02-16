import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import moviesReducer from './reducers/reducers';
import userReducer from './reducers/userReducer';
const rootReducer = combineReducers({moviesReducer, userReducer});

export const store = createStore(rootReducer, applyMiddleware(thunk));
