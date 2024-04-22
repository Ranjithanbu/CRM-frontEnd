import axios, { Axios } from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addLead } from '../slices/LeadSlice';
import { getLead } from '../slices/DashboardSlice';
import { useSelector } from 'react-redux'
const Leads = () => {
  const [lead, setLead] = useState([])
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [dummy, setDummy] = useState(0)
  const user = useSelector((state) => state.userSlicer.userData)

  const fetchLeads = async () => {
    await axios.get('https://crm-backend-okn5.onrender.com/lead/getLeads')
      .then(res => {
        setLead(res.data.data)
        dispatch(getLead(res.data.data))

      })
      .catch(err => { console.log(err); })
  }


  async function handleEdit(id) {


    dispatch(addLead(id))
    navigate('/dashboardHome/Editlead')


  }

  const handleDelete = async (id) => {
    
    const confirmStatus = await confirm('Are you sure want to delete')
    if (confirmStatus) {
      await axios.delete(`https://crm-backend-okn5.onrender.com/lead/deleteLead/${id}`)
        .then(res => toast(res.data.message))
        .catch(err => toast(err.message))
    
      }
    else (toast('cencelled'))
 
    setDummy((pval)=>pval + 1)
  }

  const handleClick = (id) => {
    dispatch(addLead(id))
    navigate('/dashboardHome/fullLead')

  }

  useEffect(() => {

    fetchLeads();

  }, [dummy])

  return (
    <div className='container'>
      <ToastContainer />
      <div className='d-flex border-3 border-bottom m-2'>
        <h5>leads</h5>
        {user.role === 'admin' ? <NavLink to='/dashboardHome/createLead' className='btn btn-primary ms-auto mb-1'><i class="fa-solid fa-plus"></i> Add Lead</NavLink> : null}
      </div>
      <div className='row'>
        <div className='row'>
          {lead.map((item, Index) => {

            return (

              <div key={Index} className="card mb-3" style={{ minwidth: "540px" }}>
                <div className="row g-0">
                  <div className="col-md-4">
                    <img src="https://static.vecteezy.com/system/resources/previews/006/411/807/original/business-flat-drawing-businessman-with-briefcase-standing-on-flying-arrow-moving-upward-searching-for-opportunities-points-direction-forward-investment-and-successful-cartoon-illustration-vector.jpg" className="img-fluid rounded-start img-thumbnail" alt="image" width={250} />
                  </div>
                  <div className="col-md-8">
                    {user.role === 'admin' ? <div className='m-3 float-end'>
                      <button title='View' className='btn rounded-circle m-1' onClick={() => handleClick(item._id)}><i class="fa-solid fa-eye"></i></button>
                      <button title='Edit' className='btn  rounded-circle m-1' onClick={() => { handleEdit(item._id) }}><i class="fa-solid fa-pen-to-square"></i></button>
                      <button title='Remove' className='btn rounded-circle m-1' onClick={() => handleDelete(item._id)}><i className="fa-solid fa-trash "></i></button>
                    </div> : null}
                    <div className="newsCard" >
                      <h5 className="card-title m-2 fs-4 text-secondary text-capitalize">{item.name}</h5>
                      <p className="card-text m-2 text-info fs-5 ">{item.email}</p>
                      <p className='card-text m-2 text-info fs-5 '>{item.phone}</p>
                      <p className="card-text m-2 text-info fs-5 " >{item.website}</p>
                    </div>
                  </div>
                </div>
              </div>






            )
          })}

        </div>
      </div>
    </div>
  );
};

export default Leads;

