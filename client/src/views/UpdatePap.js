import { useUser } from '../contexts/userContext'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import React, { useRef, useState, useEffect } from 'react'
import { Form, Input, Button, DatePicker } from 'antd'
import moment from 'moment'
import { Redirect } from 'react-router'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import actualizarPap from '../actions/actualizarPap'

const UpdatePap = () => {
    const { user } = useUser()
    const { patientId, papId } = useParams()
    const history = useHistory()
    const formRef = useRef(null)

    const [formInfo, setFormInfo] = useState({
        next_pap: '',
        result: '',
        date_recep: '',
        date_taken: '',
    })

    useEffect(() => {
        axios.get('/api/pap/' + papId).then((res) => {
            console.log(res)
            setFormInfo(res.data)
        })
    }, [])

    if (!user) return <Redirect to="/" />

    const onFinish = async (values) => {
        const { date_taken, date_recep, result, next_pap } = values
        console.log({ values })
        console.log(formInfo.result)
        const date_taken1 = moment(date_taken.toDate()).format()
        const date_recep1 = moment(date_recep.toDate()).format()
        const next_pap1 = moment(next_pap.toDate()).format()
        console.log(date_recep1)
        console.log(next_pap1)
        console.log(user._id) //midwifeId

        const { success, data } = await actualizarPap({
            date_taken: date_taken1,
            date_recep: date_recep1,
            result: formInfo.result,
            next_pap: next_pap1,
            midwifeId: user._id,
            patientId: patientId,
            id: papId,
        })

        console.log(success, data)
        if (success) history.push('/paps/' + patientId)
    }

    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    }

    const getFormData = (target) => {
        const form = target.closest('form')
        const formData = new FormData(form)
        const data = {}
        for (let [key, value] of formData.entries()) data[key] = value
        return data
    }

    console.log(moment(formInfo?.date_recep).format('DD/MM/YYYY'))

    const onChange = (e) => {
        e.preventDefault()
        const data = getFormData(e.target)
        setFormInfo(data)
        //const { errores } = verify(data)
        //showError(errores)
    }

    return (
        <>
            <Link className="adopt-link" to="/dashboard">
                back to home
            </Link>
            <h1>Actualizando Pap por {user.firstName}</h1>

            <Form
                className="pap-form-style"
                {...layout}
                name="nest-messages"
                onFinish={onFinish}
                ref={formRef}
                onChange={onChange}
            >
                <Form.Item
                    name="date_taken"
                    label="Fecha de toma"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <DatePicker />
                </Form.Item>

                <Form.Item
                    name="date_recep"
                    label="Fecha recepción"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <DatePicker />
                </Form.Item>

                <Form.Item
                    label="Result"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input id="result" name="result" value={formInfo?.result} />
                </Form.Item>
                <Form.Item
                    label="Fecha del próximo pap"
                    name="next_pap"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                </Form.Item>

                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button type="primary" htmlType="submit">
                        Enviar
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default UpdatePap
