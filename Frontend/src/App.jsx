import React, { useState } from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Feed from './pages/Feed'
import Createpost from './pages/Createpost'
import RichEditor from './pages/RichEditor'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import Dashboard from './pages/Dashboard'


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

  return (
    <Router>
        <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        <Routes>
            <Route path='/login' element={<Login setIsAuthenticated={setIsAuthenticated} />} />
            <Route path='/signup' element={<Signup />} />
            
            <Route path='/' element={<ProtectedRoute><Feed/></ProtectedRoute>}/>
            <Route path='/create' element={<ProtectedRoute><Createpost/></ProtectedRoute>}/>
            <Route path='/feed' element={<ProtectedRoute><Feed/></ProtectedRoute>}/>
            <Route path='/dashboard' element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
            <Route path='/richeditor/:id' element={<ProtectedRoute><RichEditor/></ProtectedRoute>}/>
        </Routes>
    </Router>
  )
}

export default App