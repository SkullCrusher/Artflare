// import dependencies
import types from "../constants";

export const addToSend = payload => ({
    "type": types.ADD_TO_SEND,
    payload
});

export const removeFirstToSend = payload => ({
    "type": types.REMOVE_FIRST_TO_SEND,
    payload
});