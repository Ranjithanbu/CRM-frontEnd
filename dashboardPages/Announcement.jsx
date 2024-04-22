import axios from 'axios'
import React, { useEffect } from 'react';
import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux'
const Announcement = () => {
    const [getNews, setGetNews] = useState([])
    const [sendData, setSendData] = useState({})
    const [dummy, setDummy] = useState(0)
    const user = useSelector((state) => state.userSlicer.userData)

    useEffect(() => {
        fetchData()
    }, [dummy])

//fetching news from server

    const fetchData = async () => {

        await axios.get('https://crm-backend-okn5.onrender.com/news/getNews')
            .then(res => setGetNews(res.data.data))
            .catch(err => toast(err.message))
    }


    const handleChange = (e) => {

        setSendData((pval) => ({ ...pval, creater: user.userName, [e.target.id]: e.target.value }))


    }
//creating announcement 

    const handleSubmit = async (e) => {
        e.preventDefault()
        await axios.post('https://crm-backend-okn5.onrender.com/news/createNews', sendData)
            .then(res => toast(res.data.message))
            .catch(err => toast(err.message))
        setSendData('')
        setDummy(dummy + 1)
    }
//removing req to backend
    const handleDelete = async (id) => {
        
        axios.delete(`https://crm-backend-okn5.onrender.com/news/deleteNews/${id}`)
            .then(res => toast(res.data.message))
            .catch(err => toast(err.message))
    
            setDummy((pval)=>pval + 1)
        }

    return (

        <div className='container-fluid'>
            <ToastContainer />
            <div className='d-flex border-3 border-bottom m-2'>
                <h4 className='text-white'>News</h4>

                {/* <!-- Button trigger modal --> */}

                {user.role === 'admin' ? <button type="button" className="btn btn-primary ms-auto mb-1" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    + Add News
                </button> : null}

                {/* <!-- Modal --> */}
                <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Create News</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body card-body">
                                <form className='align' onSubmit={handleSubmit}>
                                    <label htmlFor="subject" className='my-2 fw-bold'>Subject</label><input type="text" name='subject' className='rounded' placeholder='subject' id='subject' required onChange={(e) => handleChange(e)} /><br />
                                    <label htmlFor="description" className='my-2 fw-bold'>Description</label><input type="text" name="description" className='rounded' id="description" placeholder='description' required onChange={(e) => handleChange(e)} /><br />
                                    <label htmlFor="forTo" className='my-2 fw-bold'>News to</label><select name="forTo" id="forTo" className='rounded' onChange={(e) => handleChange(e)} required>
                                        <option value="">select</option>
                                        <option value={'staff'}>staff</option>
                                        <option value={'customer'}>customer</option>
                                    </select><br />
                                    <div className=''>
                                        <button type="submit" className="btn btn-primary float-end mx-2" data-bs-dismiss="modal">Add</button>


                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div className='row'>
                {getNews.map((item, Index) => {

                    return (

                        <div key={Index} className="card mb-3" style={{ maxwidth: "540px" }}>
                            <div className="row g-0">
                                <div className="col-md-4">
                                    <img src="https://i0.wp.com/thenicheguru.com/wp-content/uploads/2021/09/article-marketing.jpg" className="img-fluid rounded-start" alt="..." />
                                </div>
                                <div className="col-md-8">
                                    {user.role === 'admin' ? <div className='m-3 float-end'><button title='Remove' className='btn btn-danger rounded-circle' onClick={() => handleDelete(item._id)}><i className="fa-solid fa-trash fa-2x "></i></button></div> : null}
                                    <div className="newsCard" >
                                        <h5 className="card-title m-2 fs-4 text-secondary">{item.subject}</h5>
                                        <p className="card-text m-2 text-info fs-5">{item.description}</p>
                                        <p className='card-text m-2'>News for {item.forTo}</p>
                                        <p className="card-text m-2"><small className="text-body-secondary">created by {item.creater}</small></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}

            </div>
            <div><Outlet /></div>
        </div>
    );
};

export default Announcement;



