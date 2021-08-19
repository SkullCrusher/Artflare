// # reducers
// combines all reducers for the redux store

// import dependencies
import { combineReducers } from "redux";

// import reducers
import messagesReducer from "./messages";
import usersReducer    from "./users";
import userMadeReducer from "./userMade";

// set constants
const ENTRY_REDUCER = combineReducers({
    messagesReducer,
    usersReducer,
    userMadeReducer,
});

// export the reducer
export default ENTRY_REDUCER;