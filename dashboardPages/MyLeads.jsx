import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addLead } from '../slices/LeadSlice';
const MyLeads = () => {
  const [myLead, setMylead] = useState([])
  const user = useSelector((state) => state.userSlicer.userData)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    fetchMyLeads()

  }, [])

const length=myLead.length
console.log(length)
  //fetching  leads from server 
  const fetchMyLeads = async () => {
    await axios.get(`https://crm-backend-okn5.onrender.com/lead/myLeads/${user.userName}`)
      .then(res => setMylead(res.data.data))
      .catch(err => console.log(err))

  }

  const total = `bi bi-${myLead.length}-circle-fill`

  //to get all details about the lead
  const handleClick = (id) => {
    dispatch(addLead(id))
    navigate('/dashboardHome/fullLead')

  }
  const handleBack = () => {
    navigate(-1)
}



  return (

<div className='container'>

      <div className='d-flex border-3 border-bottom m-2'>
        <h5>My Leads</h5>
        <a className='btn btn-primary ms-auto mb-1' href='#'>Total Leads <i class={total}></i></a>
        <button type='button' className='btn btn-info ms-auto' onClick={handleBack}>Back</button>
      </div>
      {length>0?<div className='row'>
        <div className='row'>
          {myLead.map((item, Index) => {

            return (

              <div key={Index} className="card mb-3" style={{ minwidth: "540px" }}>
                <div className="row g-0">
                  <div className="col-md-4">
                    <img src="https://static.vecteezy.com/system/resources/previews/006/411/807/original/business-flat-drawing-businessman-with-briefcase-standing-on-flying-arrow-moving-upward-searching-for-opportunities-points-direction-forward-investment-and-successful-cartoon-illustration-vector.jpg" className="img-fluid rounded-start img-thumbnail" alt="image" width={250} />
                  </div>
                  <div className="col-md-8">
                    <div className='m-3 float-end'>
                      <button className='btn rounded-circle m-1' onClick={() => handleClick(item._id)}><i class="fa-solid fa-eye"></i></button>

                    </div>
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
      </div>:<div className='text-center fs-4 fw-bold text-white'>Nothing Assigned Yet</div>}
    </div>
  );
};

export default MyLeads;