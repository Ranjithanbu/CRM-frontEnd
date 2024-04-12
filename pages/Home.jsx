import React from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Home = () => {
  const navigate = useNavigate()
  return (
    <div>
      <div className='homePage'>
        <div>

          <h1 className='display-2 text-center p-2 '>Welcome to <span className='text-decor'>CRM<small>Plus</small></span></h1>
          <h4 className='homecontent mt-4 mb-4 text-centers '>Empower your business with our cutting-edge CRM solution designed to streamline your customer management processes and drive growth.</h4>
        </div>
        <div className='container mt-2'>

          <div id="carouselExampleDark" class="carousel carousel-dark slide" data-bs-ride="carousel">
            <div class="carousel-indicators">
              <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
              <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
              <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div class="carousel-inner">
              <div class="carousel-item active" data-bs-interval="3000">
                <img src="https://img.freepik.com/free-vector/crm-customer-relationship-management-web-page-background_574338-192.jpg?w=1060" class="d-block w-100" alt="slider" />
                <div class="carousel-caption d-none d-md-block">
                </div>
              </div>
              <div class="carousel-item" data-bs-interval="3000">
                <img src="https://ascendix.com/wp-content/uploads/2023/04/Primary-Salesforce-CRM-Use-Cases-Ascendix.png" class="d-block w-100" alt="slider" />
                <div class="carousel-caption d-none d-md-block">
                </div>
              </div>
              <div class="carousel-item" data-bs-interval="3000">
                <img src="https://storage.googleapis.com/www-reallysimple/shutterstock_760165537-e1565793538873-1024x683.jpg" class="d-block w-100" alt="slider" />
                <div class="carousel-caption d-none d-md-block">
                </div>
              </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>
        <div className='container mt-4'>
          <h4 className='mt-4 mb-3 p-2 border-bottom border-2'>Why Choose Us?</h4>
          <ul className='homeText'>
            <li className='m-4'><h6 className='fw-bolder'>Efficiency : Our CRM platform is built to optimize your workflow, saving you time and resources.</h6> </li>
            <li className='m-4'><h6 className='fw-bolder'>Customization: Tailor the CRM to fit your unique business needs with customizable features and modules.</h6></li>
            <li className='m-4'><h6 className='fw-bolder'>Insightful Analytics: Gain valuable insights into your customer interactions and trends to make informed decisions.</h6></li>
            <li className='m-4'><h6 className='fw-bolder'>Scalability: Grow your business without limitations. Our CRM scales seamlessly with your expanding needs.</h6></li>
          </ul>
        </div>
        <div className='container mt-4'>
          <h4 className='mt-4 mb-3 p-2 border-bottom border-2'> Key Features</h4>
          <ul className='homeText'>
            <li className='m-4'><h6 className='fw-bolder'>Contact Management: Organize and manage your contacts efficiently, ensuring personalized interactions at scale.</h6> </li>
            <li className='m-4'><h6 className='fw-bolder'>Customization: Sales Pipeline: Visualize your sales pipeline, track leads, and convert opportunities into revenue with ease.</h6></li>
            <li className='m-4'><h6 className='fw-bolder'>Marketing Automation: Automate marketing campaigns, nurture leads, and engage customers effectively.</h6></li>
            <li className='m-4'><h6 className='fw-bolder'>Customer Support: Deliver exceptional customer support with ticketing, knowledge base, and service level management.</h6></li>
          </ul>
        </div>
        <div className="container">
          <h4 className='text-center mt-4'>Get Started Today</h4>
          <h6 className='text-center mt-4'>Unlock the full potential of your business with <i>CRMplus</i>. Sign up now for free .</h6>
          <div className='text-center pb-2'><button className='btn btn-danger' onClick={() => { navigate('/signUp') }} >Sign Up</button></div>
        </div>

      </div>

    </div>
  );
};

export default Home;
