import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const ResetPassword = () => {

    //recieving id and token from params

    const { id, token } = useParams()
    const navigate = useNavigate()
    
    //getting userInput and send to backend
    
    const handlePassword = async (e) => {
        e.preventDefault()
        const password = { password: e.target[0].value }
        console.log(password);
        await axios.post(`https://crm-backend-okn5.onrender.com/api/resetPassword/${token}`, password)
            .then(res => {
                toast(res.data.message)
                setTimeout(() => {
                    if (res.data.data) {
                        navigate('/signIn')
                    }
                }, 5000)


            })
            .catch(err => toast(err.message))

    }
    return (
        <div>
            <div className='d-flex justify-content-center align-items-center  text-center row p-fixed'>
                <div className='col-md-4 col-sm-6 border rounded ' style={{ backgroundColor: 'cadetblue', height: 'auto' }}>
                    <form onSubmit={(e) => { handlePassword(e) }}>
                        <h3 className='m-4 pb-2 border-2 border-bottom text-white'>Reset Password</h3>
                        <input type="password" className='m-3 rounded' name="password" id="password" placeholder='Enter new password' /><br />
                        <button className='btn btn-primary m-3' type="submit">update</button>
                    </form>
                </div>
                <ToastContainer />
            </div>
        </div>
    );
};

export default ResetPassword;