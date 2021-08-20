// import dependencies
import types from "../constants";

export const addArt = payload => ({
    "type": types.ADD_ART,
    payload
});

export const addCaption = payload => ({
    "type": types.ADD_CAPTION,
    payload
});

export const addCombo = payload => ({
    "type": types.ADD_COMBO,
    payload
});

export const addVote = payload => ({
    "type": types.ADD_VOTE,
    payload
});
