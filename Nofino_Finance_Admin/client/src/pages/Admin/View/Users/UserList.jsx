import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../../store/auth';


import { Link } from 'react-router-dom';
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaPlus } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";


// ✅ Import extensions
import "datatables.net-buttons/js/dataTables.buttons";
import "datatables.net-buttons-dt/css/buttons.dataTables.css";
import "datatables.net-buttons/js/buttons.html5";
import "datatables.net-buttons/js/buttons.print";
import "datatables.net-responsive-dt/css/responsive.dataTables.css";
import { toast } from 'react-toastify';
import pdfMake from "pdfmake/build/pdfmake";

import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import 'datatables.net-select-dt';
import 'datatables.net-responsive-dt';
// import UserModal from './UserModal';
// import UserModal from './UserModal';

DataTable.use(DT, pdfMake);



const UserList = () => {
  const [users, setUsers] = useState([]);
  const { AuthorizationToken } = useAuth();
  const [search, setSearch] = useState("");

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

  const filteredUsers = users.filter(
    (u) =>
      u.username.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.phone.toLowerCase().includes(search.toLowerCase())
  );


  // user delete data
  const deleteUser = async (id) => {
    const URL = `${import.meta.env.VITE_API_URL}/api/admin/users/delete/${id}`;

    try {
      const response = await fetch(URL, {
        method: 'DELETE',
        headers: {
          Authorization: AuthorizationToken,
        },
      });
      const data = await response.json();
      console.log(`Users after Delete: ${data}`);

      if(response.ok){
        getAllUsersData();
      }
      
    } catch (error) {
      console.error('Error fetching user data:', error);

    }
    
  }


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
              {/* UserModal */}
              <Link to={"/admin/add-new"}                
                className="btn bg-green-700 text-gray-100 hover:bg-green-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white"
              >
                <FaPlus size={16} className='inline-block mr-2' />
                Add New
              </Link>
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 gap-2">
            <div className="container">
              <div className="overflow-x-auto bg-white rounded-lg shadow px-4 py-4">
                {filteredUsers.length > 0 ? (
                  <DataTable className="w-full table-auto display border-[1px] my-2"
                    options={{
                      responsive: true,
                      pagination: true,
                      searching: true,
                      ordering: true,
                      layout: {
                        top2Start: 'buttons',
                      },
                      buttons: ['csv', 'excel', 'pdf', 'print'],
                      pageLength: 5,
                      lengthMenu: [5, 10, 25, 50, 100],

                    }}
                  >
                    <thead>
                      <tr className="text-sm leading-normal text-gray-600 uppercase bg-green-200 items-center justify-center justify-items-center">
                        <th className="px-6 py-3 text-left">Name</th>
                        <th className="px-6 py-3 text-left">Email</th>
                        <th className="px-6 py-3 text-left">Phone</th>
                        <th className="px-6 py-3 text-left">Role</th>
                        <th className="px-6 py-3 text-left">Status</th>
                        <th className="px-6 py-3 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm text-gray-600">
                      {filteredUsers.map((row, index) => (
                        <tr key={index} className="border-b hover:bg-indigo-50 transition border-gray-200">
                          <td className="px-6 py-3 text-left">{row.username}</td>
                          <td className="px-6 py-3 text-left">{row.email}</td>
                          <td className="px-6 py-3 text-left">{row.phone}</td>
                          <td className="px-6 py-3 text-left">Admin</td>
                          <td className="px-6 py-3 text-left">
                            <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                              Active
                            </span>
                          </td>
                          <td className="px-6 py-3 text-center">
                            <div className="flex justify-center item-center">
                              {/* <UserModal/> */}
                              <Link to={`/admin/users/edit/${row._id}`}
                                className="w-4 mr-2 text-green-500 transform hover:text-green-700 hover:scale-110">
                                <FaRegEdit className='w-4.5 h-4.5'/>
                              </Link>
                              <button onClick={() => deleteUser(row._id)}
                                className="w-4 mr-2 text-red-500 transform hover:text-red-700 hover:scale-110">
                                <RiDeleteBin6Line className='w-4.5 h-4.5'/>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </DataTable>
                ) : (
                  <tr>
                    <td colSpan="3" className="py-4 text-center text-gray-500 italic" >
                      No users found
                    </td>
                  </tr>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
     
    </>
  )
}

export default UserList