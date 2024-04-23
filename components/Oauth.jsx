import React from 'react';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import ClipLoader from "react-spinners/ClipLoader";
import { useState } from 'react';
import { app } from '../src/firebase';
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { AddUser } from '../slices/UserSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'
const Oauth = () => {
    //console.log(Math.random().toString(36).toLowerCase().);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [spinner, setSpinner] = useState(false)
    const handleClick = async () => {
       
        const provider = new GoogleAuthProvider()
        const auth = getAuth(app)
        provider.setCustomParameters({ prompt: 'select_account' })
        try {
            const result = await signInWithPopup(auth, provider)
            
            const sendData = {
                userName: result.user.displayName,
                email: result.user.email
            }
            setSpinner(true)
            await axios.post('https://crm-backend-okn5.onrender.com/api/googleAuth', sendData)
                .then(res => {
                    setSpinner(false)
                    dispatch(AddUser(res.data.data))
                    toast(res.data.message)
                    setTimeout(() => {
                        navigate('/dashboardHome/dashboard')
                    }, 4000);
                })

        } catch (error) {
            setSpinner(false)
            toast(error.message)
            console.log(error)
        }


    }

    return (
        <div>

            <button type='button' className='btn w-100 btn-primary text-white my-2' onClick={handleClick}>{spinner?<div className='mx-auto'><ClipLoader color="#36d7b7" size={30} /></div>:<i class="fa-brands fa-google text-warning me-2" ></i>}Continue With Google</button>
            <ToastContainer />
        </div>
    );
};

export default Oauth;