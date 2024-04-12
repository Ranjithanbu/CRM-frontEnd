import React, { useEffect, useRef, useState } from 'react';
import Fullcalendar from '@fullcalendar/react';
import dayGridPlugIn from '@fullcalendar/daygrid';
import timeGridPlugIn from '@fullcalendar/timegrid';
import interactionPlugIn from '@fullcalendar/interaction';
import { Calendar } from '@fullcalendar/core';
import bootrsap5PlugIn from '@fullcalendar/bootstrap5'
import { ToastContainer, toast } from 'react-toastify';
import momentTimezonePlugin from '@fullcalendar/moment-timezone'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { useSelector } from 'react-redux'
const MyCalendar = () => {
    const [createdEvent, setCreatedEvent] = useState([])
    const [recievedData, setRecievedData] = useState([])
    const [dummy, setDummy] = useState(0)
    const formRef = useRef();
    const user = useSelector((state) => state.userSlicer.userData)
    useEffect(() => {
        fetchData()
    }, [dummy])
    //fetching events from server
    const fetchData = async () => {

        await axios.get('https://crm-backend-okn5.onrender.com/event/getEvent')
            .then(res => setRecievedData(res.data.data))
            .catch(err => toast(err.message))
    }

    //storing input values in the temporary variable   

    const handleChange = (e) => {

        setCreatedEvent((pval) => ({ ...pval, [e.target.id]: e.target.value }))

    }

    //sending  stored data to backend for creating new event   

    const handleSubmit = async (e) => {


        e.preventDefault()

        await axios.post('https://crm-backend-okn5.onrender.com/event/createEvent', createdEvent)
            .then(res => {
                toast(res.data.message)
            })
            .catch(err => toast(err.message))
        setDummy(dummy + 1)
        setCreatedEvent('')
        formRef.current.reset()
    }

    //removing events from server
    const handleRemove = async () => {

        await axios.delete('https://crm-backend-okn5.onrender.com/event/deleteAll')
            .then(res => toast(res.data.message))
            .catch(err => toast(err.message))
        setDummy(dummy + 1)
    }



    return (
        <div className='w-90 mt-4'>
            {/* <!-- Button trigger modal --> */}
            <ToastContainer />
            {user.role === 'admin' ? <div class="dropdown-center">
                <button class="btn btn-primary mb-1 dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Event
                </button>
                <ul class="dropdown-menu">

                    <li><button type="button" className="dropdown-item btn ms-auto mb-1 rounded" data-bs-toggle="modal" data-bs-target="#exampleModal">Add Event</button></li>
                    <li><button type='button' className='dropdown-item btn rounded' onClick={handleRemove}>Clear All</button></li>
                </ul>
            </div> : null}


            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">New Event</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body card-body">
                            <form ref={formRef} className='align' onSubmit={handleSubmit}>
                                <label htmlFor="title" className='my-2 fw-bold'>Title</label><input type="text" name='title' className='rounded' placeholder='title' id='title' required onChange={(e) => handleChange(e)} /><br />
                                <label htmlFor="start" className='my-2 fw-bold'>Start Date</label><input type="date" name="start" className='rounded' id="start" placeholder='2024-04-28' required onChange={(e) => handleChange(e)} /><br />
                                <label htmlFor="end" className='my-2 fw-bold'>End Date</label><input type="date" name="end" className='rounded' id="end" placeholder='2024-05-01' onChange={(e) => handleChange(e)} /><br />
                                <label htmlFor="url" className='my-2 fw-bold'>Remainder Link</label><input type="url" name="url" className='rounded' id="url" placeholder='https://example.com' onChange={(e) => handleChange(e)} /><br />

                                <button type='submit' onClick={handleSubmit} className="btn btn-primary float-end mx-2" data-bs-dismiss="modal" >Add</button>
                            </form>

                        </div>

                    </div>
                </div>
            </div>

            <Fullcalendar
                plugins={[dayGridPlugIn, timeGridPlugIn, interactionPlugIn, bootrsap5PlugIn,momentTimezonePlugin]}
                initialView={"dayGridMonth"}
                themeSystem={'bootstrap5'}
                editable={true}
                dayMaxEvents={true}
                navLinks={true}
                timeZone={'Asia/India'}
            
                headerToolbar={{
                    start: "today ,prev,next",
                    center: "title",
                    end: "timeGridDay ,timeGridWeek, dayGridMonth"
                }}
                

                events={recievedData}

            />
        </div>
    );
};

export default MyCalendar;