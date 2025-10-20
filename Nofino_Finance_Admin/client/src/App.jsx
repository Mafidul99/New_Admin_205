import React, { useEffect } from 'react';
import { useLocation, Route, Routes } from 'react-router-dom'


import './css/style.css';
import './charts/ChartjsConfig';

// Import pages
import AdminLogin from './pages/Admin/Auth/AdminLogin';
import AdminRegister from './pages/Admin/Auth/AdminRegister';
import ForgotPassword from './pages/Admin/Auth/ForgotPassword';
import { Logout } from './pages/Admin/Auth/Logout';
import AppLayout from './partials/AppLayout';
import Dashboard from './pages/Admin/Dashboard';
import UserList from './pages/Admin/View/Users/UserList';
import AddNew from './pages/Admin/View/Users/AddNew';
import UserEdit from './pages/Admin/View/Users/UserEdit';
import UserProfile from './pages/Admin/View/Users/UserProfile';
import UserContact from './pages/Admin/View/Contact/UserContact';
import NewMessage from './pages/Admin/View/Contact/NewMessage';

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
          <Route path="users" element={<UserList />} />
          <Route path="users/edit/:id" element={<UserEdit />} />
          <Route path="add-new" element={<AddNew />} />
          <Route path="user-profile" element={<UserProfile />} />
          <Route path="user-contact" element={<UserContact />} />
          <Route path="new-message" element={<NewMessage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
