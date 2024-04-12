import { createSlice } from "@reduxjs/toolkit";


const userSlice=createSlice({
    name:'user',
    initialState:{
        userData:{}
    },
    reducers:{

        AddUser:(state,action)=>{
            state.userData=action.payload
        },
        AddImage:(state,action)=>{
    state.userData.image=action.payload
        }
    }
})


export const{AddUser,AddImage}=userSlice.actions
export default userSlice.reducer