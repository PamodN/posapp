// src/redux/store.js

// Import necessary modules
import { createStore, combineReducers, applyMiddleware } from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './rootReducer';

// Combine reducers
const finalReducer = combineReducers({
  rootReducer,
});

// Initial state for the store
const initialState = {
  rootReducer: {
    cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
    loading: false,
  },
};

// Middleware configuration
const middleware = [];  

// Create the Redux store
const store = createStore(
  finalReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
