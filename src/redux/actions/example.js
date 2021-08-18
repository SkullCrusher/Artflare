// # Plans Group
// handles the notification actions for the redux store
// import dependencies
import types from "../constants/types";

/**
 * # setNamespace
 * todo
 * 
 * @param {Object} payload
 * 
 * @returns null
 */
export const setActivePlans = payload => ({
    "type": types.SET_ACTIVE_PLANS,
    payload
});

