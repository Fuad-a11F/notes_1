import { CREATE_TASK_COLUMN, DELETE_TASK_LIST, SERVER_TASKS_GET } from "../types";

let initialState = {
    tasks: []
}


export function tasks(state= initialState, action) {
    switch (action.type) {
        case CREATE_TASK_COLUMN:
            return  {...state, tasks: state.tasks.concat([action.payload])}       
        case DELETE_TASK_LIST:
            let temp_1 = state.tasks.filter(item => item.id != action.payload)
            return {...state, tasks: temp_1}
        case SERVER_TASKS_GET:
            return {...state, tasks: action.payload}

        default:
            return state
    }
}