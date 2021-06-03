import { CREATE_TITLE, DELETE_TITLE, SERVER_MAIN_GET } from "../types";


let initialState =  {
    main: [],
}

export function main(state = initialState, action) {
    switch (action.type) {
        case SERVER_MAIN_GET:
            return  {...state, main: action.payload}  
        case CREATE_TITLE:
            return  {...state, main: state.main.concat(action.payload)}    
        case DELETE_TITLE:
            let del_main_title = state.main.filter(item => item.id != action.payload)
            return {...state, main: del_main_title}

        default:
            return state;
    }
}