import "./tasks.css";
import React from "react";
import AddTask from "./addTask";
import Task from "./task";
import { Redirect } from "react-router-dom";

function Tasks({ index, dispatch, state_tasks, task_list }) {
  if (!index) return <Redirect to="/" />;

  return (  
    <div className="task__row">
      {state_tasks.map((item) => {
        if (item.mainId === index) {
          return (
            <Task board={item} dispatch={dispatch} index={index} key={item.id} title={item.title} task_list={task_list} id={item.id} />
          )
        }
      })}
      <AddTask index={index} dispatch={dispatch} />
    </div>
  );
}

export default Tasks;
