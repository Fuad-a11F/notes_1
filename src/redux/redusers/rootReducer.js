import { combineReducers  } from 'redux'
import { main } from './main'
import { drag } from './drag'
import { now } from './now'
import { tasks } from './tasks'
import { task_list } from './task_list'



export let rootReducer = combineReducers({main, drag, now, tasks, task_list})