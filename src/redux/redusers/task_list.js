import { CREATE_TASK, COMPLETED_TASK, SORT_TASKS, DELETE_TASK, SERVER_TASK_LIST_GET, CHANGE_EDIT_MODE, SAVE_EDIT_MODE, SORT_TASKS_ONE } from "../types";


let initialState =  {
    task_list: []
}

export function task_list(state = initialState, action) {
    switch (action.type) {
        case CREATE_TASK:
            return {...state, task_list: state.task_list.concat(action.payload)}       
        case COMPLETED_TASK:
            let new_list = state.task_list.map(item => {
                if (item === action.payload) {
                    return {...item, completed: !item.completed}
                }
                return item
            })
            return {...state, task_list: new_list}
        case DELETE_TASK:
            let new_list_12 = state.task_list.filter(item => item != action.payload)
            return {...state, task_list: new_list_12}
        case SERVER_TASK_LIST_GET:
            return {...state, task_list: action.payload}
        case CHANGE_EDIT_MODE:
            let new_edit = state.task_list.map(item => {
                if (item.id === action.payload) {
                    return { ...item,  edit: true }
                }
                return { ...item,  edit: false }
            })
            return {...state, task_list: new_edit}
        case SAVE_EDIT_MODE:
            let new_edit_1 = state.task_list.map(item => {             
                if (item.id === action.payload.id) {
                    return { ...item,  edit: false, title: action.payload.value }
                }
                return item
            })
            return {...state, task_list: new_edit_1}      
        case SORT_TASKS:
            let sorted  = state.task_list.map(item => {
                if (item  ===  action.payload.array_2) {
                    return {...item, taskId: action.payload.array.id }
                }
                return item
            })
            return {...state, task_list: sorted}     
        case SORT_TASKS_ONE: 
            let sorted_one = state.task_list.map(item => {
                if (item === action.payload.obj_1) {
                    return action.payload.obj_2
                }
                else if (item === action.payload.obj_2){
                    return action.payload.obj_1
                }
                return item
            })
            return {...state, task_list: sorted_one}
        default:
            return state;
    }
}