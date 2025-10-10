import React from 'react'

const ForgotPassword = () => {
    return (
        <div className="bg-[#ecf0f5] h-screen">
            <div className="flex min-h-[100vh] flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="text-center sm:mx-auto sm:w-full sm:max-w-md">
                    <h1 className="flex items-center justify-center text-3xl font-extrabold text-gray-900 uppercase">                       
                        Change Your Password
                    </h1>
                </div>
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="px-4 py-8 bg-white shadow-lg sm:rounded-lg sm:px-10">
                        <form className="space-y-6">
                            <div>
                                <label for="email" className="block text-sm font-medium text-gray-700">Email address /
                                    Username</label>
                                <div className="mt-1">
                                    <input type="email" name='email' placeholder='Email address / Username' required
                                        className='block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm' />
                                </div>
                            </div>
                            <div>
                                <button type="submit"
                                    className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-wait disabled:opacity-50">
                                    Change Password
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword