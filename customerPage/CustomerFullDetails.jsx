import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const CustomerFullDetails = () => {
    const navigate = useNavigate()
    const rendorId = useSelector((state) => (state.leadSlicer.id))

    const [fullCustom, setFullCustom] = useState([])

    const item = []

    //instant data fetching purpose while loading 

    useEffect(() => {
        fetchData(rendorId)
    }, [])

    //fetching customer details from server
    const fetchData = async (rendorId) => {

        await axios.get(`https://crm-backend-okn5.onrender.com/customer/getCustomerById/${rendorId}`)
            .then(res => {

                setFullCustom(res.data.data)
                toast(res.data.message)
            })
            .catch(err => { toast(err.message) })
    }
    for (const key in fullCustom) {
        item.push(<tr key={key} className='fw-bold' >
            <td className='col-sm-2'>{key}</td>
            <td className='col-sm-2'>{fullCustom[key]}</td>

        </tr>)
    }

 //printing customer details   
    const prinFunction = () => {
        window.print()

    }

    return (
        <div>
            <div className='container'>
                <div className='d-flex border-3 border-bottom m-2'>
                    <h5>Customer Details</h5>
                    <div className=' ms-auto' > </div>
                    <button type='button' className='btn btn-info ms-auto' onClick={() => { navigate(-1) }}>Back</button>
                    <button className='btn btn-secondary ms-1' onClick={prinFunction}>print</button>
                </div>


                <ToastContainer />
                <div className='row'>
                    <table class="table table-success table-striped table-hover col-lg-12">

                        <thead className=''>
                            <tr className='fw-bolder fs-5 ms-2'>
                                <th colSpan={2} className='col-sm-2 ms-2' scope="col">Data</th>


                            </tr>
                        </thead>
                        <tbody>
                            {item}
                        </tbody>
                    </table>

                </div>

            </div>
        </div>
    );
};

export default CustomerFullDetails;