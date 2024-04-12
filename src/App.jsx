import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import Home from '../pages/Home';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import About from '../pages/About';
import FadeLoader from "react-spinners/FadeLoader";
import Navbar from '../components/Navbar';
import PasswordResetAuth from '../pages/PasswordResetAuth';
import ResetPassword from '../pages/ResetPassword';
import FooterComponent from '../components/FooterComponent';
import DashboardHome from '../dashboardPages/DashboardHome';
import Dashboard from '../dashboardPages/Dashboard';
import Leads from '../dashboardPages/Leads';
import Customers from '../dashboardPages/Customers';
import Products from '../dashboardPages/Products';
import Appointment from '../dashboardPages/Appointment';
import Announcement from '../dashboardPages/Announcement';
import DashboardNav from '../dashboardPages/DashboardNav';
import CreateLead from '../dashboardPages/CreateLead';
import EditLead from '../dashboardPages/EditLead';
import FullLead from '../dashboardPages/FullLead';
import CreateCustomer from '../customerPage/CreateCustomer';
import CustomerFullDetails from '../customerPage/CustomerFullDetails';
import EditCustomer from '../customerPage/EditCustomer';
import AddProduct from '../productPages/AddProduct';
import FullProductInfo from '../productPages/FullProductInfo';
import EditProduct from '../productPages/EditProduct';
import MyCalendar from '../dashboardPages/MyCalendar';
import ProfileComponent from '../components/ProfileComponent';
import MyLeads from '../dashboardPages/MyLeads';

const App = () => {

  const [navStatus, setNavStatus] = useState(true)


  const [spinner, setSpinner] = useState(true)

  useEffect(() => {
    setSpinner(true)
    setTimeout(() => {
      setSpinner(false)
    }, 7000);
  }, [])

  return (
    spinner ? <div className='spinnerDiv'><FadeLoader color="#36d7b7" /></div> : <div>


      <BrowserRouter>
        {navStatus ? <Navbar /> : null}

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signIn' element={<SignIn />} />
          <Route path='/signUp' element={<SignUp />} />
          <Route path='/about' element={<About />} />

          <Route path='/PasswordResetAuth' element={<PasswordResetAuth />} />
          <Route path='/ResetPassword/:id/:token' element={<ResetPassword />} />
          <Route path='/dashboardHome' element={<DashboardHome setNavStatus={setNavStatus} />}>
            <Route path='/dashboardHome/dashboard' element={<Dashboard />} />
            <Route path='leads' element={<Leads />} />
            <Route path='customers' element={<Customers />} />
            <Route path='products' element={<Products />} />
            <Route path='appointment' element={<Appointment />} />
            <Route path='announcement' element={<Announcement />} />
            <Route path='/dashboardHome/createLead' element={<CreateLead />} />
            <Route path='/dashboardHome/editLead' element={<EditLead />} />
            <Route path='/dashboardHome/fullLead' element={<FullLead />} />
            <Route path='/dashboardHome/createCustomer' element={<CreateCustomer />} />
            <Route path='/dashboardHome/customerFullDetails' element={<CustomerFullDetails />} />
            <Route path='/dashboardHome/editCustomer' element={<EditCustomer />} />
            <Route path='/dashboardHome/addProduct' element={<AddProduct />} />
            <Route path='/dashboardHome/fullProductInfo' element={<FullProductInfo />} />
            <Route path='/dashboardHome/editProduct' element={<EditProduct />} />
            <Route path='/dashboardHome/myCalendar' element={<MyCalendar />} />
            <Route path='/dashboardHome/profile' element={<ProfileComponent />} />
            <Route path='/dashboardHome/myLeads' element={<MyLeads />} />

          </Route>





        </Routes>

        {navStatus ? <FooterComponent /> : null}
      </BrowserRouter>

    </div>
  );
};

export default App;