// import dependencies
import types from "../constants";

export const addUsername = payload => ({
    "type": types.ADD_USERNAME,
    payload
});

export const removeUsername = payload => ({
    "type": types.REMOVE_USERNAME,
    payload
});

export const setUsernameStatus = payload => ({
    "type": types.SET_USERNAME_STATUS,
    payload
})

export const resetUsers = payload => ({
    "type": types.RESET_USER,
    payload
})