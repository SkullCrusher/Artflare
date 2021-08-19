// # userMade
// handles the reducers for the users store
// import dependencies
import types from "../constants";

// set constants
let initialState = {
   art:      [],
   captions: [],
   combos:   [],
};

/**
 * # userMadeReducer
 */
const userMadeReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case types.ADD_ART:
            state.art.push(payload)
            return { ...state };

        case types.ADD_CAPTION:
            state.captions.push(payload);
            return { ...state };

        case types.ADD_COMBO:
            state.combos.push(payload);
            return { ...state };

        default:
            return state;
    };
};

export default userMadeReducer;