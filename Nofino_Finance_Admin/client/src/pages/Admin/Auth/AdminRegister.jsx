import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../store/auth';
import { toast } from 'react-toastify';

const AdminRegister = () => {
    const navigate = useNavigate();
    const {storeTokenInLs} = useAuth();

    const [user, setUser] = useState({
        username: "", phone: "", email: "", password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });
    };

    const URL = `${import.meta.env.VITE_API_URL}/api/auth/register`;    

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(user);
        try {
            const response = await fetch(URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });
            // console.log(response);

            const res_data = await response.json();
            if (response.ok) {                
                // storetoken(data.token);
                storeTokenInLs(res_data.token);
                toast.success("Registration successful Done", res_data.extraDetails);
                setUser({ username: "", phone: "", email: "", password: "" });
                navigate("/");
            } else {
                toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
                navigate("/register");
            }
        } catch (error) {
            console.error("register:", error);
        }
    };

    return (
        <div className="bg-[#ecf0f5] h-screen">
            <div className="flex min-h-[100vh] flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="text-center sm:mx-auto sm:w-full sm:max-w-md">
                    <h1 className="flex items-center justify-center text-3xl font-extrabold text-gray-900 uppercase">
                        {/* <img src={logoPng} alt="Main_Logo" className='inline-block w-16' /> */}
                        Admin Registration Page
                    </h1>
                </div>
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="px-4 py-8 bg-white shadow-lg sm:rounded-lg sm:px-10">
                        <form onSubmit={handleSubmit} className="space-y-6">
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
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                                <div className="mt-1">
                                    <input type="password" name='password' id='password' placeholder='Password' required
                                        value={user.password} onChange={handleChange}
                                        className='block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm' />
                                </div>
                            </div>
                            <div>
                                <button type="submit"
                                    className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-wait disabled:opacity-50">
                                    Sign Up
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminRegister