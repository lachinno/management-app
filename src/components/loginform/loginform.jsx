'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { postlogin } from '@/api/postlogin';
function Loginform() {
    const [formData, setformData] = useState({
        username: '',
        password: ''
    });
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState('');
    const handleLogin = async (e) => {
        e.preventDefault();
        router.push('/userpanel/account')
        // try {
        //     const result = await signIn('credentials', {
        //         ...formData,
        //         redirect: false,
        //         callbackUrl: '/'
        //     });
    
        //     if (result?.error) {
        //         setErrorMessage('Invalid username or password.');
        //     } else {
        //         console.time('Router Push');
        //         router.push('/userpanel/account');
        //         console.timeEnd('Router Push');
        //     }
        // } catch (error) {
        //     console.error(error);
        //     setErrorMessage('An unexpected error occurred');
        // }
    };
    

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-full max-w-sm p-4">
                <form className="border border-white shadow-md rounded px-8 pt-6 pb-8 mb-4 text-white" onSubmit={handleLogin}>
                   
                    <div className="text-center mt-6 mb-4">
                        <span className="text-2xl">Login </span>
                    </div>
                    <div className="mb-4 px-10">
                        <label className=" block text-[#F9F9F9] text-sm mb-3" htmlFor="username">
                           Username
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-transparent"
                            id="username"
                            name="username"
                            type="text"
                            placeholder=""
                            onChange={(e) => setformData({ ...formData, [e.target.name]: e.target.value })}
                        />
                    </div>
                    <div className="pt-5 px-10">
                        <label className="block text-[#F9F9F9] text-sm mb-3" htmlFor="password">
                        password
                        </label>
                        <input
                            className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-white mb-3 leading-tight focus:outline-none focus:shadow-outline bg-transparent"
                            id="password"
                            name="password"
                            type="password"
                            placeholder=""
                            onChange={(e) => setformData({ ...formData, [e.target.name]: e.target.value })}
                        />
                    </div>
                    <div className="px-10 pt-5">
                        <button
                            className="bg-[#E60000] text-white font-bold py-2 px-4 w-full rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Login
                        </button>
                    </div>
                  
                    {errorMessage && (
                        <div className="text-red-500 text-xs pt-4">
                            {errorMessage}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}

export default Loginform;
