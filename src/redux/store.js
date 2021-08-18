// # store
// initializes the redux store and adds the reducers into it from the reducer entry file

// TODO: https://github.com/rt2zz/redux-persist#state-reconciler

// import depenedencies
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import entryReducer from "./reducers";

// set constants
const INITIAL_STATE = {};
const MIDDLEWARE = [thunk];

// create the store
const STORE = createStore(entryReducer, INITIAL_STATE, applyMiddleware(...MIDDLEWARE));

// export the store
export default STORE;