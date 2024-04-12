import React from 'react';
import Dashboard from './Dashboard';
import Leads from './Leads';
import Customers from './Customers';
import Appointment from './Appointment';
import Products from './Products';
import Announcement from './Announcement';
import { NavLink } from 'react-router-dom';

const DashboardNav = () => {
    return (
        <div className='container-fluid'>

            <div className="wrapper">

                <aside id="sidebar">

                    <ul className="sidebar-nav mt-2">

                        <li className="sidebar-item">
                            <NavLink to='/dashboardHome/dashboard' className="sidebar-link text-white" >
                                <i class="fa-solid fa-gauge fa-2x me-2 p-2"></i>
                                <span className='fs-6 fw-bold d-none d-md-inline'>Dashboard</span>
                            </NavLink>
                        </li>
                        <li className="sidebar-item ">
                            <NavLink to='leads' className="sidebar-link text-white">
                                <i class="fa-solid fa-cookie-bite fa-2x p-2 me-2 "></i>
                                <span className='fs-6 fw-bold d-none d-md-inline ps-1'>Leads</span>
                            </NavLink>
                        </li>
                        <li className="sidebar-item ">
                            <NavLink to='customers' className="sidebar-link text-white">
                                <i class="fa-solid fa-users fa-2x me-2 p-2"></i>
                                <span className='fs-6 fw-bold d-none d-md-inline'>Customers</span>
                            </NavLink>
                        </li>
                        <li className="sidebar-item ">
                            <NavLink to='products' className="sidebar-link text-white">
                                <i class="fa-brands fa-opencart fa-2x p-2 me-2"></i>
                                <span className='fs-6 fw-bold d-none d-md-inline'>Products</span>
                            </NavLink>
                        </li>
                        <li className="sidebar-item ">
                            <NavLink to='appointment' className="sidebar-link text-white">
                                <i className="fa-solid fa-pen fa-2x p-2 me-2 "></i>
                                <span className='fs-6 fw-bold d-none d-md-inline ps-1 '>Appointments</span>
                            </NavLink>
                        </li>
                        <li className="sidebar-item ">
                            <NavLink to='myCalendar' className="sidebar-link text-white">
                                <i class="fa-regular fa-calendar-check fa-2x p-2 me-2"></i>
                                <span className='fs-6 fw-bold d-none d-md-inline ps-1 '>Calendar</span>
                            </NavLink>
                        </li>
                        <li className="sidebar-item ">
                            <NavLink to='announcement' className="sidebar-link text-white">
                                <i class="fa-solid fa-bullhorn 2x p-2 fa-2x me-3 "></i>
                                <span className='fs-6 fw-bold d-none d-md-inline ps-1'>News</span>
                            </NavLink>
                        </li>


                    </ul>

                </aside>



            </div>

        </div>
    );
};

export default DashboardNav;






