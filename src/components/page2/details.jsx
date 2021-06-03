import React from 'react'
import '../page2/details.css'
import Button from  './button'
import Tasks from  './tasks_list'
import { useSelector, useDispatch } from "react-redux";

function Details() {
    const index = useSelector(state => state.now.now)
    const state = useSelector(state => state.main.main)
    const state_tasks = useSelector(state => state.tasks.tasks)
    const task_list = useSelector(state => state.task_list.task_list)
    const dispatch = useDispatch()

    return (
        <div>
            <Button index={index} dispatch={dispatch} state={state}/>
            <Tasks index={index} state_tasks={state_tasks} task_list={task_list} dispatch={dispatch} />
        </div>

    )
}

export default Details
