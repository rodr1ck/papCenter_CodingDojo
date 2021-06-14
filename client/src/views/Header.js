import React from 'react'
import { useHistory } from 'react-router'
import logout from '../actions/logout'
import { useUser } from '../contexts/userContext'
import { Button } from 'antd'
import { PoweroffOutlined } from '@ant-design/icons'

const Header = () => {
    const { user, setUser } = useUser()
    const history = useHistory()

    const logOut = async () => {
        const { success } = await logout()
        if (success) setUser(null)
        else window.alert('Error, could not log out')
        history.push('/')
    }

    const renderHeader = () => {
        if (user) {
            return (
                <div className="header-style">
                    Hola {user.firstName}
                    {/* <button onClick={logOut}>Cerrar Sesion</button> */}
                    <Button
                        type="primary"
                        icon={<PoweroffOutlined />}
                        onClick={logOut}
                    >
                        Logout
                    </Button>
                </div>
            )
        } else {
            return (
                <>
                    {/* <h1>BIENVENIDO A PAP CENTER</h1> */}
                </>
            )
        }
    }

    return <div>{renderHeader()}</div>
}

export default Header
