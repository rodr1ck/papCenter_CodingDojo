import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { useUser } from '../contexts/userContext';

const Home = () => {
 
    const { user } = useUser();

    if (user) return <Redirect to="/dashboard" />
    else return <Redirect to="/login" />
}

export default Home
