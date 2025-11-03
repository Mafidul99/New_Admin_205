import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../../store/auth';


import { Link, useNavigate } from 'react-router-dom';
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaPlus } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { toast } from 'react-toastify';


// ✅ Import extensions
import "datatables.net-buttons/js/dataTables.buttons";
import "datatables.net-buttons-dt/css/buttons.dataTables.css";
import "datatables.net-buttons/js/buttons.html5";
import "datatables.net-buttons/js/buttons.print";
import "datatables.net-responsive-dt/css/responsive.dataTables.css";
import pdfMake from "pdfmake/build/pdfmake";
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import 'datatables.net-select-dt';
import 'datatables.net-responsive-dt';

DataTable.use(DT, pdfMake);



const UserList = () => {

  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const { AuthorizationToken } = useAuth();
  const [editUser, setEditUser] = useState(null);
  const [formData, setFormData] = useState({ username: "", email: "", phone: "" });



// get all user data
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
      setUsers(data);
    } catch (error) {
      console.error('Error fetching user data:', error);

    }
  };
  useEffect(() => {
    getAllUsersData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const handleEdit = (user) => {
    setEditUser(user);
    setFormData(user);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const URL = `${import.meta.env.VITE_API_URL}/api/admin/users/update/${editUser._id}`;
      const response = await fetch(URL, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: AuthorizationToken,
        },
        body: JSON.stringify(formData),
      });
      setEditUser(null);
      getAllUsersData();
      if (response.ok) {
        toast.success("User updated successfully!");
        navigate("/admin/users");
      } else {
        toast.error("Update failed!.. plc try");
      }

    } catch (error) {
      console.error("Update error:", error);
    }
  };

  
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

      if (response.ok) {
        getAllUsersData();
      }

    } catch (error) {
      console.error('Error fetching user data:', error);

    }

  };


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
                className="btn bg-green-700 text-gray-100 hover:bg-green-800 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-white"
              >
                <FaPlus size={16} className='inline-block mr-2' />
                Add New
              </Link>
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 gap-2">
            <div className="container">
              <div className="overflow-x-auto bg-white rounded-lg shadow px-4 py-4 dark:bg-gray-700 dark:text-white">
                {users.length > 0 ? (
                  <DataTable className="w-full table-auto display border-[1px] my-3"
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
                      <tr className="text-sm text-gray-600 uppercase bg-green-200 items-center justify-center justify-items-center">
                        <th className="px-6 py-3 items-start">Name</th>
                        <th className="px-6 py-3 items-start">Email</th>
                        <th className="px-6 py-3 items-start">Phone</th>
                        <th className="px-6 py-3">Role</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm text-gray-600 dark:text-white items-start">
                      {users.map((user) => (
                        <tr key={user._id} className="border hover:bg-indigo-50 transition border-gray-200 dark:border-gray-100">
                          <td className="px-6 py-3 items-start">{user.username}</td>
                          <td className="px-6 py-3 items-start">{user.email}</td>
                          <td className="px-6 py-3 items-start">{user.phone}</td>
                          <td className="px-6 py-3">Admin</td>
                          <td className="px-6 py-3">
                            <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                              Active
                            </span>
                          </td>
                          <td className="px-6 py-3 text-center">
                            <div className="flex justify-center item-center">
                              <button
                                onClick={() => handleEdit(user)}
                                className="w-4 mr-2 text-green-500 transform hover:text-green-700 hover:scale-110">
                                <FaRegEdit className='w-4.5 h-4.5' />
                              </button>
                              <button onClick={() => deleteUser(user._id)}
                                className="w-4 mr-2 text-red-500 transform hover:text-red-700 hover:scale-110">
                                <RiDeleteBin6Line className='w-4.5 h-4.5' />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </DataTable>
                ) : (
                  <div>
                    <span colSpan="3" className="py-4 text-center text-gray-500 italic" >
                      No users found
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {editUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500/75 z-50 ">
          <div transition className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95" >
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 dark:bg-gray-700 dark:text-white text-sm text-gray-600">
                <h2 className="text-xl font-semibold mb-4">Edit User</h2>
              <form onSubmit={handleUpdate}>
                <label className="block mb-2 font-medium">Name</label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  className="border w-full p-2 rounded mb-3 dark:bg-gray-500"
                  required
                />

                <label className="block mb-2 font-medium">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="border w-full p-2 rounded mb-3 dark:bg-gray-500"
                  required
                />

                <label className="block mb-2 font-medium">Phone</label>
                <input
                  type="number"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="border w-full p-2 rounded mb-4 dark:bg-gray-500"
                  required
                />

                <div className="flex justify-end gap-3">
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditUser(null)}
                    className="bg-red-400 text-white px-4 py-2 rounded hover:bg-red-500"
                  >
                    Cancel
                  </button>                  
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default UserList