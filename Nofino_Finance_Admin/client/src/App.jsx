import React, { useEffect } from 'react';
import { useLocation, Route, Routes } from 'react-router-dom'


import './css/style.css';
import './charts/ChartjsConfig';

// Import pages
import UserList from './pages/Admin/View/Users/UserList';
import AddNew from './pages/Admin/View/Users/AddNew';
import UserEdit from './pages/Admin/View/Users/UserEdit';
import UserProfile from './pages/Admin/View/Users/UserProfile';
import UserContact from './pages/Admin/View/Contact/UserContact';
import NewMessage from './pages/Admin/View/Contact/NewMessage';
import UserDashboard from './pages/User/UserDashboard';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import PrivateRoute from './routes/PrivateRoute';
import { useAuth } from './store/auth';
import Loader from './components/ui/Loader';
import ForgotPassword from './pages/Auth/ForgotPassword';
import { Logout } from './pages/Auth/Logout';
import AdminDashboard from './pages/Admin/AdminDashboard';

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
        <Route path='/login' element={< Login/>} />
        <Route path='/register' element={< Register/>} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/logout' element={<Logout />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}

        {/* //user Routes */}
        <Route path="/user"element={<PrivateRoute allowedRoles={["user"]} />}>
          <Route path="dashboard" element={<UserDashboard />} />
        </Route>        

        {/* //Admin Routes */}
         {/* <Route path="/admin" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} /> */}
        <Route path='/admin' element={<PrivateRoute allowedRoles={["admin"]} />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<UserList />} />
          <Route path="users/edit/:id" element={<UserEdit />} />
          <Route path="add-new" element={<AddNew />} />
          <Route path="user-profile" element={<UserProfile />} />
          <Route path="contact" element={<UserContact />} />
          <Route path="new-message" element={<NewMessage />} />
        </Route>



        {/* Default Route */}
          <Route path="/" element={<Root />} />
      </Routes>
    </>
  );
}

export default App;

const Root = () => {
  const {user, isLoading} = useAuth();

  if(isLoading){
    return <Loader/>;
  }  

  if (!user) {
    return <Navigate to={"/login"} />
  }

  return user.role === "admin" ? (
    <Navigate to={"/admin/dashboard"} />
  ) : (
    <Navigate to={"/user/dashboard"} />
  )
}
