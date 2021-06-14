import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'
import { Table, Button } from 'antd'
import { useHistory } from 'react-router-dom'

const Details = () => {
    let { id } = useParams()
    const [paps, setPaps] = useState()
    const [currentPatient, setCurrentPatient] = useState()
    const [isPatientLoaded, setIsPatientLoaded] = useState(false)
    const [isPapsLoaded, setIsPapsLoaded] = useState(false)
    const history = useHistory()

    useEffect(() => {
        axios.get('/api/paps/' + id).then((res) => {
            console.log(res)
            setPaps(res.data)
            setIsPapsLoaded(true)
        })
    }, [])

    useEffect(() => {
        axios.get('/api/patient/' + id).then((res) => {
            console.log(res)
            setCurrentPatient(res.data)
            setIsPatientLoaded(true)
        })
    }, [])

    console.log({ paps })

    //agrega boton delte
    if (isPapsLoaded) {
        const newPaps = paps.map((p) => {
            console.log(p)
            p.deletePap = (
                /*                 <Link
                    key={p.id}
                    className="action-btn details"
                    to={`/paps/${p._id}`}
                >
                    delete pap
                </Link> */

                <Button
                    onClick={(e) => {
                        deletePap(p._id)
                    }}
                    type="primary"
                    ghost
                >
                    delete pap
                </Button>
            )

            p.editPap = (
                <Link
                    key={'editPap' + p._id}
                    className="action-btn edit"
                    to={`/paps/${id}/${p._id}/edit`}
                >
                    edit pap
                </Link>
            )

            return p
        })
        //setPaps(newPaps)
    }

    const deletePap = (papId) => {
        axios.delete('/api/paps/' + papId).then((res) => {
            console.log(res)
            alert('Has borrado un pap')
            history.push('/dashboard')
        })
    }

    console.log({ currentPatient })
    let patientTitle = null
    if (isPatientLoaded) {
        const { firstName, lastName } = currentPatient
        patientTitle = (
            <h3>
                Información del paciente {firstName} {lastName}
            </h3>
        )
    }

    const columns = [
        {
            title: 'date_recep',
            dataIndex: 'date_recep',
            key: 'date_recep',
        },
        {
            title: 'date_taken',
            dataIndex: 'date_taken',
            key: 'date_taken',
        },
        {
            title: 'result',
            dataIndex: 'result',
            key: 'result',
        },
        {
            title: 'next_pap',
            dataIndex: 'next_pap',
            key: 'next_pap',
        },
        {
            title: 'Borrar Pap',
            dataIndex: 'deletePap',
            key: 'deletePap',
        },
        {
            title: 'Editar Pap',
            dataIndex: 'editPap',
            key: 'editPap',
        },
    ]

    const linkNewPap = '/newpap/' + id
    return (
        <>
            <Link className="adopt-link" to="/dashboard">
                back to home
            </Link>
            {isPatientLoaded ? patientTitle : ''}
            <Link className="action-btn add" to={linkNewPap}>
                Agregar un nuevo pap
            </Link>
            <Table
                className="table-style"
                columns={columns}
                dataSource={paps}
            />
        </>
    )
}

export default Details
