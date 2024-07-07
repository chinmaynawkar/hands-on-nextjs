
'use client'
import Link from 'next/link'
import React from 'react';
import { useRouter } from 'next/navigation';
import { axios } from "axios";

export default function LoginPage() {
    const [user, setUser] = React.useState({
        email: '',
        password: '',
    })

    const onLogin = async () => {

    }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-black text-white">
    <nav className="absolute top-0 left-0 w-full flex justify-between p-4">
        <div className="text-lg font-bold">OAuth</div>
        <div className="flex space-x-4">
            <Link href="/signup" className="py-2 px-4 bg-white text-black rounded-md">Sign up</Link>
            <Link href="/login" className="py-2 px-4 bg-white text-black rounded-md">Log in</Link>
        </div>
    </nav>
    <div className="w-full max-w-md p-8 bg-gray-800 rounded-md">
        <h1 className="text-2xl font-bold mb-8 text-center">Login</h1>
        <label htmlFor="email" className="block mb-2">Email</label>
        <input
            className="w-full p-2 mb-4 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-gray-400"
            id="email"
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="Email"
        />
        <label htmlFor="password" className="block mb-2">Password</label>
        <input
            className="w-full p-2 mb-4 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-gray-400"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Password"
        />
        <button
            className="w-full p-2 mb-4 bg-white text-black rounded-md hover:bg-gray-300 focus:outline-none"
            onClick={onLogin}
        >
            Login
        </button>
        <p className="text-center">
            Don&apos;t have an account? <Link href="/signup" className="text-blue-400">Sign up</Link>
        </p>
    </div>
</div>
);
}