import React from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import './login.css'
import {useForm} from 'react-hook-form'
import axios from 'axios'

function Auth() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    let history = useHistory()
    let input =  React.useRef()
    
    function auth(data) {
        axios.post('http://localhost:5000/auth', data)
        history.push('/login')
    }

    return (
        <div className='login__row'>
            <div className="login__body">
                <form action="#" onSubmit={handleSubmit(auth)}>
                    <div>
                        <input className='input' {...register('name', {required: true, maxLength: 20, pattern: /^[A-Za-z]+$/i })} type="text" placeholder='Name'/>
                        <span>{errors.name?.type === 'required' && "*Name is required"}</span>
                        <span>{errors.name?.type === 'maxLength' && "*Максимальная длина 20 символов"}</span>
                        <span>{errors.name?.type === 'pattern' && "*В имени присутствуют недопустимые символы"}</span>
                    </div>
                    <div>
                        <input className='input' {...register('email', {required: true, maxLength: 50})} type="text" placeholder='Email'/>
                        <span>{errors.email?.type === 'required' && "*Email is required"}</span>
                        <span>{errors.email?.type === 'maxLength' && "*Максимальная длина 50 символов"}</span>
                    </div>
                    <div>
                        <input className='input' {...register('password', {required: true, minLength: 6 })} ref={input} type="text" placeholder='Password'/>
                        <span>{errors.password?.type === 'required' && "*Password is required"}</span>
                        <span>{errors.password?.type === 'minLength' && "*Минимальная длина пароля 6 символов"}</span>
                    </div>
                    <div>
                        <input className='input' {...register('password2', {required: true, validate: value => value === input.current.value })} type="text" placeholder='Repeat password'/>
                        <span>{errors.password2?.type === 'required' && "*Password is required"}</span>
                        <span>{errors.password2?.type === 'validate' && "*Пароли не совпадают"}</span>
                    </div>
                    <div className='end'>    
                        <button type='submit'>Create</button>
                    </div>
                </form>
            </div>
            <p>Have you already an account? <NavLink to="/login">Log in</NavLink> </p>
        </div>
    )
}

export default Auth
