import { createSlice } from "@reduxjs/toolkit";
const dashboardSlice=createSlice({
    name:'cardValues',
    initialState:{
        lead:[],
        customer:[],
        products:[]
    },
    reducers:{

         getLead:(state,action)=>{
state.lead=action.payload
         },
         getCustomer:(state,action)=>{
            state.customer=action.payload
         },
         getProduct:(state,action)=>{
            state.products=action.payload
                     }

    }
})
export const {getLead,getCustomer,getProduct}=dashboardSlice.actions
export default dashboardSlice.reducer

