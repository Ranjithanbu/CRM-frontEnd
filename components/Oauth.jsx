import React from 'react';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
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
            
            await axios.post('https://crm-backend-okn5.onrender.com/api/googleAuth', sendData)
                .then(res => {
                    
                    dispatch(AddUser(res.data.data))
                    toast(res.data.message)
                    setTimeout(() => {
                        navigate('/dashboardHome/dashboard')
                    }, 4000);
                })

        } catch (error) {
            toast(error.message)
            console.log(error)
        }


    }

    return (
        <div>

            <button type='button' className='btn w-100 btn-primary text-white my-2' onClick={handleClick}><i class="fa-brands fa-google text-warning" ></i> Continue With Google</button>
            <ToastContainer />
        </div>
    );
};

export default Oauth;