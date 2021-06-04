import React from 'react';
import { Link } from 'react-router-dom'

const Dashboard = () => {
    return (
        <div>
            <p>"This is the dashboard"</p>

            <Link className="action-btn add" to="/patients/new">Agregar un nuevo paciente</Link>

        </div>
    );
}

export default Dashboard;
