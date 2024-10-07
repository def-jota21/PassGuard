import React from 'react'
import ImageAuth from './components/Image/ImageAuth'
import { Table } from 'lucide-react'
import TabsForms from './components/TabForms/TabsForms'
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';


export default async function Login() {
    const session = await getServerSession();

    if (session) {
        redirect('/');
    }
    return (
        <div className='grid md:grid-cols-2 h-full 
                max-h-screen overflow-hidden'
        >
            <div className='flex justify-center h-full'>
                <div className='text-white flex flex-col 
                    items-center justify-center p-6'
                >
                    <h1 className='text-green-500 text-2xl
                    text-center mb-5'
                    >
                        PassGuard
                    </h1>
                    <h2 className='text-4xl font-medium text-black'>Welcome Back</h2>
                    <p className='text-center mt-4 mb-6 text-slate-400 text-sm'
                    >
                        Welcome back, Please enter your credentials
                    </p>
                    <TabsForms/>
                </div>
            </div>
            <ImageAuth />
        </div>
    )
}
