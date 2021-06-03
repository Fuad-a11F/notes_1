import { SET_DRAG_BOARD, SET_DRAG_ITEM, SET_MAIN_BOARD } from "../types";

let initialState = {
    board: null,
    item: null,
    main_board: null
}


export function drag(state= initialState, action) {
    switch (action.type) {
        case SET_DRAG_BOARD:
            return {...state, board: action.payload}

        case SET_DRAG_ITEM:
            return {...state, item: action.payload}

        case SET_MAIN_BOARD:
            return {...state, main_board: action.payload}

        default:
            return state
    }
}