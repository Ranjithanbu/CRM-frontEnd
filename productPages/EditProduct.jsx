import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const EditProduct = () => {
    const [inputVal, setInputVal] = useState([])
    const productId = useSelector((state) => state.leadSlicer.id)
    const navigate = useNavigate()
    useEffect(() => {
        fetchData()
    }, [])

    //fetching data from server

    const fetchData = async () => {
        await axios.get(`https://crm-backend-okn5.onrender.com/product/getProductById/${productId}`)
            .then(res => {

                setInputVal(res.data.data)

            })
            .catch(err => { toast(err.message) })
    }

    //storing input values in temporary variable

    const handleChange = (e) => {
        setInputVal((pval) => ({ ...pval, [e.target.id]: e.target.value }))
    }

    //sending stored values to backend

    const handleSubmit = async (e) => {
        e.preventDefault()
console.log(inputVal);
        await axios.put(`https://crm-backend-okn5.onrender.com/product/editProduct/${productId}`, inputVal)
            .then(res => toast(res.data.message))
            .catch(err => toast(err.message))
        setTimeout(() => {
            navigate('/dashboardHome/products')
        }, 5000);

    }

    return (
        <div className='container row'>
            <form onSubmit={handleSubmit} >
                <ToastContainer />
                <div className=' d-flex flex-column flex-md-row text-center'>
                    <div className='col-sm-12 col-lg-6 '>
                        <h5 className='ms-4 border-bottom p-2 text-white'>Edit Product</h5>
                        <div className='card m-4 card-body postion-absolute'>
                            <div className='container m-2 align'>
                                <label htmlFor="productName" className='my-3 fw-bold '>Product Name<span>*</span> </label>
                                <input type="text" className='rounded ' value={inputVal.ProductName} id='ProductName' placeholder='product Name' required onChange={(e) => { handleChange(e) }} /><br />
                                <label htmlFor="category" className='my-3 fw-bold '>Categoty<span>*</span> </label>
                                <input type="text" className=' rounded' value={inputVal.category} id='category' placeholder='category' required onChange={(e) => { handleChange(e) }} /><br />
                                <label htmlFor="image" className='my-3 fw-bold '>Image Address<span>*</span> </label>
                                <input type="url" className=' rounded' id='image' value={inputVal.image} placeholder='https://pictures/123.jpg.com' required onChange={(e) => { handleChange(e) }} /><br />
                                <label htmlFor="rate" className='my-3 fw-bold '>Rate<span>*</span> </label>
                                <input type="text" className=' rounded' id='rate' value={inputVal.rate} placeholder='rate' required onChange={(e) => { handleChange(e) }} /><br />
                                <label htmlFor="stock" className=' my-3 fw-bold '>Stock<span>*</span></label>
                                <input type="number" className=' rounded' id='stock' value={inputVal.stock} placeholder='stock' required onChange={(e) => { handleChange(e) }} /><br />
                                <label htmlFor="description" className=' my-3 fw-bold ' >Description* </label>
                                <input type="text" name="description" className='rounded' value={inputVal.description} id="description" placeholder='description' required onChange={(e) => { handleChange(e) }} />
                            </div>
                        </div>
                        <div className='text-center'> <button className='btn btn-primary m-2' type="submit">Update</button></div>
                    </div>



                </div>
            </form>

        </div>
    );
};

export default EditProduct;