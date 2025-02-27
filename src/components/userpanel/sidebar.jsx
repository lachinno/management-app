'use client'
import React from 'react';
import Link from 'next/link';
// import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';

const Sidebar = () => {
    const path = usePathname();
    const router = useRouter();

    const handleSignOut = async () => {
        await signOut({ redirect: false });
        router.push('/');
    };

    return (
        <div className='w-full flex flex-col items-center mx-10 mt-14 lg:w-60 lg:items-start'>
            <div className='w-full'>
               
            </div>
            <div className='w-full flex flex-col items-center space-y-10 mt-8 text-base lg:text-sm'>
                <Link href='newprogram' className={`${path === '/userpanel/newprogram' ? 'text-red-500' : 'text-white'}`}>
                Add program
                </Link>
                <Link href='program' className={`${path === '/userpanel/program' ? 'text-red-500' : 'text-white'}`}>
                   programs
                </Link>
                <Link href='newexcersice' className={`${path === '/userpanel/newexcersice' ? 'text-red-500' : 'text-white'}`}>
                add new exercise
                </Link>
                <Link href='mussle' className={`${path === 'userpanel/excersise' ? 'text-red-500' : 'text-white'}`}>
                exercises
                </Link>
                <button onClick={handleSignOut} className='text-white'>
                 signout
                </button>
            </div>
        </div>
    );
}

export default Sidebar;
