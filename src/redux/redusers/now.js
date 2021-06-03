import { SET_TITLE_NOW, DELETE_TITLE_NOW } from "../types";


let initialState =  {
    now: null,
}

export function now(state = initialState, action) {
    switch (action.type) {   
        case SET_TITLE_NOW:
            return  {...state, now: action.payload}
        case DELETE_TITLE_NOW:
            return  {...state, now: null}     
        default:
            return state;
    }
}