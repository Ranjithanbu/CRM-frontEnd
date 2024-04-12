import React from 'react';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const passwordResetAuth = () => {

    //getting email from user and send to backend 

    const handleReset = async (e) => {
        e.preventDefault()
        const email = { email: e.target[0].value }
        await axios.post('https://crm-backend-okn5.onrender.com/api/resetAuth', email)
            .then(res => toast(res.data.message))
            .catch(err => toast(err.message))
    }
    return (
        <div className='d-flex justify-content-center align-items-center  text-center row p-fixed' >
            <div className='col-8 col-sm-8 col-md-4 border rounded ' style={{ backgroundColor: "#83c5be", height: 'auto' }}>
                <form onSubmit={(e) => { handleReset(e) }} >
                    <h3 className='m-4 pb-2 border-2 border-bottom text-primary' >Password Reset Page</h3>
                    <p className='text-white'>Forgot your password? No worries! Enter your email address below, and we'll send you instructions on how to reset your password.</p>
                    <input type="email" className='m-3 rounded' name="email" id="email" placeholder='enter your email id' /><br />
                    <button type="submit" className='btn btn-primary m-3' >submit</button>
                </form>

            </div>
            <ToastContainer />
        </div>

    );
};

export default passwordResetAuth;