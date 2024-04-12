import React from 'react';

const FooterComponent = () => {
    return (
        <div className='footerContent'>
            <div className='footerSymbol'>
                <a className='m-2' href="https://facebook.com" target='_blank'><i class="fa-brands fa-facebook fa-2x text-white"></i></a>
                <a className='m-2' href="https://youtube.com" target='_blank'><i class="fa-brands fa-youtube fa-2x text-white"></i></a>
                <a className='m-2' href="https://instagram.com" target='_blank'><i class="fa-brands fa-instagram fa-2x text-white"></i></a>
                <a className='m-2' href="https://linkedin.com" target='_blank'><i class="fa-brands fa-linkedin fa-2x text-white"></i></a>

            </div>
            <div className='container'>
                <ul className='footertext d-flex justify-content-between'>
                    <li className='d-flex flex-column'><a href="#" className='fw-bold'>Contact Us</a>
                        <div>Email:crmplus@gmail.com</div>
                        <div>Phone:9978654328</div>
                        <div>Addres:24/7 East street,guindy,chennai</div>

                    </li>
                    <li className='d-flex flex-column float-righr'><a href='#' className='fw-bold'>Quick Links</a>

                        <a href="/">Home</a>
                        <a href="/about">About Us</a>
                    </li>

                </ul>
            </div>
            <p className='text-center pb-2 text-white'>CRMplus &copy; {new Date().getFullYear()} All Rights Reserved</p>
        </div>
    );
};

export default FooterComponent;