import axios from 'axios'
import React from 'react'
import {useDispatch} from 'react-redux'
import {create_title} from '../../redux/action'

function Modal({setModal}) {
    const dispatch = useDispatch()
    let [value, setValue] = React.useState('')
    
    function create() {
        if (!value) return
        axios.post('http://localhost:5000/create_main', {value: value, token: localStorage.getItem('token')})
        .then(data => dispatch(create_title(data.data)))
        setValue('')
    }

    return (
        <div className='create__form'>
            <div className='create__container'>
                <p>What shall we call the board?</p>
                <div>
                    <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
                </div>
                <div className='button__row'>
                    <div className="cancel"><button className='cancel__btn' onClick={() => setModal(false)}>cancel</button></div>
                    <div className="ok"><button className='ok__btn' onClick={() => create()}>create</button></div>
                </div>
            </div>
        </div>
    )
}

export default Modal
