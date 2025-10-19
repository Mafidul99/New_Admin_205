'use client'

import { useEffect, useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { FaRegEdit } from "react-icons/fa";
import { useAuth } from '../../../../store/auth';
import { useParams } from 'react-router-dom';

const UserModal = () => {
    const [open, setOpen] = useState(false)
    const { AuthorizationToken } = useAuth();
    const { id } = useParams();



    const [user, setUser] = useState({ username: "", email: "", phone: "" });

    const handleChange = e => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };



    const handleUserSubmit = async (e) => {
        e.preventDefault();
        const URL = `${import.meta.env.VITE_API_URL}/api/admin/users/update/${id}`;
        try {
            const response = await fetch(URL, {
                method: 'PATCH',
                headers: {
                    headers: { "Content-Type": "application/json" },
                    Authorization: AuthorizationToken,
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                toast.success("Updated Successfully..");
            } else {
                toast.error("Not Updated !.");
            }

        } catch (error) {
            console.log(error);

        }
    };


    const getAllUsersData = async () => {
        const URL = `${import.meta.env.VITE_API_URL}/api/admin/users/${id}`;
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
            setUser(data);
        } catch (error) {
            console.error('Error fetching user data:', error);

        }
    };

    useEffect(() => {
        getAllUsersData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    return (
        <>
            <button 
                onClick={() => setOpen(true)}
                className="w-4 mr-2 text-green-500 transform hover:text-green-700 hover:scale-110">
                <FaRegEdit className='w-4.5 h-4.5' />
            </button>
            <Dialog open={open} onClose={setOpen} className="relative z-10">
                <DialogBackdrop transition
                    className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
                />
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <DialogPanel transition className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95" >
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="w-full">
                                    <div className="">
                                        <DialogTitle as="h3" className="mb-2 flex text-base font-semibold text-gray-900">
                                            User Update
                                        </DialogTitle>
                                        <hr />
                                        <div className="mt-2">
                                            <form className="space-y-4 w-full" onSubmit={handleUserSubmit}>
                                                <div>
                                                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                                                    <div className="mt-1">
                                                        <input type="text" name='username' id='username' placeholder='Username' required
                                                            value={user.username} onChange={handleChange}
                                                            className='block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm' />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone number</label>
                                                    <div className="mt-1">
                                                        <input type="number" name='phone' id='phone' placeholder='Phone number' required
                                                            value={user.phone} onChange={handleChange}
                                                            className='block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm' />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                                                    <div className="mt-1">
                                                        <input type="email" name='email' id='email' placeholder='Email address' required
                                                            value={user.email} onChange={handleChange}
                                                            className='block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm' />
                                                    </div>
                                                </div>
                                                <button type="submit"
                                                    className="justify-center px-4 py-2 text-sm font-medium text-white bg-green-800 border border-transparent rounded-md group hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-wait disabled:opacity-50">
                                                    Update
                                                </button>
                                                <button
                                                    type="button"
                                                    data-autofocus
                                                    onClick={() => setOpen(false)}
                                                    className="ml-3 mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                                                    Cancel
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    );
}

export default UserModal