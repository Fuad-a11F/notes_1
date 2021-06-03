import React from 'react'
import { NavLink } from 'react-router-dom'
import { delete_title_now } from '../../redux/action'


function Button({index, state, dispatch}) {

    return (
        <div className='title__btn-body'>
             <NavLink to='/' className="title__btn button" onClick={() => dispatch(delete_title_now())}>       
                {state.map(item => {
                    if (index === item.id) {
                        return (
                                <span key={item.id}>{item.title}</span>
                        )
                    }
                })}
            </NavLink>           
        </div>
    )
}

export default Button
