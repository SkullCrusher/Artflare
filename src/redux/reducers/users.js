// # users
// handles the reducers for the users store
// import dependencies
import types from "../constants";

// set constants
let initialState = {
   users: []
};

/**
 * # usersReducer
 */
const usersReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case types.SET_USERNAME_STATUS:

            const { username, newState } = payload;

            for(let i = 0; i < state.users.length; i += 1){
                if(state.users[i].username === username){
                    state.users[i].ready = newState;
                }
            }

            return { ...state };

        case types.ADD_USERNAME:
            state.users.push(payload);
            return { ...state };
        
        case types.REMOVE_USERNAME:

            let tmp = [];

            for(let i = 0; i < state.users.length; i += 1){
                if(state.users[i].username !== payload){
                    tmp.push(state.users[i]);
                }
            }
            
            state.users = tmp;

            return { ...state };

        default:
            return state;
    };
};

export default usersReducer;