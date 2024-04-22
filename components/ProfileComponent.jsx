import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AddUser, AddImage } from '../slices/UserSlice';
import { useNavigate } from 'react-router-dom'
const ProfileComponent = () => {
    const user = useSelector((state) => state.userSlicer.userData)
    const navigate = useNavigate()
    const [file, setfile] = useState([])
    const dispatch = useDispatch()
console.log(user.image);
//sending profile image file to backend

    const handleClick = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('file', file)
        await axios.post(`https://crm-backend-okn5.onrender.com/api/upload/${user.token}`, formData)

            .then(res => {
                toast(res.data.message)

                dispatch(AddImage(res.data.data))

            })
            .catch(err => toast(err.message))
    }

    return (
        <div className='container'>
            <div className='col-md-8 mx-auto '>
                <ToastContainer />
                <div className="card mt-4">
                    <button className='ms-auto text-decoration-none fs-6 m-2 btn btn-info rounded-pill hover-shadow' onClick={() => { navigate(-1) }} ><i class="fa-solid fa-person-walking-arrow-loop-left hover-overlay "></i></button>
                    <img className='img-fluid mx-auto mt-2 img-round hover-' src={`https://crm-backend-okn5.onrender.com/images/${user.image}`} alt="profile" width={200} />
                    
                    <input type="file" name="file" id="file" className='mt-2 mx-auto' onChange={(e) => { setfile(e.target.files[0]) }} />
                    <button onClick={handleClick} className='btn btn-secondary w-25 mx-auto m-1'>
                        update
                    </button>
                    <p className='mx-auto fs-2 fw-bold d-inline text-capitalize'>Hi {user.userName} <span className='fs-5 text-muted'>({user.role})</span></p>


                </div>


            </div>

        </div>
    );
};

export default ProfileComponent;