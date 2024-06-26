import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ConfigStore,persistor } from '../store/ConfigureStore.jsx'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
ReactDOM.createRoot(document.getElementById('root')).render(
  
  <PersistGate persistor={persistor}>
    <Provider store={ConfigStore}> 
  
        <App />
        
    </Provider>
    </PersistGate>
  
)
