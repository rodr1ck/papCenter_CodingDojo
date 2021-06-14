import React from 'react';
import { Redirect } from 'react-router';
import NewPapForm from '../components/NewPapForm/NewPapForm';
import { useUser } from '../contexts/userContext';
import {useParams} from 'react-router-dom'

const NewPap = () => {

    const { user } = useUser();
    const {id}  = useParams(); 

    if (!user) return <Redirect to="/" />;

    return (
        <div>
            <NewPapForm patentId={id}/>
        </div>
    );
}

export default NewPap;
