import React, { useEffect, useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
const Appointment = () => {
    const [allMail, setAllMail] = useState([])
    const[changer,setchanger]=useState(0)
    const [inputData, setInputData] = useState([])
    const user = useSelector((state) => state.userSlicer.userData)
const ref=useRef()
   

    //fetching mails from server    
    const fetchMails = async () => {

        await axios.get('https://crm-backend-okn5.onrender.com/mail/getAllMail')
            .then(res => setAllMail(res.data.data))
            .catch(err => toast(err.message))
    }
    //creating new mail and pass to backend
    const handleSubmit = async (e) => {
        e.preventDefault()
        
        await axios.post('https://crm-backend-okn5.onrender.com/mail/createAndSend', inputData)
            .then(res => toast(res.data.message))
            .catch(err => toast(err.message))
        setInputData('')
        setchanger(changer + 1)
        ref.current.reset()
    }
    //delete request to backend
    const handleDelete = async (id) => {

        axios.delete(`https://crm-backend-okn5.onrender.com/mail/deleteMail/${id}`)
            .then(res => {
                
                toast(res.data.message)
            setchanger((pval)=>pval+1)
            })
            .catch(err => toast(err.message))
            setchanger(changer+1)
            
    }


    //storing values in temporary variable

    const handleChange = (e) => {

        setInputData((pval) => ({ ...pval, creater: user.userName, [e.target.id]: e.target.value }))


    }

    useEffect(() => {
        
        fetchMails()

    }, [changer])


    return (
        <div className='container'>

            <div className='d-flex border-3 border-bottom m-2'>
                <h4 className='text-white'>Appointments</h4>

                {/* <!-- Button trigger modal --> */}

                {user.role === 'admin' ? <button type="button" className="btn btn-primary ms-auto mb-1" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    + Add New
                </button> : null}

                {/* <!-- Modal --> */}
                <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">New Appointment</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body card-body">
                                <form ref={ref} className='align' onSubmit={handleSubmit}>
                                    <label htmlFor="sender" className='my-2 fw-bold'>From</label><input type="email" name='sender' className='rounded' placeholder='jhon@gmail.com' id='sender' required onChange={(e) => handleChange(e)} /><br />
                                    <label htmlFor="reciever" className='my-2 fw-bold'>To</label><input type="email" name="reciever" className='rounded' id="reciever" placeholder='jacky@gmail.com' required onChange={(e) => handleChange(e)} /><br />
                                    <label htmlFor="subject" className='my-2 fw-bold'>Subject</label>
                                    <input type="text" name="subject" id="subject" placeholder='subject' onChange={(e) => handleChange(e)} />
                                    <br />
                                    <label className='my-2 fw-bold ' htmlFor="text" >Text</label>
                                    <textarea name="text" id="text" cols="30" rows="2" placeholder='...something' onChange={(e) => handleChange(e)} ></textarea>
                                    <div className=''>
                                        <button type="submit" className="btn btn-primary float-end mx-2" data-bs-dismiss="modal">Make Appointment</button>


                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div className='row'>
                {allMail.map((item, Index) => {

                    return (

                        <div key={Index} className="card mb-3" style={{ minwidth: "540px" }}>
                            <div className="row g-0">
                                <div className="col-md-4">
                                    <img src="https://media.emailonacid.com/wp-content/uploads/2018/05/EOA_2018GmailUpdate.jpg" className="img-fluid rounded-start img-thumbnail" alt="..." />
                                </div>
                                <div className="col-md-8">
                                    {user.role === 'admin' ? <div className='m-3 float-end'><button className='btn rounded-circle' onClick={() => handleDelete(item._id)}><i className="fa-solid fa-trash "></i></button></div> : null}
                                    <div className="newsCard" >
                                        <h5 className="card-title m-2 fs-4 text-secondary">From : {item.sender}</h5>
                                        <p className="card-text m-2 text-info fs-5">To : {item.reciever}</p>
                                        <p className='card-text m-2 text-info fs-6'>Subject : {item.subject}</p>
                                        <p className='card-text m-2 text-info fs-6'>Text : {item.text}</p>
                                        <p className="card-text m-2 "><small className="text-body-secondary">created by {item.creater}</small></p>
                                    </div>
                                </div>
                            </div>
                        </div>






                    )
                })}
                <ToastContainer />
            </div>
            <div><Outlet /></div>
        </div>
    );
};

export default Appointment;