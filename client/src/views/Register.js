import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useHistory,
  } from "react-router-dom";
import RegisterForm from '../components/RegisterForm';
import { useUser } from '../contexts/userContext'

const Register = () => {

    const [errors, setErrors] = useState([]); 
    const { setUser } = useUser()

    const registerUser = user => {
        axios.post('/api/register', user)
            .then(res=>{
                console.log(res.data);
                
                axios.get(`/api/user/${res.data._id}`, {withCredentials: true})
                .then(res=>{
                    setUser(res.data);
                    //history.push("/");
                })
                .catch(err=>{
                    console.error(err);
                    return { success: false, data: err.message };
                })

            })
            .catch(err=>{
                const errorResponse = err.response.data.errors; // Get the errors from err.response.data
                const errorArr = []; // Define a temp error array to push the messages in
                for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
                    errorArr.push(errorResponse[key].message)
                }
                // Set Errors
                setErrors(errorArr);
            }) 
    }

    return (
        <div>
            {errors.map((err, index) => <div className="alert alert-danger" role="alert">{err}</div>)}
            <RegisterForm onSubmitProp={registerUser} iFirstName='' iLastName='' iEmail='' iPassword='' iConfirm='' />
            
        </div>
    );
}

export default Register;
