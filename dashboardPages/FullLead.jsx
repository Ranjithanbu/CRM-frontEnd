import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'


const FullLead = () => {
    const navigate = useNavigate()
    const rendorId = useSelector((state) => (state.leadSlicer.id))
    const [fullLead, setFullLead] = useState([])

    const item = []
    useEffect(() => {
        fetchData(rendorId)
    }, [])

    //fetching leads by id
    
    const fetchData = async (rendorId) => {

        await axios.get(`https://crm-backend-okn5.onrender.com/lead/getLeadById/${rendorId}`)
            .then(res => {

                setFullLead(res.data.data)
                toast(res.data.message)
            })
            .catch(err => { toast(err.message) })
    }
    for (const key in fullLead) {
        item.push(<tr className='fw-bold' >
            <td className='col-sm-2'>{key}</td>
            <td className='col-sm-2'>{fullLead[key]}</td>

        </tr>)
    }
    const handleBack = () => {
        navigate(-1)
    }
    return (
        <div className='container'>
            <div className='d-flex border-3 border-bottom m-2'>
                <h5>Lead Details</h5>
                <button type='button' className='btn btn-info ms-auto' onClick={handleBack}>Back</button>
            </div>


            <ToastContainer />
            <div className='row text-capitalize'>
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
    );
};

export default FullLead;