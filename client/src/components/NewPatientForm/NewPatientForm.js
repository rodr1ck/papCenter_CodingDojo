import React, { useRef, useState } from 'react'
import './styles.css'
import nuevoPaciente from '../../actions/nuevoPaciente'
import { useUser } from '../../contexts/userContext'
import { Link } from 'react-router-dom'
import { Card } from 'antd'

const showFieldError = (form, field, message) => {
    form.querySelector(`[data-${field}-error]`).innerHTML = message
}

const NewPatientForm = () => {
    const [firstNameValue, setFirstNameValue] = useState('')
    const [lastNameValue, setLastNameValue] = useState('')
    const [emailValue, setEmailValue] = useState('')
    const [addressValue, setAddressValue] = useState('')
    const [dobValue, setDobValue] = useState('')

    const successRef = useRef(null)
    const { user } = useUser()

    const onSubmit = async (e) => {
        e.preventDefault()
        const form = e.target.closest('form')
        if (firstNameValue.length <= 3) {
            return showFieldError(
                form,
                'firstName',
                `Patient FirstName name needs to be at least 3 characters`,
            )
        }
        const { success, data } = await nuevoPaciente({
            firstName: firstNameValue,
            lastName: lastNameValue,
            email: emailValue,
            address: addressValue,
            dob: dobValue,
            createdBy: user._id,
        })

        console.log(success, data)
        if (!success && data.length) {
            // Mongoose error
            data.forEach(({ field, message }) => {
                showFieldError(form, field, message)
            })
            // window.alert(message)
        } else if (!success) {
            // Other error
            window.alert(data.errors.error)
        } else {
            // Exito
            form.remove()
            successRef.current.classList.add('show')
        }
    }

    return (
        <>
            <Card style={{ marginTop: 16 }} className="my-card" title="BIENVENIDO A PAP CENTER">
                <Card
                    style={{ marginTop: 16 }}
                    type="inner"
                    title="Formulario para ingresar un nuevo paciente"
                >
                    <form className="new-form" onSubmit={onSubmit}>
                        <label htmlFor="firstName">Primer nombre</label>
                        <input
                            name="firstName"
                            id="firstName"
                            value={firstNameValue}
                            onChange={(e) => setFirstNameValue(e.target.value)}
                        />
                        <span className="error" data-firstName-error></span>

                        <label htmlFor="lastName">Apellido</label>
                        <input
                            name="lastName"
                            id="lastName"
                            value={lastNameValue}
                            onChange={(e) => setLastNameValue(e.target.value)}
                        />
                        <span className="error" data-lastName-error></span>

                        <label htmlFor="email">Email</label>
                        <input
                            name="email"
                            id="email"
                            value={emailValue}
                            onChange={(e) => setEmailValue(e.target.value)}
                        />
                        <span className="error" data-email-error></span>

                        <label htmlFor="address">Dirección</label>
                        <input
                            name="address"
                            id="address"
                            value={addressValue}
                            onChange={(e) => setAddressValue(e.target.value)}
                        />
                        <span className="error" data-address-error></span>

                        <label htmlFor="dob">Fecha de nacimiento</label>
                        <input
                            name="dob"
                            id="dob"
                            value={dobValue}
                            onChange={(e) => setDobValue(e.target.value)}
                        />
                        <span className="error" data-dob-error></span>

                        <button type="button">Cancel</button>
                        <button type="submit">Submit</button>
                    </form>
                    <div className="success-msg" ref={successRef}>
                        Éxito!
                    </div>
                </Card>
                <Link className="adopt-link" to="/dashboard">
                    volver al inicio
                </Link>
            </Card>
        </>
    )
}

export default NewPatientForm
