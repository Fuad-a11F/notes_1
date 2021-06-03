import React from 'react'
import  {NavLink} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { delete_title, set_title_now } from '../../redux/action'
import delete_icon from '../../images/close.svg'
import axios from 'axios'
import alert_t from '../alert_t'
import { main_server_title } from '../../redux/asyncAction'

function Title({item}) {
    const dispatch = useDispatch()
    
    function add_title(id) {
        dispatch(main_server_title(id))
        dispatch(set_title_now(id))
    }

    function remove_title(id) {
        axios.delete(`http://localhost:5000/delete_title?_id=${id}`)
        dispatch(delete_title(item.id))
    }

    return (
        <div className="main__column">
            <NavLink className="detail__btn button" to={`/details/${item.title}`} onClick={() => add_title(item.id)}>{item.title}</NavLink>
            <div className='delete' onClick={() => alert_t(item.id, remove_title)} ><img width='20' height='20' src={delete_icon} alt="" /></div>
        </div>
    )
}

export default Title
