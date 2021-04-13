import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './reducers/userReducer';
import dataReducer from './reducers/dataReducer';
import uiReducer from './reducers/uiReducer';

const initState = {};

const middleware = [thunk];

const rootReducer = combineReducers({
    user: userReducer,
    activity: dataReducer,
    UI: uiReducer
});

const store = createStore(
    rootReducer,
    initState, 
    compose(applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);



export default store;