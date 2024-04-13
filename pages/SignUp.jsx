import { useFormik } from 'formik';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import ClipLoader from "react-spinners/ClipLoader";
import { NavLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import Oauth from '../components/Oauth';
const SignUp = () => {
    const [spinner, setSpinner] = useState(false)
    const navigate = useNavigate()
//initial value for formik validation
    const initialValue = {
        userName: '',
        email: '',
        password: ''
    }
 
 //schema for validation
    const validationSchema = Yup.object().shape({

        userName: Yup.string().required('username is required'),
        email: Yup.string().email().matches(/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/, 'enter valid mail').required('email is required'),
        password: Yup.string().min(5, 'password should be minimum 5 charactor').max(10, 'password shuld less than 10 charactor').required('Password required')


    })

//formik validation and passing  input values to backend

    const formik = useFormik({
        initialValues: initialValue,
        validationSchema,
        onSubmit: async (values) => {
               setSpinner(true)
            await axios.post('https://crm-backend-okn5.onrender.com/api/registerUser', values)
                .then(res => {
                    toast(res.data.message)
                    setSpinner(false)    
                    setTimeout(() => {
                        if (res.data.success) {
                            navigate('/signIn')

                        }
                    }, 5000);


                })
                .catch(err => {
                    setSpinner(false)
                    toast(err.message)

                })


        }

    })

    return (
        <div className='p-fixed'>
            <div className='container '>
                <ToastContainer />
            </div>
            <div className='row '>
                <form onSubmit={formik.handleSubmit} >
                    <div className='col-8 col-sm-6 col-md-4 d-flex flex-column justify-content-between mx-auto p-3 text-white rounded-4 mt-4 shadows'>


                        <h1 className="h3 mb-3 fw-normal text-center className='greetText'">Create Account</h1>
                        <div className="">
                            <label className='m-1' for="username">User Name</label>
                            <input type="text" name='userName' className="form-control m-1 bg-transparent" id="userName" placeholder="jhoe" onChange={formik.handleChange} />
                            <p className='text-danger'>{formik.errors.userName}</p>
                        </div>

                        <div className="">
                            <label className='m-1' for="email">Email address</label>
                            <input type="email" name='email' className="form-control m-1 bg-transparent" id="email" placeholder="name@example.com" onChange={formik.handleChange} />
                            <p className='text-danger'>{formik.errors.email}</p>
                        </div>
                        <div className="">
                            <label className='m-1' for="password">Password</label>
                            <input type="password" name='password' className="form-control m-1 bg-transparent" id="password" data-testid="royal_pass" placeholder="Password" onChange={formik.handleChange} />
                            <p className='text-danger'>{formik.errors.password}</p>
                        </div>

                        <p>already have an account <NavLink to='/signIn' style={{ color: 'black', }}>SignIn</NavLink></p>
                        <button className="btn btn-primary w-100 py-2 mx-auto" type="submit">{spinner?<div className='mx-auto'><ClipLoader color="#36d7b7" size={30} /></div>: 'SignUp'}</button>
                        <Oauth />
                    </div>

                </form>
            </div>

        </div>

    );
};

export default SignUp;