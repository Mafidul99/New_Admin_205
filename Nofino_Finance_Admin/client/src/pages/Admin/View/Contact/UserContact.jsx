import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../../store/auth';

import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";


const defaultContactForm = {
    username: "",
    email: "",
    message: ""
}

const UserContact = () => {
    const navigate = useNavigate();
    const { AuthorizationToken, user } = useAuth();
    const [contact, setContact] = useState(defaultContactForm);


    const handleInput = (e) => {
        const { name, value } = e.target;
        setContact({
            ...contact,
            [name]: value,
        });
    };

    const [userData, setUserData] = useState(true);

    if (userData && user) {
        setContact({
            username: user.username,
            email: user.email,
            message: "",
        });

        setUserData(false);
    };

    const URL = `${import.meta.env.VITE_API_URL}/api/form/contact`;
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(contact),
            });

            const res_data = await response.json();
            if (response.ok) {
                console.log(res_data);
                toast.success("Message Send Successfully");
                setContact(defaultContactForm);
                navigate("/admin/user-contact");
            } else {
                toast.error("Message Not Send");
            }

        } catch (error) {
            console.log(error);

        }
    };

    const [contactUserData, setContactUserData] = useState([]);

    const getContactsData = async () => {
        const URL = `${import.meta.env.VITE_API_URL}/api/admin/contacts`;
        try {
            const response = await fetch(URL, {
                method: 'GET',
                headers: {
                    Authorization: AuthorizationToken,
                },                
            });            

            const res_data = await response.json();
            // console.log("Contact Data", res_data);
            if (response.ok) {
                // console.log(response);
                setContactUserData(res_data);
                toast.success("Data Loaded successfully!");
            } else {
                toast.error("Data Not Show ..!");
            }

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getContactsData();
    }, []);


    return (
        <>
            <div className="grow">
                <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
                    <div className="sm:flex sm:justify-between sm:items-center mb-8">
                        <div className="mb-4 sm:mb-0">
                            <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold underline uppercase">User Contact List</h1>
                            <p className="mt-2 text-lg text-gray-600 dark:text-gray-100">List of all registered users</p>
                            {/* <span className="items-center justify-between text-lg text-gray-700 dark:text-gray-100">
                                Total Users: <strong className='dark:text-red-500  text-green-500'>{users.length}</strong>
                            </span> */}
                        </div>
                    </div>

                    <div className="bg-white rounded-md dark:bg-gray-800 px-6 py-4 mb-4 shadow-md">
                        <form className="space-y-2" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label htmlFor='username' className="block text-sm font-medium text-gray-700 dark:text-gray-200">User name</label>
                                    <input type="text" name='username' id='username' placeholder='Username' required
                                        value={contact.username}
                                        onChange={handleInput}
                                        className="w-full mt-1 p-2 text-sm border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
                                </div>
                                <div>
                                    <label htmlFor='email' className="block text-sm font-medium text-gray-700 dark:text-gray-200">Emai Id</label>
                                    <input type="email" name='email' id='email' placeholder='Email address' required
                                        value={contact.email}
                                        onChange={handleInput}
                                        className="w-full mt-1 text-sm p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
                                </div>
                            </div>
                            <div>
                                <label htmlFor='message' className="block text-sm font-medium text-gray-700 dark:text-gray-200">Message</label>
                                <textarea rows="4" cols="30" name='message' id='message' placeholder='Message' required
                                    value={contact.message}
                                    onChange={handleInput}
                                    className="col-span-2 text-sm w-full mt-1 p-2 border border-gray-300 dark:border-gray-700 rounded-lg
                                         bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-400
                                          focus:outline-none"></textarea>
                            </div>
                            <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-semibold 
                                        px-3 py-3 text-sm rounded-lg shadow-lg transition-all duration-200">
                                Send Message
                            </button>

                        </form>
                    </div>

                    {/* Cards */}
                    <div className="grid grid-cols-1 gap-2">
                        <div className="container">
                            <div className="overflow-x-auto bg-white rounded-lg shadow-md px-4 py-4 dark:bg-gray-700 dark:text-white">
                                {contactUserData.length > 0 ? (
                                    <table className="w-full table-auto display border-[1px] my-3">
                                        <thead>
                                            <tr className="text-sm text-gray-600 uppercase bg-green-200 items-center justify-center justify-items-center">
                                                <th className="px-6 py-3">Name</th>
                                                <th className="px-6 py-3">Email</th>
                                                <th className="px-6 py-3">Message</th>
                                                <th className="px-6 py-3">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-sm text-gray-600 dark:text-white">
                                            {contactUserData.map((curCont) => (
                                                <tr key={curCont._id} className="border hover:bg-indigo-50 transition border-gray-200 dark:border-gray-100">
                                                    <td className="px-6 py-3">{curCont.username}</td>
                                                    <td className="px-6 py-3">{curCont.email}</td>
                                                    <td className="px-6 py-3">{curCont.message}</td>
                                                    <td className="px-6 py-3 text-center">
                                                        <div className="flex justify-center item-center">
                                                            <button
                                                                // onClick={() => handleEdit(user)}
                                                                className="w-4 mr-2 text-green-500 transform hover:text-green-700 hover:scale-110">
                                                                <FaRegEdit className='w-4.5 h-4.5' />
                                                            </button>
                                                            <button
                                                                // onClick={() => deleteUser(user._id)}
                                                                className="w-4 mr-2 text-red-500 transform hover:text-red-700 hover:scale-110">
                                                                <RiDeleteBin6Line className='w-4.5 h-4.5' />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <span className="py-4 text-center text-gray-600 italic font-bold" >
                                        No users found
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserContact