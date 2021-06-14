import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Table } from 'antd'
import { Link } from 'react-router-dom'

const PatientList = (props) => {
    const { patients } = props

    patients.sort(function (a, b) {
        if (a.type < b.type) {
            return -1
        }
        if (a.type > b.type) {
            return 1
        }
        return 0
    })

    const newPatients = patients.map((p) => {
        p.details = (
            <Link
                key={p.id}
                className="action-btn details"
                to={`/paps/${p._id}`}
            >
                details
            </Link>
        )
        return p
    })

    const columns = [
        {
            title: 'FirstName',
            dataIndex: 'firstName',
            key: 'firstName',
        },
        {
            title: 'lastName',
            dataIndex: 'lastName',
            key: 'lastName',
        },
        {
            title: 'email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'dob',
            dataIndex: 'dob',
            key: 'dob',
        },
        {
            title: 'Datails',
            dataIndex: 'details',
            key: 'details',
        },
    ]

    return <Table className="table-style" columns={columns} dataSource={newPatients} />
}

export default PatientList
