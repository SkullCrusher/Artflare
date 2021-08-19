// # ActivePlans
// handles the reducers for the profiles store
// import dependencies
import types from "../constants";

// set constants
let initialState = {
   list: []
};

/**
 * # messagesReducer
 */
const messagesReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case types.ADD_TO_SEND:

            state.list.push(payload);

            return {
                ...state
            };

        case types.REMOVE_FIRST_TO_SEND:

            state.list.shift();

            return {
                ...state
            };

        default:
            return state;
    };
};

export default messagesReducer;