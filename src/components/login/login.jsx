import React from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import './login.css'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import { useDispatch } from "react-redux";
import { main_server_get } from '../../redux/asyncAction'


function Login({setToken}) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    let dispatch= useDispatch()
    let history = useHistory()
    let [value, setValue] = React.useState(false)
    let [email, setEmail] = React.useState('')
    let [password, setPassword] = React.useState('')
    let input  = React.useRef()
    let input_1  = React.useRef()

    React.useEffect(() => {
        let token = localStorage.getItem('token')
        let em = localStorage.getItem('email')
        let pass = localStorage.getItem('password')
        if (em && pass) {
            setEmail(em)
            setPassword(pass)
            setValue(true)
        }
        if (!token) return
        history.push('/')   
    }, [])

    function save_me(value, data) {
        if (value) {
            localStorage.setItem('email', data.email)
            localStorage.setItem('password', data.password)
        }
        else {
            localStorage.removeItem('email')
            localStorage.removeItem('password')
        }
    }

    function login(data) {
        axios.post('http://localhost:5000/login', data)
        .then(data => {
            if (data.data.token) {
                history.push('/')
                localStorage.setItem('token', data.data.token)
                setToken(true)
                dispatch(main_server_get(data.data.token))
            }  
            else {
                alert('Пользователь не найден')
            }
        })
        save_me(value, data)
    }

    function login_save() {
        if (localStorage.getItem('email') && localStorage.getItem('password')) {
            input.current.focus()
            input_1.current.focus()
            input_1.current.blur()
        }
    }

    return (
        <div className='login__row'>
            <div className="login__body">
                <form action="#" onSubmit={ handleSubmit(login) }>
                    <div>
                        <input className='input' {...register('email',  {required: true,  maxLength: 50})} value={email} ref={input} onChange={(e) => setEmail(e.target.value)} type="text" placeholder='Email'/>
                        <span>{errors.email?.type === 'required' && "*Email is required"}</span>
                        <span>{errors.email?.type === 'maxLength' && "*Максимальная длина 50 символов"}</span>
                    </div>
                    <div>
                        <input className='input' {...register('password',{required: true})} value={password} ref={input_1} onChange={(e) => setPassword(e.target.value)} type="text" placeholder='Password'/>
                        <span>{errors.password?.type === 'required' && "*Password is required"}</span>
                    </div>
                    <div className='space-between'>
                        <div>
                            <input checked={value} onChange={() => setValue(!value)} type="checkbox" id='remember'/>
                            <label htmlFor="remember">Save me</label>
                        </div>      
                        <button type='submit' onClick={login_save}>Log in</button>
                    </div>
                </form>
            </div>
            <p>Don't you have an account? <NavLink to="/auth">Create</NavLink> </p>
        </div>
    )
}

export default Login
