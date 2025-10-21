import React, { useState } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../store/auth'
import Loader from '../components/ui/Loader'

const AdminAppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const {user, isLoading} = useAuth();

  if(isLoading){
    return <Loader/>;
  }

  if(!user.isAdmin){
    return <Navigate to="/admin/dashboard"/>;
  }


  return (
    <>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* Content area */}
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {/*  Site header */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main>
            {
              <Outlet />
            }
          </main>
        </div>
      </div>

    </>
  )
}

export default AdminAppLayout