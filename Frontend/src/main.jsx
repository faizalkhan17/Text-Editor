import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { registerLicense } from '@syncfusion/ej2-base'
import axios from 'axios'

// Configure Axios defaults on startup if token is present
const token = localStorage.getItem("token");
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

registerLicense('Ngo9BigBOggjHTQxAR8/V1JHaF1cXmhPYVJ/WmFZfVhgdVVMYFlbRn5PMyBoS35RcEVmW39fcHRQRWJVUEZ+VEFe')

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
