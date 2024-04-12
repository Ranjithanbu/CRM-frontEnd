import { createSlice } from "@reduxjs/toolkit";

const leadSlice=createSlice({
    name:'lead',
    initialState:{
        id:''
    },
    reducers:{
        addLead:(state,action)=>{

            state.id=action.payload
        }
    }
})


export const{addLead}=leadSlice.actions
export default leadSlice.reducer