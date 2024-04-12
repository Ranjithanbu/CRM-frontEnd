import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Link, Outlet, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import DashboardNav from './DashboardNav';
import '../Css/dashboard.css'
import { useDispatch } from 'react-redux'
import { getLead } from '../slices/DashboardSlice';
import { getCustomer } from '../slices/DashboardSlice';
import { getProduct } from '../slices/DashboardSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addLead } from '../slices/LeadSlice';
import { useSelector } from 'react-redux'
import { AddUser } from '../slices/UserSlice';
const DashboardHome = ({ setNavStatus }) => {
    // const [profile,setProfile]=useState()
    const profile = useSelector((state) => state.userSlicer.userData)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        setNavStatus(false)
        fetchCardData()
    }, [])

    const fetchCardData = async () => {

        //fetching total leads    
        await axios.get('https://crm-backend-okn5.onrender.com/lead/getLeads')
            .then(res => {
                dispatch(getLead(res.data.data))

            })
            .catch(err => { console.log(err); })
        //fetching all customers
        await axios.get('https://crm-backend-okn5.onrender.com/customer/getCustomers')
            .then(res => {
                dispatch(getCustomer(res.data.data))

            })
            .catch(err => { toast(err.message); })

        //fetching all products
        await axios.get('https://crm-backend-okn5.onrender.com/product/getAllProduct')
            .then(res => {
                dispatch(getProduct(res.data.data))

            })
            .catch(err => { toast(err.message) })
    }

    //logout function

    const handleLogOut = async () => {

        try {
            dispatch(AddUser(''))
            toast('LogOut success')
        } catch (error) {
            toast(error.message)
        }
        navigate('/')
    }

    return (


        profile ? <div className=''>

            <nav class="navbar sticky-top   nav-bg container-fluid">
                <div class="container-fluid">
                    <a class="navbar-brand text-primary" href="#"><img src="https://cdn-icons-png.flaticon.com/512/906/906341.png" width={35} alt="logo" /><span className='ms-2 text-dark'>CRMplus</span></a>
                    <div class="dropdown me-3">
                        <div className='dropdown-toggle' data-bs-toggle="dropdown" aria-expanded="false">
                            <span className='fs-6 fw-bold text-white mx-2 text-capitalize'>Hi {profile.userName}</span>
                            <img className='img-round' aria-hidden="true" src={`https://crm-backend-okn5.onrender.com/images/${profile.image}`} alt="profile" width={30} />


                        </div>
                        <ul class="dropdown-menu dropdown-menu-end ">
                            <li><Link class="dropdown-item btn rounded-pill" to="/dashboardHome/profile">Profile</Link></li>
                            <li><Link className='dropdown-item btn rounded-pill' to='/dashboardHome/myLeads'>My Leads</Link></li>
                            <li><button class="dropdown-item btn rounded-pill" onClick={handleLogOut}>Log out</button></li>
                        </ul>
                    </div>

                </div>
            </nav>
            <div className='row'>
                <div className='col-2 bg-dark min-vh-100 position-fixed'>
                    <DashboardNav />

                </div>
                <div className='offset-2 col-10  '>
                    <Outlet />
                </div>
            </div>
        </div> : <Navigate to='/signIn' />
    );
};

export default DashboardHome;