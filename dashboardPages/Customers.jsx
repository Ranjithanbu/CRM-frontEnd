import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addLead } from '../slices/LeadSlice';
import { getCustomer } from '../slices/DashboardSlice';
import { useSelector } from 'react-redux'
const Customers = () => {
    const [customer, setCustomer] = useState([])
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [dummy, setDummy] = useState(0)
//fetching user details from redux store
    const user = useSelector((state) => state.userSlicer.userData)
//fetching all customers from server
    const fetchCustomers = async () => {
        await axios.get('https://crm-backend-okn5.onrender.com/customer/getCustomers')
            .then(res => {
                setCustomer(res.data.data)
                dispatch(getCustomer(res.data.data))

            })
            .catch(err => { toast(err.message); })
    }
//handling edit event
    const handleEdit = async (id) => {

        dispatch(addLead(id))
        navigate('/dashboardHome/editCustomer')
    }



//handling delete event

    const handleDelete = async (id) => {
        

        const confirmStatus = await confirm('Are you sure want to delete')
        if (confirmStatus) {
            await axios.delete(`https://crm-backend-okn5.onrender.com/customer/deleteCustomer/${id}`)
                .then(res => toast(res.data.message))
                .catch(err => toast(err.message))
        }
        else (toast('cencelled'))
    
        setDummy((pval)=>pval + 1)
    }
//handle the more info action

    const handleClick = (id) => {

        dispatch(addLead(id))
        navigate('/dashboardHome/customerFullDetails')
    }

    useEffect(() => {
        fetchCustomers()
    }, [dummy])



    return (
        <div className='container'>
            <ToastContainer />
            <div className='d-flex border-3 border-bottom my-2 '>
                <h5>Customers</h5>
                {user.role === 'admin' ? <NavLink to='/dashboardHome/createCustomer' className='btn btn-primary ms-auto mb-1'><i class="fa-solid fa-plus"></i>Add customer</NavLink> : null}
            </div>
            <div className='row'>
                <table class="table table-success table-striped table-hover ">

                    <thead className=''>
                        <tr className='fw-bolder fs-6'>
                            <th className='col-sm-2' scope="col">Name</th>
                            <th className='col-sm-2' scope="col">Email</th>
                            <th className='col-sm-2' scope="col">Phone</th>
                            <th className='col-sm-2' scope="col">Website</th>
                            {user.role === 'admin' ? <th className='col-sm-1' colSpan={3}>Action</th> : null}
                        </tr>
                    </thead>
                    <tbody>
                        {customer.map((item, index) => {
                            return (

                                <tr className='fw-bold' key={index} >
                                    <td className='col-sm-2'>{item.name}</td>
                                    <td className='col-sm-2'>{item.email}</td>
                                    <td className='col-sm-2'>{item.phone}</td>
                                    <td className='col-sm-2'>{item.website}</td>


                                    {user.role === 'admin' ? <td onClick={() => { handleEdit(item._id) }}><i class="fa-solid fa-pen-to-square btn"></i></td> : null}
                                    {user.role === 'admin' ? <td onClick={() => handleClick(item._id)}><i class="fa-solid fa-eye btn"></i></td> : null}
                                    {user.role === 'admin' ? <td onClick={() => handleDelete(item._id)}><i class="fa-solid fa-trash btn"></i></td> : null}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

            </div>
            <div><Outlet /></div>
        </div>
    );
};

export default Customers;