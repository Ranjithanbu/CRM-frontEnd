import { configureStore,combineReducers } from "@reduxjs/toolkit";
import LeadSlice from "../slices/LeadSlice";
import UserSlice from "../slices/UserSlice";
import DashboardSlice from "../slices/DashboardSlice";
// import persistReducer from "redux-persist/es/persistReducer";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
import storage from 'redux-persist/lib/storage';
// import persistStore from "redux-persist/es/persistStore";
const rootReducer=combineReducers({
    leadSlicer:LeadSlice,
    userSlicer:UserSlice,
    dashboardSlicer:DashboardSlice

})
const persistConfig={
    key:'root',
    storage,
   version:1    
}


const persistedReducer=persistReducer(persistConfig,rootReducer)

export const ConfigStore=configureStore({
    reducer:persistedReducer,
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          }
})
})


export const persistor=persistStore(ConfigStore)