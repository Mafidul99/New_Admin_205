import React, { useEffect } from 'react';
import { useLocation, Route, Routes } from 'react-router-dom'


import './css/style.css';
import './charts/ChartjsConfig';

// Import pages
import Dashboard from './pages/Dashboard';
import AdminLogin from './pages/Admin/Auth/AdminLogin';

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
        <Route path="/dashboard" element={<Dashboard />} />

        {/* //Admin Routes */}
      </Routes>
    </>
  );
}

export default App;
