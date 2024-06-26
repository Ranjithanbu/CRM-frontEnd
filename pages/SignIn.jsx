import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { useState } from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useDispatch } from "react-redux";
import { AddUser } from '../slices/UserSlice';
import Oauth from '../components/Oauth';
const SignIn = () => {
    const [spinner, setSpinner] = useState(false)
 //for navigation purpose   
    const navigate = useNavigate()
 //for updating redux state   
    const dispatch = useDispatch()
//initial value for formik validation    
    const initialValue = {
        userName: "",
        password: ""
    }
//schema for validation
    const validationSchema = Yup.object().shape({

        userName: Yup.string().required('username is required'),
        password: Yup.string().required('Password required')

    })
//formik validation and passing  input values to backend

    const formik = useFormik({
        initialValues: initialValue,
        validationSchema,
        onSubmit: async (values) => {
            setSpinner(true)
            console.log(values);
            await axios.post('https://crm-backend-okn5.onrender.com/api/loginUser', values).then(res => {
                
            setSpinner(false)
            toast(res.data.message)

                dispatch(AddUser(res.data.data))
                
                setTimeout(() => {
                    if (res.data.data) {
                        navigate('/dashboardHome/dashboard')
                    }
                }, 5000)

            })
                .catch(err => {
                    setSpinner(false)
                    toast(err.message) })



        }

    })



    return (
        <div className='p-fixed'>
            <div>
                <ToastContainer />
                <form onSubmit={formik.handleSubmit} >
                    <div className='col-8 col-sm-8 col-md-4 d-flex flex-column justify-content-between mt-4  mx-auto p-3 text-white rounded-3 shadows'>


                        <h1 className="h3 mb-3 fw-normal text-center">Log in</h1>


                        <div className="">
                            <label className='m-1' for="userName">User Name</label>
                            <input type="text" name='userName' className="form-control m-1 bg-transparent" id="userName" placeholder="user Name" onChange={formik.handleChange} />
                            <p>{formik.errors.userName}</p>
                        </div>
                        <div className="">
                            <label className='m-1' for="password">Password</label>
                            <input type="password" name='password' className="form-control m-1 bg-transparent" id="password" data-testid="royal_pass" placeholder="Password" onChange={formik.handleChange} />
                            <p>{formik.errors.password}</p>
                        </div>
                        
                        <NavLink to={'/passwordResetAuth'}><span className='text-white mb-1'>forgot password</span></NavLink>
                        <p className='my-2'>You don't have an account<NavLink to={'/signUp'} className={'text-black ms-1'}>clickHere</NavLink></p>
                        <button className="btn btn-primary w-100 py-2 mx-auto" type="submit">{spinner?<div className='mx-auto'><ClipLoader color="#36d7b7" size={25} /></div>:'log in'}</button>
                        <Oauth />
                    </div>

                </form>

            </div>
        </div>
    );
};

export default SignIn;