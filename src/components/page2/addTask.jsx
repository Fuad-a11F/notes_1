import React from "react";
import delete_icon from '../../images/close.svg'
import { add_task_col } from "../../redux/asyncAction";


function AddTask({ index, dispatch }) {
  let [element, setElement] = React.useState(true);
  let [value, setValue] = React.useState("");

  function add_task_column(e) {
    if (!value) return
    if (e.key === "Enter") {
      dispatch(add_task_col(value, index))
      setValue('')
    }
  }
  

  return (
    <>
      {element && (
        <>
          <button onClick={() => setElement(false)} className="add__task">add a list</button>          
        </>
      )}

      {!element && (
        <div className="task__add__form">
          <div className="task__add-input">
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyPress={(e) => add_task_column(e)} />
            <p>give me a name</p>
          </div>
          <div className='delete' onClick={() => setElement(true)}><img width='20' height='20' src={delete_icon} alt="" /></div>
        </div>
      )}
    </>
  );
}

export default AddTask;
