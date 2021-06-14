import { useUser } from '../../contexts/userContext'
import { Link } from 'react-router-dom'
import React, { useRef, useState } from 'react'
import { Form, Input, InputNumber, Button, DatePicker, TimePicker } from 'antd'
import moment from 'moment';
import nuevoPap from '../../actions/nuevoPap';
import { useHistory } from 'react-router-dom'

const NewPapForm = (props) => {
    
    const { user } = useUser()
    const {patentId} = props
    const history = useHistory()

    console.log(patentId)

    const onFinish = async(values) => {
       const {date_taken, date_recep, result, next_pap} = values
        //console.log(values)
        const date_taken1 = moment(date_taken.toDate()).format()
        const date_recep1 = moment(date_recep.toDate()).format()
        const next_pap1 = moment(next_pap.toDate()).format()
        console.log(date_recep1)
        console.log(next_pap1)
        console.log(user._id) //midwifeId

        const { success, data } = await nuevoPap({
            date_taken: date_taken1,
            date_recep: date_recep1,
            result: result,
            next_pap: next_pap1,
            midwifeId: user._id,
            patientId:patentId
        })

        console.log(success, data)
        if(success) history.push('/paps/'+patentId);

    }

    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    }

    return (
        <>
            <Link className="adopt-link" to="/dashboard">
                back to home
            </Link>
            <h1>New Pap Made by {user.firstName}</h1>

            <Form
                className="pap-form-style"
                {...layout}
                name="nest-messages"
                onFinish={onFinish}
                
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
                    name="result"
                    label="Result"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="next_pap"
                    label="Fecha del próximo pap"
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

export default NewPapForm
