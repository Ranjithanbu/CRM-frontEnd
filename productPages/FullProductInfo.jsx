import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink, useNavigate } from 'react-router-dom';
const FullProductInfo = () => {
  const productId = useSelector((state) => state.leadSlicer.id)
  const [getproduct, setGetProduct] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetchData()
  }, [])
  //fetching data from the server to display
  const fetchData = async () => {

    await axios.get(`https://crm-backend-okn5.onrender.com/product/getProductById/${productId}`)
      .then(res => setGetProduct(res.data.data))
      .catch(err => toast(err.message))
  }

  return (
    <div>
      <ToastContainer />

      <div class="card my-5 mx-3 card-body " style={{ maxHeight: '100%' }}>
        <span ><span className='productInfo'>Product Info</span> <button type='button' className='btn btn-info ms-auto' onClick={() => { navigate(-1) }}>Back</button></span>
        <div class="row g-0">
          <div class="col-md-4">
            <img src={getproduct.image} class="img-fluid rounded-start p-4" alt="product" width={400} />
          </div>
          <div class="col-md-8 text-capitalize">
            <div class="m-4">
              <h3 class="card-title my-2 p-2 text-decoration-underline text-primary">{getproduct.ProductName}</h3>
              <h4 className='my-2 p-2 text-secondary'><span>{getproduct.category}</span></h4>
              <h5 class="text-danger my-2 p-2"><i class="fa-sharp fa-solid fa-dollar-sign"></i> {getproduct.rate}</h5>
              <h6 class="card-text my-2 p-2">stock :<span class="text-body-secondary">{getproduct.stock}</span></h6>
              <div><h6 className='my-2 p-2 '>Description :</h6><span>{getproduct.description}</span> </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullProductInfo;
