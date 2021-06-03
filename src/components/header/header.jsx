import React from 'react'
import './header.css'
import logout from '../../images/logout.png'
import { useHistory } from 'react-router'

function Header({token, setToken}) {
    let history = useHistory()

    React.useEffect(() =>  {
        if (localStorage.getItem('token')) setToken(true)
        else setToken(false)
    }, [token])

    function logout_f() {
        localStorage.removeItem('token')
        setToken(false)
        history.push('/login')
    }

    return (
        <div className='header'>
            NOTES
            {token && <div className='logout' onClick={() => logout_f()}><img src={logout} width='30'  height='30' alt="" /></div>}
        </div>
    )
}

export default Header
