import React from 'react'
import { useHistory } from 'react-router'
import logout from '../actions/logout'
import { useUser } from '../contexts/userContext'

const Header = () => {
    const { user, setUser } = useUser()
    const history = useHistory()

    const logOut = async () => {
        const { success } = await logout()
        if (success) setUser(null)
        else window.alert('Error, could not log out')
        history.push('/');
    }

    const renderHeader = () => {
        if (user) {
            return (
                <>
                    Hola {user.firstName}
                    <button onClick={logOut}>Cerrar Sesion</button>
                </>
            )
        } else {
            return (
                <>
                    <h1>BIENVENIDO A PAP CENTER</h1>
                </>
            )
        }
    }

    return <div>{renderHeader()}</div>
}

export default Header
