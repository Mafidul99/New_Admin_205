import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../store/auth';

import { NavLink } from 'react-router-dom';
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaPlus } from "react-icons/fa6";

import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
DataTable.use(DT);



const UserList = () => {
  const [users, setUsers] = useState([]);
  const { AuthorizationToken } = useAuth();

  const getAllUsersData = async () => {

    const URL = `${import.meta.env.VITE_API_URL}/api/admin/users`;
    try {
      const response = await fetch(URL, {
        method: 'GET',
        headers: {
          Authorization: AuthorizationToken,
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      // console.log(data);
      setUsers(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    getAllUsersData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const columns = [
    { name: "Name", selector: (curUser) => curUser.username},
    { name: "Email", selector: (curUser) => curUser.email},
    { name: "phone", selector: (curUser) => curUser.phone},
  ];

  return (
    <>
      <div className="grow">
        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
          <div className="sm:flex sm:justify-between sm:items-center mb-8">
            <div className="mb-4 sm:mb-0">
              <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold underline uppercase">User Listing</h1>
              <p className="mt-2 text-lg text-gray-600 dark:text-gray-100">List of all registered users</p>
              <span className="items-center justify-between text-lg text-gray-700 dark:text-gray-100">
                Total Users: <strong className='dark:text-red-500  text-green-500'>{users.length}</strong>
              </span>
            </div>
            {/* Right: Actions */}
            <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-3 items-center">
              <NavLink to="/admin/users/new" className="btn bg-green-700 text-gray-100 hover:bg-green-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white">
                <FaPlus size={16} className='inline-block mr-2' />
                Add New
              </NavLink>
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 gap-2">
            <div className="container">
              <div className="overflow-x-auto bg-white rounded-lg shadow px-3">
                <DataTable className="display"
                  columns={columns}
                  data={users}
                  pagination
                  highlightOnHover
                  striped
                />
                <table className="w-full table-auto">
                  <thead>
                    <tr className="text-sm leading-normal text-gray-600 uppercase bg-gray-200">
                      <th className="px-6 py-3 text-left">Name</th>
                      <th className="px-6 py-3 text-left">Email</th>
                      <th className="px-6 py-3 text-left">Phone</th>
                      <th className="px-6 py-3 text-left">Role</th>
                      <th className="px-6 py-3 text-left">Status</th>
                      <th className="px-6 py-3 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm text-gray-600">
                    {
                      users.map((curUser, index) => (
                        <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                          <td className="px-6 py-3 text-left">{curUser.username}</td>
                          <td className="px-6 py-3 text-left">{curUser.email}</td>
                          <td className="px-6 py-3 text-left">{curUser.phone}</td>
                          <td className="px-6 py-3 text-left">Admin</td>
                          <td className="px-6 py-3 text-left">
                            <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">Active</span>
                          </td>
                          <td className="px-6 py-3 text-center">
                            <div className="flex justify-center item-center">
                              <button className="w-4 mr-2 text-green-500 transform hover:text-blue-500 hover:scale-110">
                                <FaRegEdit />
                              </button>
                              <button className="w-4 mr-2 text-red-500 transform hover:text-red-500 hover:scale-110">
                                <RiDeleteBin6Line />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
              <div className="flex items-center justify-between mt-6">
                <div>
                  <span className="text-sm text-gray-700 dark:text-gray-100">
                    Showing
                    <span className="font-semibold text-green-500 dark:text-red-500"> 1 </span>
                    to
                    <span className="font-semibold text-green-500 dark:text-red-500"> {users.length} </span>
                    of
                    <span className="font-semibold text-green-500 dark:text-red-500"> 10 </span>
                    Entries
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserList