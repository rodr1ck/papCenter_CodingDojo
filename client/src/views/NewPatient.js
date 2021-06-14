import React from 'react';
import { Redirect } from 'react-router';
import NewPatientForm from '../components/NewPatientForm/NewPatientForm';
import { useUser } from '../contexts/userContext';

const NewPatient = () => {
    const { user } = useUser();
    console.log({ userfromNew: user });

    if (!user) return <Redirect to="/" />;

    return (
        <div>
            <NewPatientForm />
        </div>
    );
}

export default NewPatient;
