import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import { useSelector } from 'react-redux';


const Dashboard = () => {


  const totalLeads = useSelector((state) => state.dashboardSlicer.lead)
  const totalCustomer = useSelector((state) => state.dashboardSlicer.customer)
  const totalProducts = useSelector((state) => state.dashboardSlicer.products)

// data for pie and  line charts  
  const data01 = [
    { name: 'Leads', value: totalLeads.length },
    { name: 'Customers', value: totalCustomer.length },
    { name: 'Products', value: totalProducts.length }
  ];



  return (
    <div className=''>
      <div className='d-flex flex-column flex-md-row'>
        <div class="card mx-auto my-3" style={{ width: "18rem" }}>
          <div class="card-body">
            <h5 class="card-title">Total Leads <i class="fa-solid fa-store fa-2x float-end"></i></h5>
            <p class="text-center fw-bolder fs-2">{totalLeads.length}</p>

          </div>
        </div>
        <div class="card mx-auto my-3" style={{ width: "18rem" }}>
          <div class="card-body ">
            <h5 class="card-title">Total Customers <i class="fa-solid fa-people-carry-box fa-2x float-end"></i></h5>
            <p class="text-center fw-bolder fs-2">{totalCustomer.length}</p>

          </div>
        </div>
        <div class="card mx-auto my-3" style={{ width: "18rem" }}>
          <div class="card-body">
            <h5 class="card-title">Total Products <i class="fa-solid fa-box-open fa-2x float-end"></i></h5>
            <p class="text-center fw-bolder fs-2">{totalProducts.length}</p>

          </div>
        </div>
      </div>
      <div className='d-flex row mt-4'>
        <div className='col-sm-auto text-dark mt-4'>

          <LineChart
            width={500}
            height={300}
            data={data01}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke='#fff' />
            <YAxis stroke='#fff' />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#fff" activeDot={{ r: 8 }} />

          </LineChart>
          <h5 className='text-center fw-bold text-white'>Line-charts</h5>
        </div>
        <div className='col-sm-auto'>
          <PieChart width={400} height={300}>
            <Pie
              dataKey="value"
              isAnimationActive={true}
              data={data01}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#0f0"
              label
            />

            <Tooltip />
          </PieChart>
          <h5 className='text-center fw-bold text-white'>Pie-chart</h5>


        </div>
      </div>
    </div>
  );
};

export default Dashboard;