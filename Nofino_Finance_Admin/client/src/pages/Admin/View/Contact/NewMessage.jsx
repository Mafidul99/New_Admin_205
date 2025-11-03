import React from 'react'

const NewMessage = () => {
    return (
        <div className="bg-[#ecf0f5]">
            <div className="flex flex-col justify-center">
                <div >
                    <div >
                        <form 
                        // onSubmit={handleSubmit} 
                        className="space-y-6">
                            <div className="flex-1 mb-4 md:mb-0">
                                <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                                <div className="mt-1">
                                    <input type="text" name='username' id='username' placeholder='Username' required
                                        // value={user.username} onChange={handleChange}
                                        className='block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm' />
                                </div>
                            </div>                            
                            <div className="flex-1 mb-4 md:mb-0">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                                <div className="mt-1">
                                    <input type="email" name='email' id='email' placeholder='Email address' required
                                        // value={user.email} onChange={handleChange}
                                        className='block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm' />
                                </div>
                            </div>
                            <div className="flex-1 mb-4 md:mb-0">
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Message</label>
                                <div className="mt-1">
                                    <textarea name="message" id="message" placeholder='Your Message' 
                                    className='block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                                    required>

                                    </textarea>
                                </div>
                            </div>
                            <div>
                                <button type="submit"
                                    className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-wait disabled:opacity-50">
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewMessage