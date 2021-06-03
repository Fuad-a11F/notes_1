import React from "react";
import { add_task_list, change_edit_mode, delete_task, delete_task_list, save_edit_mode, set_drag_board, set_drag_item, set_main_board, sort_tasks, sort_tasks_one } from "../../redux/action";
import { useSelector } from "react-redux";
import delete_icon from '../../images/close.svg'
import axios from 'axios'
import alert_t from '../alert_t'
import { comp_task, add_task_lists } from "../../redux/asyncAction";


function Task({ title, task_list, id, dispatch, index, board }) {
  let [value, setValue] = React.useState("");
  let [editText, setEditText]  = React.useState('')
  const drag_state = useSelector(state => state.drag)
  const list_state = useSelector(state => state.task_list)

  function check_list() {
    let index = drag_state.board.id
    let result = 0
    list_state.task_list.forEach(item => {
      if (item.taskId === index) result++
    })
    return result
  }
  function add_task(e) {
    if (!value) return
    if (e.key === "Enter") {
      dispatch(add_task_lists(value, id))      
      setValue('')
    }
  }

  function dragOverHandler(e) {
    e.preventDefault();
    if (e.target.closest('.task').classList.contains('over')) {
      e.target.style.boxShadow = "0 4px 8px gray";  
    }
  }  
  function dragOverHandler_table(e) {
    e.preventDefault();
    document.querySelectorAll('.task').forEach(item => item.firstChild.classList.remove('drag_visible'))
    if (!e.target.closest('.task').classList.contains('over')) {
      e.target.closest('.task').firstChild.classList.add('drag_visible')
    }
  }

  function dragLeaveHandler(e) {
    e.target.style.boxShadow = "none";
  }
  function dragStartHandler(e, item, obj) {
    dispatch(set_drag_board(item));
    dispatch(set_drag_item(obj));
    dispatch(set_main_board(e.target.closest('.task')));
    e.target.closest('.task').classList.add('over')
  }
  function dragEndHandler(e) {
    e.target.style.boxShadow = "none";
    document.querySelectorAll('.task').forEach(item => item.firstChild.classList.remove('drag_visible'))
  }

  function dropHandler(e, item, obj) {
    e.preventDefault();
    axios.put('http://localhost:5000/sorted_one', {item: drag_state.item, obj: obj})
    e.target.style.boxShadow = "none";
    drag_state.main_board.classList.remove('over')
    document.querySelectorAll('.task').forEach(item => item.firstChild.classList.remove('drag_visible'))
    dispatch(sort_tasks_one(drag_state.item, obj))
  }
  
  function dropHandler_table(e, board) {
    if (check_list() < 2) {
      e.target.style.boxShadow = "none";
      return alert('Минимум 1 элемент должен остаться')
    }
    e.preventDefault();
    axios.put('http://localhost:5000/sorted', {board: board, item: drag_state.item}).then(data => dispatch(add_task_list(data.data)))
    drag_state.main_board.classList.remove('over')
    document.querySelectorAll('.task').forEach(item => item.firstChild.classList.remove('drag_visible'))
    dispatch(sort_tasks(board, drag_state.item))
  }

  let prevent = false;
  function onClickHandler(item) {
    if (item.edit) return 
    prevent = false
    setTimeout(() => {
      if (!prevent)
        dispatch(comp_task(item))
    }, 230);
  }
  function onDoubleClickHandler(id) {
    task_list.forEach(item => {
      if (item.id === id)  {
        if (item.completed) return 
        setEditText(item.title)
        dispatch(change_edit_mode(item.id))
        return
      }
    })
    prevent = true
  }
  function delete_task1(id) {
    axios.delete(`http://localhost:5000/delete_task?_id=${id}`)
    dispatch(delete_task_list(id))
  }
  function delete_task_list1(item) {
    axios.delete(`http://localhost:5000/delete_task_list?_id=${item.id}`)
    dispatch(delete_task(item))
  }
  function save_edit(id) {
    axios.post('http://localhost:5000/edit_task_list', {editText: editText, id: id})
    dispatch(save_edit_mode(id, editText))
    setEditText('')
  }
  
  return (
    <>
      <div className="task" onDragOver={(e) => dragOverHandler_table(e)} onDrop={(e) => dropHandler_table(e, board)}>
        <div className="drag">+</div>
        <div className="task__title">{title}</div>
        <hr />
        <div className="task__input">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyPress={(e) => add_task(e)}
          />
        </div>
        {task_list.map((item) => {
          if (item.taskId === id) {
            return (
              <div key={item.id} className="item__list__body">
                <div
                  onDoubleClick={() => onDoubleClickHandler(item.id)}
                  onClick={() => onClickHandler(item)}
                  onDragOver={(e) => dragOverHandler(e)}
                  onDragLeave={(e) => dragLeaveHandler(e)}
                  onDragStart={(e) => dragStartHandler(e, board, item)}
                  onDragEnd={(e) => dragEndHandler(e)}
                  onDrop={(e) => dropHandler(e, board, item)}
                  draggable={true}
                  className={item.completed ? "done__task item " : "active__task item "}
                >
                  {item.title}
                </div>
                {item.completed ? <div className='delete center' onClick={() => alert_t(item, delete_task_list1)}><img width='18' height='18' src={delete_icon} alt="" /></div> : <span></span>}
                {item.edit ? <div className="input_edit"><input type="text" value={editText} onChange={(e) => setEditText(e.target.value)}/> <span onClick={() => save_edit(item.id)}>OK</span> </div> : <span></span>}
              </div>
              
            )
          }       
        })}

        <div className='delete' onClick={() => alert_t(board.id, delete_task1)}><img width='20' height='20' src={delete_icon} alt="" /></div>
      </div>
    </>

  );
}

export default Task;
