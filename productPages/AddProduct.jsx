import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
const AddProduct = () => {

    const navigate = useNavigate()

    //storing  data temporarily and send to backend 

    const [productData, setProductData] = useState([])

    //sending stred data to backend

    const handleSubmit = async (e) => {
        e.preventDefault()

        await axios.post('https://crm-backend-okn5.onrender.com/product/createProduct', productData)
            .then(res => {
                toast(res.data.message)
                setTimeout(() => {
                    navigate('/dashboardHome/products')
                }, 5000);
            })
            .catch(err => toast(err.message))
    }
    //getting input values and storing temporarily 
    const handleChange = (e) => {

        setProductData((pval) => ({ ...pval, [e.target.id]: e.target.value }))

    }





    return (
        <div className='container row'>
            <form onSubmit={handleSubmit} >
                <ToastContainer />
                <div className=' d-flex flex-column flex-md-row text-center'>
                    <div className='col-sm-12 col-lg-6 '>
                        <h5 className='ms-4 border-bottom p-2 text-white'>Add Product</h5>
                        <div className='card m-4 card-body postion-absolute'>
                            <div className='container m-2 align'>
                                <label htmlFor="productName" className='my-3 fw-bold '>Product Name<span>*</span> </label>
                                <input type="text" className='rounded ' id='ProductName' placeholder='product Name' required onChange={(e) => { handleChange(e) }} /><br />
                                <label htmlFor="category" className='my-3 fw-bold '>Model<span>*</span> </label>
                                <input type="text" className=' rounded' id='category' placeholder='category' required onChange={(e) => { handleChange(e) }} /><br />
                                <label htmlFor="image" className='my-3 fw-bold '>Image Address<span>*</span> </label>
                                <input type="url" className=' rounded' id='image' placeholder='Email' required onChange={(e) => { handleChange(e) }} /><br />
                                <label htmlFor="rate" className='my-3 fw-bold '>Rate<span>*</span> </label>
                                <input type="text" className=' rounded' id='rate' placeholder='rate' required onChange={(e) => { handleChange(e) }} /><br />
                                <label htmlFor="stock" className=' my-3 fw-bold '>Stock<span>*</span></label>
                                <input type="number" className=' rounded' id='stock' placeholder='stock' required onChange={(e) => { handleChange(e) }} /><br />
                                <label htmlFor="description" className=' my-3 fw-bold ' >Description* </label>
                                <input type="text" name="description" className='rounded' id="description" placeholder='description' required onChange={(e) => { handleChange(e) }} />
                            </div>
                        </div>
                        <div className='text-center'> <button className='btn btn-primary m-2' type="submit">Create</button></div>
                    </div>
                    <div className=' col-md-6 d-none d-lg-inline m-4'>
                        <img className='border border-dark rounded-pill m-4 card-body' src="https://pngimg.com/uploads/shopping_cart/shopping_cart_PNG6.png" alt="Customer" width={350} />
                        <h1 className='ms-3 text-white' >+Add<sub>products</sub></h1>
                    </div>


                </div>
            </form>

        </div>
    );
};

export default AddProduct;