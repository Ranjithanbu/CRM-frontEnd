import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate, Outlet } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addLead } from '../slices/LeadSlice';
import { getProduct } from '../slices/DashboardSlice';
import axios from 'axios';
import { useSelector } from 'react-redux'
const Products = () => {
  const [gotProducts, setGotProducts] = useState([])
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [dummy, setDummy] = useState(0)
  const user = useSelector((state) => state.userSlicer.userData)
  
  //fetching all products from server
  const fetchData = async () => {
    await axios.get('https://crm-backend-okn5.onrender.com/product/getAllProduct')
      .then(res => {
        setGotProducts(res.data.data)
        dispatch(getProduct(res.data.data))
      })
      .catch(err => { console.log(err); })
  }
//handling the edit action

  const handleEdit = async (id) => {

    dispatch(addLead(id))
    navigate('/dashboardHome/editProduct')


  }

//removing products from server

  const handleDelete = async (id) => {

    
    const confirmStatus = await confirm('Are you sure want to delete')
    if (confirmStatus) {
      await axios.delete(`https://crm-backend-okn5.onrender.com/product/deleteProduct/${id}`)
        .then(res => toast(res.data.message))
        .catch(err => toast(err.message))
    }
    else (toast('cencelled'))
 
    setDummy(dummy + 1)
  }


//to view full details about the product  
  const handleClick = (id) => {
    dispatch(addLead(id))
    navigate('/dashboardHome/fullProductInfo')
  }
  useEffect(() => {
    fetchData();

  }, [dummy])

  return (
    <div className='container-fluid bg-img'>
      <ToastContainer />
      <div className='d-flex border-3 border-bottom my-2'>
        <h4 className='text-white'>Products</h4>
        {user.role === 'admin' ? <NavLink to='/dashboardHome/addProduct' className='btn btn-primary ms-auto mb-1'><i class="fa-solid fa-plus"></i> Add Product</NavLink> : null}
      </div>
      <div className='row'>
        <table class="table table-success table-striped table-hover col-lg-12">

          <thead className=''>
            <tr className='fw-bolder fs-6'>
              <th className='col-sm-2' scope="col">Product Name</th>
              <th className='col-sm-2' scope="col">Category</th>
              <th className='col-sm-2' scope="col">Price</th>
              <th className='col-sm-2' scope="col">Stock</th>
              {user.role === 'admin' ? <th className='col-sm-1 text-center' colSpan={3}>Action</th> : null}
            </tr>
          </thead>
          <tbody>
            {gotProducts.map((item, index) => {
              return (

                <tr className='fw-bold' key={index}  >
                  <td className='col-sm-2'>{item.ProductName}</td>
                  <td className='col-sm-2'>{item.category}</td>
                  <td className='col-sm-2'>{item.rate}</td>
                  <td className='col-sm-2'>{item.stock}</td>

                  {user.role === 'admin' ? <td onClick={() => { handleEdit(item._id) }}><i class="fa-solid fa-pen-to-square btn"></i></td> : null}

                  {user.role === 'admin' ? <td onClick={() => handleClick(item._id)}><i class="fa-solid fa-eye btn"></i></td> : null}

                  {user.role === 'admin' ? <td onClick={() => handleDelete(item._id)}><i class="fa-solid fa-trash btn"></i></td> : null}
                </tr>
              )
            })}
          </tbody>
        </table>

      </div>
      <div><Outlet /></div>
    </div>
  );
};

export default Products;