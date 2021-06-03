import { add_task, add_tasks, add_task_list, completed_task, create_task, create_task_column } from "./action"
import axios from 'axios'

export function main_server_get(token) {
    return dispatch => {
        axios.post('http://localhost:5000/get_all', {token}).then(data => {
            dispatch(add_task(data.data))
        })
    }
}

export function main_server_title(id) {
    return dispatch => {
        axios.get(`http://localhost:5000/get_tasks?_id=${id}`).then(data => {
            dispatch(add_tasks(data.data.task)),
            dispatch(add_task_list([...data.data.tasks_list]))
        })
    }
}

export function add_task_lists(value, id) {
    return dispatch => {
        axios.post('http://localhost:5000/create_task_list', {value: value, id: id})
        .then(data => dispatch(create_task(data.data)))
    }
}

export function comp_task(item) {
    return dispatch => {
        axios.post('http://localhost:5000/task_list_completed', {id: item.id})
        dispatch(completed_task(item))
    }
}

export function add_task_col(value, index) {
    return dispatch => {
        axios.post('http://localhost:5000/create_task', {value: value, index: index})
        .then(data => dispatch(create_task_column(data.data)))
    }
}
