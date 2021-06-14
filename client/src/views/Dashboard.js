import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import PatientList from '../components/PatientList'
import { useUser } from '../contexts/userContext';
import { Redirect } from 'react-router';

const Dashboard = () => {

    const { user } = useUser();

    const [patients, setPatients] = useState([])
    const [loaded, setLoaded] = useState(false)
    useEffect(() => {
        axios.get('/api/patients').then((res) => {
            setPatients(res.data)
            setLoaded(true)
        })
    }, [])

    console.log({ userfromNew: user });

    if (!user) return <Redirect to="/" />;

    return (
        <div>
            <h3>Información de todos los pacientes</h3>

            <Link className="action-btn add" to="/newpatient">Agregar un nuevo paciente</Link>
            
            {loaded && (
                <PatientList
                    patients={patients}
                />
            )}

        </div>
    );
}

export default Dashboard;
