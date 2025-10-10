import React, { useEffect } from 'react';
import { useLocation, Route, Routes } from 'react-router-dom'


import './css/style.css';
import './charts/ChartjsConfig';

// Import pages
import Dashboard from './pages/Dashboard';
import AdminLogin from './pages/Admin/Auth/AdminLogin';
import AdminRegister from './pages/Admin/Auth/AdminRegister';
import ForgotPassword from './pages/Admin/Auth/ForgotPassword';
import { Logout } from './pages/Admin/Auth/Logout';
import AppLayout from './partials/AppLayout';

function App() {

  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        {/* //user Routes */}
        <Route path='/' element={<AdminLogin />} />
        <Route path='/register' element={<AdminRegister />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/logout' element={<Logout />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}

        {/* //Admin Routes */}
        <Route path='/admin' element={<AppLayout />}> 
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
