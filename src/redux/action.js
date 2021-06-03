import { CHANGE_EDIT_MODE, COMPLETED_TASK, CREATE_TASK, CREATE_TASK_COLUMN, CREATE_TITLE, DELETE_TASK, DELETE_TASK_LIST, DELETE_TITLE, DELETE_TITLE_NOW, SAVE_EDIT_MODE, SERVER_MAIN_GET, SERVER_TASKS_GET, SERVER_TASK_LIST_GET, SET_DRAG_BOARD, SET_DRAG_ITEM, SET_MAIN_BOARD, SET_TITLE_NOW, SORT_TASKS, SORT_TASKS_ONE } from "./types";

export function create_title(item) {
    return {
        type: CREATE_TITLE,
        payload: item
    }
}

export function set_title_now(id) {
    return {
        type: SET_TITLE_NOW,
        payload: id
    }
}

export function delete_title_now() {
    return {
        type: DELETE_TITLE_NOW,
    }
}

export function create_task_column(str) {
    return {
        type: CREATE_TASK_COLUMN,
        payload: str
    }
}

export function create_task(str) {
    return {
        type: CREATE_TASK,
        payload: str
    }
}

export function set_drag_board(board) {
    return {
        type: SET_DRAG_BOARD,
        payload: board
    }
}

export function set_drag_item(item) {
    return {
        type: SET_DRAG_ITEM,
        payload:  item
    }
}

export function sort_tasks(array, array_2) {
    return {
        type: SORT_TASKS,
        payload: {
            array: array,
            array_2: array_2,
        }
    }
}

export function sort_tasks_one(obj_1, obj_2) {
    return {
        type: SORT_TASKS_ONE,
        payload: {
            obj_1: obj_1,
            obj_2: obj_2
        }
    }
}

export function delete_title(id) {
    return {
        type: DELETE_TITLE,
        payload: id
    }
}

export function delete_task_list(id) {
    return {
        type: DELETE_TASK_LIST,
        payload: id
    }
}

export function completed_task(item) {
    return {
        type: COMPLETED_TASK,
        payload: item
    }
}

export function delete_task(item) {
    return {
        type: DELETE_TASK,
        payload: item
    }
}

export function add_task(item) {
    return {
        type: SERVER_MAIN_GET,
        payload: item
    }
}

export function add_tasks(item) {
    return {
        type: SERVER_TASKS_GET,
        payload: item
    }
}


export function add_task_list(item) {
    return {
        type: SERVER_TASK_LIST_GET,
        payload: item
    }
}

export function change_edit_mode(id = -1) {
    return {
        type: CHANGE_EDIT_MODE,
        payload: id
    }
}

export function save_edit_mode(id, value) {
    return {
        type: SAVE_EDIT_MODE,
        payload: {
            id,
            value
        }
    }
}

export function set_main_board(item) {
    return {
        type: SET_MAIN_BOARD,
        payload: item
    }
}





